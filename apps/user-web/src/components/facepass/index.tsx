'use client';

// import * as flDetection from '@tensorflow-models/face-landmarks-detection';
import '@mediapipe/face_detection';
import '@mediapipe/face_mesh';
import * as faceDetection from '@tensorflow-models/face-detection';
import type { BoundingBox } from '@tensorflow-models/face-detection/dist/shared/calculators/interfaces/shape_interfaces';
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-core';
import { useEffect, useRef, useState } from 'react';

export default function FaceDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [yaw, setYaw] = useState<null | number>(null);
  const [pitch, setPitch] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);
  const [initialYaw, setInitialYaw] = useState<null | number>(null);
  const [initialPitch, setInitialPitch] = useState<null | number>(null);

  const setupCamera = async () => {
    const video = videoRef.current;
    if (!video) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    video.srcObject = stream;
    video.play();
  };

  const calculateDistance = (box: BoundingBox) => {
    const REFERENCE_BBOX_WIDTH = 100;
    const REFERENCE_BBOX_HEIGHT = 150;

    const referenceArea = REFERENCE_BBOX_WIDTH * REFERENCE_BBOX_HEIGHT;
    const currentArea = box.width * box.height;
    const calculatedDistance = (referenceArea / currentArea).toFixed(2);

    return Number(calculatedDistance);
  };

  const calculateYaw = (
    leftEye: faceDetection.Keypoint,
    rightEye: faceDetection.Keypoint,
    noseTip: faceDetection.Keypoint,
  ) => {
    const eyeMidPoint = {
      x: (leftEye.x + rightEye.x) / 2,
      y: (leftEye.y + rightEye.y) / 2,
    } as const;

    const yaw =
      (Math.atan2(noseTip.x - eyeMidPoint.x, noseTip.y - eyeMidPoint.y) * 180) /
      Math.PI;

    return yaw;
  };

  const calculatePitch = (
    leftEar: faceDetection.Keypoint,
    rightEar: faceDetection.Keypoint,
    mouthCenter: faceDetection.Keypoint,
  ) => {
    const earMidPoint = {
      x: (leftEar.x + rightEar.x) / 2,
      y: (leftEar.y + rightEar.y) / 2,
    } as const;

    const yDifference = mouthCenter.y - earMidPoint.y;
    const xDifference = mouthCenter.x - earMidPoint.x;

    const pitch = (Math.atan2(yDifference, xDifference) * 180) / Math.PI;

    return pitch;
  };

  const normalizeValue = (
    value: number,
    initialValue: number,
    range: number = 30,
  ) => {
    const normalizedValue = (value - initialValue) / range;
    return Math.max(-1, Math.min(1, normalizedValue)); // -1과 1 사이로 제한
  };

  const loadModelAndPredict = async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: 'tfjs',
    };
    const detector = await faceDetection.createDetector(model, detectorConfig);
    const predict = async () => {
      if (!videoRef.current) return;

      const predictions: faceDetection.Face[] = await detector.estimateFaces(
        videoRef.current,
      );

      if (predictions.length > 0 && predictions?.[0]?.keypoints) {
        const { keypoints, box } = predictions[0];

        const calculatedDistance = calculateDistance(box);
        setDistance(Number(calculatedDistance));

        const [rightEye, leftEye, noseTip, mouthCenter, rightEar, leftEar] =
          keypoints;

        if (
          !rightEye ||
          !leftEye ||
          !noseTip ||
          !mouthCenter ||
          !rightEar ||
          !leftEar
        )
          return;

        const currentYaw = calculateYaw(leftEye, rightEye, noseTip);
        const currentPitch = calculatePitch(leftEar, rightEar, mouthCenter);

        // 초기 yaw, pitch 설정
        if (initialYaw === null && initialPitch === null) {
          setInitialYaw(currentYaw);
          setInitialPitch(currentPitch);
        }

        const normalizedYaw = normalizeValue(currentYaw, initialYaw!);
        const normalizedPitch = normalizeValue(currentPitch, initialPitch!);

        setYaw(normalizedYaw);
        setPitch(normalizedPitch);

        // 시각화
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.moveTo(leftEar.x, leftEar.y);
        ctx.lineTo(rightEar.x, rightEar.y);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(noseTip.x, noseTip.y);
        ctx.lineTo(mouthCenter.x, mouthCenter.y);
        ctx.stroke();
      }

      requestAnimationFrame(predict);
    };

    predict();
  };

  useEffect(() => {
    setupCamera();
    loadModelAndPredict();
  }, []);

  return (
    <div className="">
      <div className="relative w-[640px] h-[480px]">
        <video ref={videoRef} width={640} height={480} className="absolute" />
        <canvas ref={canvasRef} width="640" height="480" className="absolute" />
      </div>
      {yaw && <div>Yaw: {yaw}</div>}
      {pitch && <div>Pitch: {pitch}</div>}
      {distance && <div>Distance: {distance}</div>}
    </div>
  );
}
