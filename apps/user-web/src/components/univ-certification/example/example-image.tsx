'use client';

import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

export default function ExampleImage() {
  const form = useFormContext();
  const exampleImage = form.getValues('exampleImage');

  return (
    <section className="w-full bg-swifty-color-800 rounded-xl px-5 pt-5 pb-[35px]">
      <h3 className="text-center font-medium text-14 mb-2.5">
        학적 인증 이미지 업로드 시 <br></br>아래의 사항이 포함되어야 합니다.
      </h3>
      <div className="text-center mb-5">
        <span className="text-14 font-medium text-swifty-color-green">
          가입자와 동일한 성명, 학번, 학과, 학적 상태
        </span>
      </div>

      <div>
        <Image
          src={exampleImage ? exampleImage : '/images/cer-example.jpg'}
          width={248}
          height={373}
          alt="학적인증 예시"
          className="mx-auto w-auto h-auto"
        />
      </div>
    </section>
  );
}
