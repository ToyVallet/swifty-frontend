'use client';

import { drawBoundingBox, drawGazeSpheres } from '@components/facepass/drawer';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';
import * as tf from '@tensorflow/tfjs-core';
import { useEffect, useRef, useState } from 'react';

export default function FaceLandMark() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [yaw, setYaw] = useState<null | number>(null);
  const [pitch, setPitch] = useState<null | number>(null);
  const [roll, setRoll] = useState<null | number>(null);
  const [distance, setDistance] = useState<null | number>(null);

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
      console.error('Error accessing webcam: ', error);
      alert('Camera access is needed for this application to work.');
    }
  };

  const calculateFaceAngleAndDistance = (
    mesh: faceLandmarksDetection.Keypoint[],
  ) => {
    const radians = (a1: number, a2: number, b1: number, b2: number) =>
      Math.atan2(b2 - a2, b1 - a1);

    if (mesh[33] && mesh[10] && mesh[263] && mesh[152]) {
      const eyeDistance = Math.sqrt(
        Math.pow(mesh[33].x - mesh[263].x, 2) +
          Math.pow(mesh[33].y - mesh[263].y, 2),
      );
      const referenceDistance = 100; // Tune this based on your needs
      const distanceValue = (referenceDistance - eyeDistance) * 2;
      const distance = Math.max(-100, Math.min(100, distanceValue));

      return {
        roll: radians(mesh[33].x, mesh[33].y, mesh[263].x, mesh[263].y),
        yaw: radians(mesh[33].x, mesh[33].z!, mesh[263].x, mesh[263].z!),
        pitch: radians(mesh[10].y, mesh[10].z!, mesh[152].y, mesh[152].z!),
        distance,
      };
    }

    return { roll: 0, yaw: 0, pitch: 0, distance: 0 };
  };

  const loadModelAndPredict = async () => {
    await tf.setBackend('webgl');
    if (!videoRef.current || !canvasRef.current) return;

    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const detector = await faceLandmarksDetection.createDetector(model, {
      runtime: 'tfjs',
    } as faceLandmarksDetection.MediaPipeFaceMeshTfjsModelConfig);

    const predict = async () => {
      const poses = await detector.estimateFaces(videoRef.current!, {});
      //console.log(poses);
      const ctx = canvasRef.current!.getContext('2d');
      if (ctx && poses.length > 0 && poses[0]?.keypoints) {
        const mesh = poses[0].keypoints;
        ctx.clearRect(
          0,
          0,
          canvasRef.current!.width,
          canvasRef.current!.height,
        );

        const angle = calculateFaceAngleAndDistance(mesh);

        // Draw the circular pattern around the face

        drawBoundingBox(ctx, poses[0].box);
        drawGazeSpheres(ctx, poses[0].box, angle, canvasRef.current!);

        setPitch(Number(angle.pitch));
        setYaw(Number(angle.yaw));
        setRoll(angle.roll);
        setDistance(angle.distance);
      }
      requestAnimationFrame(predict);
    };

    predict();
  };

  const adjustCanvasAndVideoSize = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      // Get the bounding rect to find the rendered size of the video
      const { width, height } = video.getBoundingClientRect();
      // Set the dimensions for both video and canvas to ensure they are the same
      video.width = width;
      video.height = height;

      canvas.width = width;
      canvas.height = height;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      adjustCanvasAndVideoSize();
    };

    window.addEventListener('resize', handleResize);

    setupCamera();
    loadModelAndPredict();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    adjustCanvasAndVideoSize();
  }, []);

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
    </div>
  );
}
