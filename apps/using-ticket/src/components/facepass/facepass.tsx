'use client';

import { useCamera } from '@hooks';
import { http } from '@swifty/shared-lib';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import type { ErrorMessage, FacePassImage, Message } from '@type';
import {
  ERROR_TEXT,
  MAX_DISTANCE,
  MESSAGE,
  MIN_DISTANCE,
  SIZE,
  calculateCenter,
  calculateDistance,
  calculateFaceAngle,
  calculateFixedCenterSquaer,
  convertBase64ToFile,
  drawCheckAnimation,
  drawCircleAnimation,
  drawErrorCircle,
  drawMasking,
  drawXAnimation,
  resetCanvas,
  saveImage,
  timer,
} from '@util';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Instruction } from 'src/components/common';

export default function FaceLandMark() {
  const { videoRef, canvasRef } = useCamera();

  // 모델 컨트롤에 필요한 변수 및 이미지 저장 객체
  const animationIdRef = useRef<number | null>(null);
  const isPredicRef = useRef(false);
  const detectorRef =
    useRef<null | faceLandmarksDetection.FaceLandmarksDetector>(null);
  const [errorMessage, setErrorMessage] = useState<null | ErrorMessage>(null);
  const [message, setMessage] = useState<Message>(MESSAGE[0]);

  const [modelLoading, setModelLoading] = useState(true);
  const [isSucess, setIsSucess] = useState(false);
  const router = useRouter();

  const resetError = () => setErrorMessage(null);
  const makeError = (text: ErrorMessage) => {
    setErrorMessage(text);
    if (canvasRef.current) {
      drawErrorCircle(canvasRef.current);
    }
  };
  const makeSucess = (text: Message) => {
    setMessage(text);
    if (canvasRef.current) {
      drawCheckAnimation(canvasRef.current);
    }
  };

  // post api
  const postFacepass = async (image: FacePassImage) => {
    const formData = new FormData();
    const imageFile = convertBase64ToFile(image);
    formData.append('faceImage', imageFile);
    makeSucess(MESSAGE[1]);
    /*     try {
      const name = await http.post('/host/admin/entrance/facepass', formData);
      console.log(name);
    } catch (err) {
      console.error(err);
      if (canvasRef.current) {
        resetCanvas(canvasRef.current);
        drawMasking(canvasRef.current);
        drawXAnimation(canvasRef.current);
      }
      makeError(ERROR_TEXT[5]);
      await timer(() => {
        router.push('/dynamic');
      });
    } */
  };

  const stopPrediction = () => {
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
  };

  const renderMessage = () => errorMessage || message;

  const checkDistance = (distance: number): boolean => {
    if (distance < MIN_DISTANCE) {
      makeError(ERROR_TEXT[1]);
      return false;
    }
    if (distance > MAX_DISTANCE) {
      makeError(ERROR_TEXT[2]);
      return false;
    }
    resetError();
    return true;
  };

  const findFace = async () => {
    isPredicRef.current = true;

    if (canvasRef.current && videoRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      drawCircleAnimation(
        canvas,
        'rgba(25, 103, 255, 1)',
        async () => {
          const image = await saveImage(canvas, video, 'face');
          if (image) {
            await postFacepass(image);
          }
        },
        500,
      );
    }
  };

  // model
  const loadModel = async () => {
    try {
      if (!videoRef.current || !canvasRef.current) return;
      await tf.setBackend('webgl');
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      detectorRef.current = await faceLandmarksDetection.createDetector(model, {
        runtime: 'tfjs',
      } as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig);

      setModelLoading(false);
    } catch (error) {
      console.error(error);
      setErrorMessage(ERROR_TEXT[4]);
    }
  };

  const predict = async () => {
    try {
      if (detectorRef.current && videoRef.current && canvasRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const poses = await detectorRef.current.estimateFaces(video, {});

        if (poses.length > 0 && poses[0]?.keypoints) {
          const mesh = poses[0].keypoints;
          const box = poses[0].box;

          // 위치 계산
          const { boxCenterX, boxCenterY } = calculateCenter(box, canvas);
          const { minX, minY, maxX, maxY } = calculateFixedCenterSquaer(
            box,
            canvas,
          );
          const { roll, yaw, pitch } = calculateFaceAngle(mesh);
          const distance = calculateDistance(box, canvas);

          // 필요 선 그리기
          resetCanvas(canvas);
          drawMasking(canvas);

          // 얼굴이 최소 중앙에 위치해 있는지 확인
          if (
            boxCenterX >= minX &&
            boxCenterX <= maxX &&
            boxCenterY >= minY &&
            boxCenterY <= maxY
          ) {
            resetError();
            if (checkDistance(distance)) {
              const absYaw = Math.abs(yaw);
              const absRoll = Math.abs(roll);
              const absPitch = Math.abs(pitch);
              if (absYaw < 0.1 && absPitch < 0.1 && absRoll < 0.1) {
                await findFace();
                return;
              } else {
                makeError(ERROR_TEXT[3]);
              }
            }
          } else {
            makeError(ERROR_TEXT[0]);
          }
        }
      }

      if (!isPredicRef.current) {
        animationIdRef.current = requestAnimationFrame(predict);
      } else {
        stopPrediction();
      }
    } catch (error) {
      makeError(ERROR_TEXT[4]);
    }
  };

  useEffect(() => {
    loadModel();
  }, []);

  useEffect(() => {
    if (!modelLoading) {
      animationIdRef.current = requestAnimationFrame(predict);
    }
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [modelLoading]);

  return (
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        width={SIZE}
        height={SIZE}
        style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
        className="absolute right-0 left-0 object-cover mx-auto mt-[60px]"
      />
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        style={{ width: `${SIZE}px`, height: `${SIZE}px` }}
        className="absolute right-0 left-0 mx-auto mt-[60px] "
      />
      {!modelLoading && (
        <Instruction className="mt-[400px]">{renderMessage()}</Instruction>
      )}
    </div>
  );
}
