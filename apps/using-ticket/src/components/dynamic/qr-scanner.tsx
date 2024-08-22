'use client';

import { useRouter } from 'next/navigation';
import QrScanner from 'qr-scanner';
import React, { useEffect, useRef } from 'react';

const QrScannerComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  useEffect(() => {
    let qrScanner: QrScanner | null;

    if (videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          const qrCode = result.data;
          if (qrCode) {
            router.push(`/dynamic/${qrCode}`);
          }
        },
        {
          // Optional: camera facing mode ('user' for front camera, 'environment' for back camera)
          preferredCamera: 'environment',
        },
      );
      qrScanner.start();

      return () => {
        if (qrScanner) qrScanner.stop();
      };
    }
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        style={{ width: '332px', height: '332px' }}
        className="rounded-xl bg-swifty-color-300 object-cover"
      ></video>
    </div>
  );
};

export default QrScannerComponent;
