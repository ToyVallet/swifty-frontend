"use client";

import { container } from "./page.css";
import { BottomSheet, Toast } from "@swifty/ui";
import { useBottomSheet } from "@swifty/hooks";

export default function Page() {
  const { isOpen, open, close } = useBottomSheet();

  return (
    <main className={container}>
      <button onClick={() => {}}>메시지</button>
      <BottomSheet
        open={isOpen}
        onDismiss={close}
        header="Swifty를 쓰려면 동의가 필요해요."
        expandTo="2/3"
      >
        asd
      </BottomSheet>
      <Toast time={5}>새로운 계정이 생성되었습니다</Toast>
    </main>
  );
}
