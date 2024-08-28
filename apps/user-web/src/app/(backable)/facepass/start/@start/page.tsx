import { FacePassDescriptionExample, Term } from '@components/facepass';
import { Icon } from '@swifty/assets';
import dynamic from 'next/dynamic';

const IsMobile = dynamic(
  () => import('@components/facepass').then((mod) => mod.IsMobile),
  { ssr: false },
);

export default function FacePassPage() {
  return (
    <main className="w-full h-dvh pb-20 overflow-auto scrollbar-hide">
      <div className="flex flex-col items-center justify-center">
        <header className="flex flex-col items-center justify-center text-center mt-20">
          <Icon
            name="user-web/facepass/title"
            width={165}
            height={39}
            className="fill-black dark:fill-white self-center"
          />
          <h1 className="text-center text-26 font-bold">
            안면 등록을 시작할게요
          </h1>
        </header>
        <div className="my-20">
          <Icon
            name="user-web/facepass/logo"
            width={184}
            height={186}
            className="fill-black dark:fill-white"
          />
        </div>
      </div>
      <Term />
      <FacePassDescriptionExample />
      <IsMobile />
    </main>
  );
}
