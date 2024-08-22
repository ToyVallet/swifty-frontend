import { Title } from '@components';
import { Icon } from '@swifty/assets';
import dynamic from 'next/dynamic';

const Facepass = dynamic(
  () => import('@components').then((mod) => mod.Facepass),
  { ssr: false },
);

export default function FacepassPage() {
  return (
    <>
      <Title>
        <Icon
          name="user-web/facepass/title"
          className="fill-black dark:fill-white"
        />
        안면 티켓 입장 시스템
      </Title>
      <Facepass />
    </>
  );
}
