'use client';

import { useEffect, useRef } from 'react';

const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    };

    window.addEventListener('resize', handleResize);

    setupCamera();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { videoRef, canvasRef };
};

export default useCamera;
