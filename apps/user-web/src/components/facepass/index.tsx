'use client';

import * as poseDetection from '@tensorflow-models/pose-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { useEffect, useRef, useState } from 'react';

export default function FaceDetector() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [yaw, setYaw] = useState<null | number>(null);
  const [pitch, setPitch] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);

  const setupCamera = async () => {
    const video = videoRef.current;
    if (!video) return;
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    video.srcObject = stream;
    video.play();
  };

  const calculateYawPitchDistance = (keypoints: poseDetection.Keypoint[]) => {
    const leftEye = keypoints.find((k) => k.name === 'left_eye');
    const rightEye = keypoints.find((k) => k.name === 'right_eye');
    const nose = keypoints.find((k) => k.name === 'nose');

    if (!leftEye || !rightEye || !nose)
      return {
        yaw: null,
        pitch: null,
        distance: null,
      };

    // Calculate yaw: left-right rotation
    const yawValue = ((leftEye.x + rightEye.x) / 2 - nose.x) / 3; // Adjust scale factor
    const yaw = Math.max(-100, Math.min(100, -yawValue));

    // Calculate pitch: up-down rotation
    const pitchValue = (nose.y - (leftEye.y + rightEye.y) / 2) / 3; // Adjust scale factor
    const pitch = Math.max(-100, Math.min(100, -pitchValue));

    // Calculate distance: based on the distance between the eyes
    const eyeDistance = Math.sqrt(
      Math.pow(leftEye.x - rightEye.x, 2) + Math.pow(leftEye.y - rightEye.y, 2),
    );
    const referenceDistance = 100; // Reference distance for 0 distance (tune this based on your needs)
    const distanceValue = (referenceDistance - eyeDistance) * 2; // Adjust scale factor
    const distance = Math.max(-100, Math.min(100, distanceValue));

    return { yaw, pitch, distance };
  };

  const loadModelAndPredict = async () => {
    await tf.setBackend('webgl');
    if (!videoRef.current || !canvasRef.current) return;

    const model = poseDetection.SupportedModels.BlazePose;
    const detector = await poseDetection.createDetector(model, {
      runtime: 'tfjs',
      enableSmoothing: true,
      modelType: 'full',
    });

    const predict = async () => {
      const timestamp = performance.now();
      const poses = await detector.estimatePoses(
        videoRef.current!,
        {},
        timestamp,
      );

      if (poses.length > 0 && poses[0]?.keypoints) {
        const { yaw, pitch, distance } = calculateYawPitchDistance(
          poses[0].keypoints,
        );
        setYaw(yaw);
        setPitch(pitch);
        setDistance(distance);
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
      <div>Yaw: {yaw !== null ? yaw.toFixed(2) : 'Loading...'}</div>
      <div>Pitch: {pitch !== null ? pitch.toFixed(2) : 'Loading...'}</div>
      <div>
        Distance: {distance !== null ? distance.toFixed(2) : 'Loading...'}
      </div>
    </div>
  );
}
