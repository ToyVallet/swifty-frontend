import FacePassTermIcon from '@components/facepass/start/icon';
import { type TermAccordion } from '@components/signup/terms-of-service/types';
import { convertNewlineToJSX } from '@toss/react';

export const initialData: TermAccordion[] = [
  {
    id: 'fin',
    title: '안면인증 정보 수집 및 이용 동의',
    content: (
      <div className="flex justify-center gap-[20px]">
        {(
          [
            {
              name: 'user-web/facepass/browser',
              text: convertNewlineToJSX('마스크 착용\n안돼요'),
            },
            {
              name: 'user-web/facepass/light',
              text: convertNewlineToJSX('밝은 공간에서\n 찍어요'),
            },
            {
              name: 'user-web/facepass/mask',
              text: convertNewlineToJSX('AOS 0.0 이상 \n IOS 0.0이상'),
            },
            {
              name: 'user-web/facepass/phone',
              text: convertNewlineToJSX('기본 브라우저\n크롬 사용 권장'),
            },
          ] as const
        ).map((item) => (
          <div
            key={item.name}
            className="flex flex-col justify-center items-center gap-2 w-full"
          >
            <FacePassTermIcon
              name={item.name}
              width={32}
              height={32}
              className="fill-black dark:fill-white"
            />
            <span className="text-10 font-semibold text-center">
              {item.text}
            </span>
          </div>
        ))}
      </div>
    ),
    approved: false,
    required: true,
  },
];
