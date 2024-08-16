'use client';

//import { Landmark } from '@components/facepass';
import dynamic from 'next/dynamic';

const LandMark = dynamic(
  () => import('@components/facepass').then((mod) => mod.Landmark),
  { ssr: false },
);

export default function FacePassRegistrationPage() {
  return <LandMark />;
}
