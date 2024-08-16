'use client';

import useCamera from '@hooks/use-camera';
import {
  ERROR_TEXT,
  MAX_DISTANCE,
  MIN_DISTANCE,
  STEP,
  convertBase64ToFile,
} from '@lib/fascepass';
import {
  calculateCenter,
  calculateDistance,
  calculateFaceAngle,
  calculateFixedCenterSquaer,
  calculateRadius,
  condition,
  drawCircleAnimation,
  drawErrorCircle,
  drawGazeSpheres,
  drawInnerCircle,
  drawMasking,
  drawNextPosition,
  drawText,
  saveImage,
} from '@lib/fascepass';
import type { DirectionType, ErrorMessage, FacePassImage } from '@lib/types';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { convertNewlineToJSX } from '@toss/react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import facepassPost from './post';

export default function FaceLandMark() {
  const { videoRef, canvasRef, isVideoLoad } = useCamera();

  // 모델 컨트롤에 필요한 변수 및 이미지 저장 객체
  const animationIdRef = useRef<number | null>(null);

  const isNextRef = useRef<boolean>(false);
  const imagesRef = useRef<FacePassImage[]>([]);
  const detectorRef =
    useRef<null | faceLandmarksDetection.FaceLandmarksDetector>(null);
  const [step, setStep] = useState(0);
  const [error, setError] = useState<null | ErrorMessage>(null);

  const [modelLoading, setModelLoding] = useState(true);

  const router = useRouter();

  const resetError = () => setError(null);
  const makeError = (text: ErrorMessage) => {
    setError(text);
    if (canvasRef.current) {
      drawErrorCircle(canvasRef.current);
    }
  };

  const stopPrediction = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
  };

  // 메시지 띄우기
  const renderMessage = () => {
    if (error) {
      return convertNewlineToJSX(error);
    }
    const currentStep = STEP[step];
    if (currentStep) {
      return convertNewlineToJSX(currentStep[3]);
    }
    return convertNewlineToJSX('');
  };

  // 얼굴이 조건에 만족했을 때 실행,
  const completeStep = (currentStep: DirectionType) => {
    isNextRef.current = true;
    if (canvasRef.current) {
      saveImage(
        canvasRef.current,
        videoRef.current!,
        currentStep[1],
        imagesRef.current,
      );
      drawCircleAnimation(canvasRef.current, '#1967FF', () => {
        setStep((prev) => prev + 1);
      });
    }
  };

  //facepass model load
  const loadModel = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    await tf.setBackend('webgl');

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    detectorRef.current = await faceLandmarksDetection.createDetector(model, {
      runtime: 'tfjs',
    } as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig);

    setModelLoding(false);
  };

  // facepass predict
  const predict = async () => {
    if (detectorRef.current) {
      const poses = await detectorRef.current.estimateFaces(
        videoRef.current!,
        {},
      );

      const ctx = canvasRef.current!.getContext('2d');
      if (ctx && poses.length > 0 && poses[0]?.keypoints && canvasRef.current) {
        const mesh = poses[0].keypoints;
        const box = poses[0].box;
        const canvas = canvasRef.current;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 위치 계산
        const circleAngle = calculateRadius(canvas);
        const { boxCenterX, boxCenterY } = calculateCenter(box, canvas);
        const { minX, minY, maxX, maxY } = calculateFixedCenterSquaer(
          box,
          canvas,
        );
        const angle = calculateFaceAngle(mesh);
        const distance = calculateDistance(box, canvas);

        // 필요 선 그리기
        drawMasking(canvas);
        drawGazeSpheres(canvas, angle, circleAngle);

        if (step < STEP.length)
          drawNextPosition(canvas, circleAngle, STEP[step]!);

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
                  resetError();
                  if (condition(currentStep, angle) && !isNextRef.current) {
                    completeStep(currentStep);
                    return;
                  }
                } else {
                  // 고개를 들거나 아래로 내리지 말고 정면을 향해주세요
                  makeError(ERROR_TEXT[4]);
                }
              } else if (currentStep && currentStep[2] === 'pitch') {
                if (Math.abs(angle.yaw) < 0.1) {
                  resetError();
                  if (condition(currentStep, angle) && !isNextRef.current) {
                    completeStep(currentStep);
                    return;
                  }
                } else {
                  makeError(ERROR_TEXT[4]);
                }
              }
            } else {
              makeError(ERROR_TEXT[3]);
            }
          }
          if (distance < MIN_DISTANCE) makeError(ERROR_TEXT[1]);
          if (distance > MAX_DISTANCE) makeError(ERROR_TEXT[2]);
        } else {
          makeError(ERROR_TEXT[0]);
        }
      }

      if (isNextRef.current) {
        stopPrediction();
      } else {
        animationIdRef.current = requestAnimationFrame(predict);
      }
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    isNextRef.current = false;
    if (step < 2) {
      if (canvasRef.current && videoRef.current && isVideoLoad) {
        drawInnerCircle(canvasRef.current);
        drawText(canvasRef.current, STEP[step]![1]);
        drawCircleAnimation(canvasRef.current, '#D9D9D9', () => {
          setStep((prev) => prev + 1);
        });
      }
    } else if (!modelLoading && step > 1 && step < STEP.length) {
      predict();
    } else {
      const images = imagesRef.current;
      const fileArr = convertBase64ToFile(images);
      facepassPost(fileArr).then(() => {
        console.log('sucess');
        router.replace('/facepass/complete');
      });
    }
  }, [step, modelLoading]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        className="absolute left-0 right-0 top-0 bottom-0 mt-48 mx-auto"
      />
      <canvas
        ref={canvasRef}
        className="absolute left-0 right-0 top-0 bottom-0 mt-48 mx-auto"
      />

      {!modelLoading && (
        <div className="absolute left-0 right-0 bottom-[50px] mb-40 text-26 text-white text-center">
          {renderMessage()}
        </div>
      )}
    </div>
  );
}
