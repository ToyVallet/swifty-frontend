'use client';

import { convertNewlineToJSX } from '@toss/react';
import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

export default function ExampleImage() {
  const form = useFormContext();
  const exampleImage = form.getValues('exampleImage');

  return (
    <section className="w-full dark:bg-swifty-color-800 bg-swifty-color-200 rounded-xl px-5 pt-5 pb-[35px] mb-20">
      <h3 className="text-14 font-medium text-swifty-color-green text-center mb-5">
        {convertNewlineToJSX(
          '가입자와 동일한 성명, 학번, 학과, 학적 상태를\n포함한 서류 이미지를 업로드 해주세요',
        )}
      </h3>
      <div>
        <Image
          src={exampleImage ? exampleImage : '/images/cer-example.png'}
          width={289}
          height={373}
          alt="학적인증 예시"
          className="mx-auto w-auto h-auto"
          priority
        />
      </div>
    </section>
  );
}
