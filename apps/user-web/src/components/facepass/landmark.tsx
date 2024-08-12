'use client';

import {
  calculateCenter,
  calculateDistance,
  calculateFaceAngle,
  calculateFixedCenterSquaer,
  condition,
} from '@components/facepass/checkCenter';
import {
  drawBoundingBox,
  drawCenterPoint,
  drawFixedSquare,
  drawGazeSpheres,
  drawMasking,
  drawNextPosition,
} from '@components/facepass/drawer';
import type { NonEmptyArray } from '@swifty/shared-lib';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { useEffect, useRef, useState } from 'react';

export type DirectionType = readonly [
  number,
  'right' | 'left' | 'face' | 'low-up' | 'high-up',
  'yaw' | 'pitch',
];
const STEP: NonEmptyArray<DirectionType> = [
  [0.45, 'right', 'yaw'],
  [-0.45, 'left', 'yaw'],
  [0, 'face', 'yaw'],
  [-0.25, 'low-up', 'pitch'],
  [-0.45, 'high-up', 'pitch'],
];

const MIN_DISTANCE = 0.3;
const MAX_DISTANCE = 0.4;

let animationId: number | null = null;

export default function FaceLandMark() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [yaw, setYaw] = useState<null | number>(null);
  const [pitch, setPitch] = useState<null | number>(null);
  const [roll, setRoll] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<null | string>(null);

  const [isCenter, setIsCenter] = useState(false);

  const setupCamera = async () => {
    try {
      const video = videoRef.current;
      if (!video) return;

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      video.srcObject = stream;

      video.onloadedmetadata = () => {
        video.play();
        adjustCanvasAndVideoSize();
      };
    } catch (error) {
      alert('Camera access is needed for this application to work.');
    }
  };

  const stopPrediction = () => {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }
  };

  const loadModelAndPredict = async () => {
    let isNext = false;
    await tf.setBackend('webgl');
    if (!videoRef.current || !canvasRef.current) return;

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detector = await faceLandmarksDetection.createDetector(model, {
      runtime: 'tfjs',
    } as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig);

    const predict = async () => {
      const poses = await detector.estimateFaces(videoRef.current!, {});
      const ctx = canvasRef.current!.getContext('2d');
      if (ctx && poses.length > 0 && poses[0]?.keypoints && canvasRef.current) {
        const mesh = poses[0].keypoints;
        const box = poses[0].box;
        const canvas = canvasRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 마스킹
        const circleAngle = drawMasking(canvas);

        // 중심점 위치 구하기
        const { boxCenterX, boxCenterY, canvasCenterX, canvasCenterY } =
          calculateCenter(box, canvas);

        const { minX, minY, maxX, maxY } = calculateFixedCenterSquaer(
          box,
          canvas,
        );

        const angle = calculateFaceAngle(mesh);
        const distance = calculateDistance(box, canvas);
        setPitch(Number(angle.pitch));
        setYaw(Number(angle.yaw));
        setRoll(angle.roll);
        setDistance(distance);

        drawGazeSpheres(ctx, angle, canvas, circleAngle);

        drawNextPosition(ctx, canvas, circleAngle!, STEP[step]!);
        drawFixedSquare(canvas, box);
        drawCenterPoint(canvas);

        // 얼굴이 최소 중앙에 위치해 있는지 확인
        if (
          boxCenterX >= minX &&
          boxCenterX <= maxX &&
          boxCenterY >= minY &&
          boxCenterY <= maxY
        ) {
          setIsCenter(true);
          // 적정거리
          if (distance >= MIN_DISTANCE && distance <= MAX_DISTANCE) {
            // 얼굴 고개가 정면일 경우

            if (Math.abs(angle.roll) < 0.1) {
              const currentStep = STEP[step];
              if (currentStep && currentStep[2] === 'yaw') {
                if (Math.abs(angle.pitch) < 0.1) {
                  if (condition(currentStep, angle)) {
                    isNext = true;
                    setStep((prev) =>
                      prev < STEP.length - 1 ? step + 1 : step,
                    );
                  }
                } else {
                  // 고개를 들거나 아래로 내리지 말고 정면을 향해주세요
                }
              } else if (currentStep && currentStep[2] === 'pitch') {
                if (condition(currentStep, angle)) {
                  setStep((prev) => (prev < STEP.length - 1 ? step + 1 : step));
                }
              }
            }
          }
        } else {
          setIsCenter(false);
        }

        drawBoundingBox(ctx, box);
      }
      animationId = requestAnimationFrame(predict);
      if (isNext) {
        stopPrediction();
      }
    };

    predict();
  };

  const adjustCanvasAndVideoSize = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const { width, height } = video.getBoundingClientRect();
      video.width = width;
      video.height = height;

      canvas.width = width;
      canvas.height = height;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      adjustCanvasAndVideoSize();
      drawMasking(canvasRef.current!);
    };

    window.addEventListener('resize', handleResize);

    setupCamera();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    stopPrediction();
    loadModelAndPredict(); // step이 바뀔 때 로직을 별도로 실행
  }, [step]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="absolute left-0 right-0 top-0 bottom-0 my-auto mx-auto"
      />
      <canvas
        ref={canvasRef}
        className="absolute left-0 right-0 top-0 bottom-0 my-auto mx-auto"
      />
      <div>Yaw: {yaw !== null ? yaw.toFixed(2) : 'Loading...'}</div>
      <div>Pitch: {pitch !== null ? pitch.toFixed(2) : 'Loading...'}</div>
      <div>Roll: {roll !== null ? roll.toFixed(2) : 'Loading...'}</div>
      <div>
        Distance: {distance !== null ? distance.toFixed(2) : 'Loading...'}
      </div>
      <div> {isCenter ? 'true' : 'false'}</div>
      <button
        onClick={() => {
          if (step < STEP.length - 1) {
            setStep((prev) => prev + 1);
          }
        }}
      >
        NEXT STEP {step}
      </button>
    </div>
  );
}
