'use client';

import type { FacePassImage } from '@lib/types';

export default function convertBase64ToFile(images: FacePassImage[]) {
  const fileArr = images.map(({ src, name }) => {
    // base64 문자열에서 실제 데이터 부분을 분리합니다.
    const base64ImageContent = src.split(',')[1]!;

    // base64 데이터를 바이너리 데이터로 변환합니다.
    const byteCharacters = atob(base64ImageContent);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    // 바이너리 데이터로부터 Blob 객체를 생성합니다.
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Blob 객체를 File 객체로 변환합니다.

    const file = new File([blob], name, { type: 'image/png' });
    return file;
  });
  return fileArr;
}
