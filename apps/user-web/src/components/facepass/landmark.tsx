'use client';

import {
  calculateCenter,
  calculateDistance,
  calculateFaceAngle,
  calculateFixedCenterSquaer,
  condition,
} from '@components/facepass/checkCenter';
import {
  drawGazeSpheres,
  drawMasking,
  drawNextPosition,
  saveImage,
} from '@components/facepass/drawer';
import useCamera from '@hooks/use-camera';
import { type NonEmptyArray, http } from '@swifty/shared-lib';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import type Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export type DirectionType = readonly [
  number,
  'right45' | 'left45' | 'front' | 'up30' | 'up45',
  'yaw' | 'pitch',
];

export type Image = { src: string; name: string };
const STEP: NonEmptyArray<DirectionType> = [
  [-0.45, 'right45', 'yaw'],
  [0.45, 'left45', 'yaw'],
  [0, 'front', 'yaw'],
  [-0.25, 'up30', 'pitch'],
  [-0.45, 'up45', 'pitch'],
];

const MIN_DISTANCE = 0.3;
const MAX_DISTANCE = 0.4;

export default function FaceLandMark() {
  const { videoRef, canvasRef } = useCamera();

  // 모델 컨트롤에 필요한 변수 및 이미지 저장 객체
  const animationIdRef = useRef<number | null>(null);
  const isNextRef = useRef<boolean>(false);
  const imagesRef = useRef<Image[]>([]);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState(true);

  const resetError = () => setError(null);

  const stopPrediction = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
  };

  const loadModelAndPredict = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    await tf.setBackend('webgl');

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
        const { boxCenterX, boxCenterY } = calculateCenter(box, canvas);

        const { minX, minY, maxX, maxY } = calculateFixedCenterSquaer(
          box,
          canvas,
        );

        const angle = calculateFaceAngle(mesh);
        const distance = calculateDistance(box, canvas);
        const images = imagesRef.current;
        drawGazeSpheres(ctx, angle, canvas, circleAngle);

        if (step < STEP.length)
          drawNextPosition(ctx, canvas, circleAngle!, STEP[step]!);

        // 얼굴이 최소 중앙에 위치해 있는지 확인
        if (
          boxCenterX >= minX &&
          boxCenterX <= maxX &&
          boxCenterY >= minY &&
          boxCenterY <= maxY
        ) {
          resetError();
          // 적정거리
          if (distance >= MIN_DISTANCE && distance <= MAX_DISTANCE) {
            // 얼굴 고개가 정면일 경우
            resetError();
            if (Math.abs(angle.roll) < 0.1) {
              resetError();
              const currentStep = STEP[step];
              if (currentStep && currentStep[2] === 'yaw') {
                if (Math.abs(angle.pitch) < 0.1) {
                  if (condition(currentStep, angle) && !isNextRef.current) {
                    isNextRef.current = true;
                    saveImage(
                      canvas,
                      videoRef.current!,
                      currentStep[1],
                      images,
                    );
                    setStep((prev) => prev + 1);
                    return;
                  }
                } else {
                  // 고개를 들거나 아래로 내리지 말고 정면을 향해주세요
                  setError('고개를 내리거나 들지말고 정면을 향하세요');
                }
              } else if (currentStep && currentStep[2] === 'pitch') {
                if (Math.abs(angle.yaw) < 0.1) {
                  if (condition(currentStep, angle) && !isNextRef.current) {
                    isNextRef.current = true;
                    setStep((prev) => prev + 1);
                    saveImage(
                      canvas,
                      videoRef.current!,
                      currentStep[1],
                      images,
                    );
                    return;
                  }
                } else {
                  setError('고개를 정면을 바라보세요');
                }
              }
            } else {
              setError('고개를 정면을 향해주세요');
            }
          }
          if (distance < MIN_DISTANCE)
            setError('얼굴을 가까이 이동시켜 주세요');
          if (distance > MAX_DISTANCE) setError('얼굴을 멀리 이동시켜 주세요');
        } else {
          setError('고개를 정면에 두세요');
        }
      }

      if (isNextRef.current) {
        stopPrediction();
      } else {
        animationIdRef.current = requestAnimationFrame(predict);
      }
    };

    await predict();
    setLoading(false);
  };

  useEffect(() => {
    isNextRef.current = false;
    loadModelAndPredict();
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
      {loading && (
        <div className="absolute bg-black top-0 right-0 left-0 bottom-0 mx-auto mt-auto text-white text-center">
          LOADING
        </div>
      )}
      {error && <div>{error}</div>}
      <button
        onClick={async () => {
          const images = imagesRef.current;
          const fileArr = images.map(({ src, name }) => {
            // base64 문자열에서 실제 데이터 부분을 분리합니다.
            const base64ImageContent = src.split(',')[1]!;

            // base64 데이터를 바이너리 데이터로 변환합니다.
            const byteCharacters = atob(base64ImageContent);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);

            // 바이너리 데이터로부터 Blob 객체를 생성합니다.
            const blob = new Blob([byteArray], { type: 'image/png' });

            // Blob 객체를 File 객체로 변환합니다.

            const file = new File([blob], name, { type: 'image/png' });
            return file;
          });

          const formData = new FormData();
          STEP.forEach((item, index) => {
            formData.append(item[1], fileArr[index]!);
          });

          await http.post('/facepass', formData, {
            credentials: 'include',
          });
        }}
      >
        CLICK IMAGE
      </button>
    </div>
  );
}
