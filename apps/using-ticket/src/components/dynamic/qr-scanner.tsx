'use client';

import { convertNewlineToJSX } from '@toss/react';
import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';

const QrScannerComponent = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    let qrScanner: QrScanner | null;

    if (videoRef.current) {
      qrScanner = new QrScanner(
        videoRef.current,
        (result) => {
          console.log(result);
          setQrCode(result.data);
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

  useEffect(() => {}, [qrCode]);

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
