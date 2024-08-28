import FacePassTermIcon from '@components/facepass/start/icon';
import { convertNewlineToJSX } from '@toss/react';

export default function ExampleComponent() {
  return (
    <div className="flex justify-between px-5 py-[22px] dark:bg-swifty-color-800 bg-swifty-color-200 rounded-xl">
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
          <span className="text-10 font-semibold text-center">{item.text}</span>
        </div>
      ))}
    </div>
  );
}
