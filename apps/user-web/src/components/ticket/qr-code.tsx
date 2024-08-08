'use client';

import { http } from '@swifty/shared-lib';
import Image from 'next/image';
import QRCode from 'qrcode';
import { useEffect, useState } from 'react';

type Props = {
  qr: string;
  ticketId: string;
};

const Interval = 15 * 1000;

export default function QrCode({ qr, ticketId }: Props) {
  const [qrData, setQrData] = useState(qr);

  useEffect(() => {
    const getQrId = async () => {
      const { qrEmbeddedId } = await http.get<{ qrEmbeddedId: string }>(
        '/ticket/qr/{id}',
        {
          params: { id: ticketId },
          credentials: 'include',
        },
      );
      const qr = await QRCode.toDataURL(qrEmbeddedId);
      setQrData(qr);
    };
    const intervalId = setInterval(getQrId, Interval);
    return () => clearInterval(intervalId);
  }, [ticketId, qr]);

  return (
    <Image
      src={qrData}
      fill
      alt="qr"
      className="absolute top-0 bottom-0 right-0 left-0 object-cover rounded-3xl"
    />
  );
}
