import { FacepassCameraAcceptCard } from '@components/facepass';
import { Header } from '@components/signup';
import { convertNewlineToJSX } from '@toss/react';

export default function CameraPage() {
  return (
    <>
      <header className="mt-10 flex flex-col gap-5 items-center justify-center mb-[30%]">
        <Header>{'안면 등록을 위한\n 카메라 접근 권한 허용 안내'}</Header>
        <span className="text-14 font-medium text-center">
          {convertNewlineToJSX(
            '브라우저의 카메라 엑세스 권한을 반드시 허용해야\n안면 등록을 진행할 수 있어요',
          )}
        </span>
      </header>
      <FacepassCameraAcceptCard />
    </>
  );
}
