'use client';

import { adjustCanvasAndVideoSize } from '@lib/fascepass';
import { useEffect, useRef, useState } from 'react';

const useCamera = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVideoLoad, setIsVideoLoad] = useState(false);
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
        adjustCanvasAndVideoSize(videoRef, canvasRef);
        setIsVideoLoad(true);
      };
    } catch (error) {
      alert('Camera access is needed for this application to work.');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      adjustCanvasAndVideoSize(videoRef, canvasRef);
    };

    window.addEventListener('resize', handleResize);

    setupCamera();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { videoRef, canvasRef, isVideoLoad };
};

export default useCamera;
