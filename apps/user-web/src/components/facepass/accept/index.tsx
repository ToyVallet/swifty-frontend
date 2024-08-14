'use client';

import { Button, Drawer, DrawerContent, DrawerTitle } from '@swifty/ui';
import { convertNewlineToJSX } from '@toss/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function FacepassCameraAcceptCard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    setIsOpen(false);
  };

  const onAcceptBrowserCamera = async () => {
    try {
      // 미디어 장치 권한 요청
      await navigator.mediaDevices.getUserMedia({ video: true });
      router.push('/facepass/registration');
    } catch (err) {
      // 권한이 거부되었을 때 실행할 코드
      setIsOpen(true);
    }
  };

  return (
    <div className="dark:bg-swifty-color-dark-bg bg-white px-5 pt-10 pb-5 rounded-xl flex flex-col items-center justify-center shadow-facepass-card">
      <h1 className="text-18 font-bold text-center mb-10">
        {convertNewlineToJSX(
          '카메라 엑세스 권한이 요청이\n 표시되면 허용하셔야 등록이 가능합니다',
        )}
      </h1>
      <div className="w-full border-2  border-swifty-color-100 dark:border-swifty-color-700 mb-5" />
      <Button onClick={onAcceptBrowserCamera}>허용하기</Button>
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="px-5 mb-10">
          <DrawerTitle>카메라 엑세스 권한을 허용해야 합니다.</DrawerTitle>
          <section className="mt-10 flex flex-col gap-2.5">
            <Button block variant="primary" onClick={onClose}>
              확인
            </Button>
          </section>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
