import Image from 'next/image';
import { useFormContext } from 'react-hook-form';

export default function ExampleImage() {
  const form = useFormContext();
  const exampleImage = form.getValues('exampleImage');
  const required: readonly { title: string; sub?: string }[] = [
    { title: '성명', sub: '가입자와 동일한 성명' },
    { title: '학번' },
    { title: '학과' },
    { title: '학적 상태' },
  ];
  return (
    <section className="w-full bg-swifty-color-800 rounded-xl p-5">
      <h3 className="text-center font-medium text-14 mb-5">
        학적 인증 이미지 업로드 시 <br></br>아래의 사항을 포함한 JPG 파일을
        업로드 해주세요
      </h3>
      <ul className="flex flex-col gap-4 text-16 font-semibold mb-10">
        {required.map((item) => (
          <li key={item.title} className="flex gap-4">
            <div className="w-4 h-4 rounded-full bg-white" />
            <div className="flex gap-1 items-center">
              <span>{item.title}</span>
              {item.sub && (
                <span className="text-10 font-medium">{item.sub}</span>
              )}
            </div>
          </li>
        ))}
      </ul>
      <div>
        <span className="text-14 font-medium mb-5 inline-block">
          예시 이미지
        </span>
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
