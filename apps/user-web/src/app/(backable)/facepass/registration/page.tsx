import dynamic from 'next/dynamic';

const LandMark = dynamic(
  () => import('@components/facepass').then((mod) => mod.Landmark),
  { ssr: false },
);

const IsMobile = dynamic(
  () => import('@components/facepass').then((mod) => mod.IsMobile),
  { ssr: false },
);

export default function FacePassRegistrationPage() {
  return (
    <>
      <LandMark />
      <IsMobile />
    </>
  );
}
