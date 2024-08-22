'use client';

import { drawMasking } from '@util';
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
        setIsVideoLoad(true);
        if (canvasRef.current) drawMasking(canvasRef.current);
      };
    } catch (error) {
      alert('Camera access is needed for this application to work.');
    }
  };

  useEffect(() => {
    setupCamera();

    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();

        tracks.forEach((track) => {
          track.stop(); // 각 트랙을 중지하여 카메라를 정리
        });
        video.srcObject = null; // 비디오의 스트림 해제
      }
    };
  }, []);

  return { videoRef, canvasRef, isVideoLoad };
};

export default useCamera;
