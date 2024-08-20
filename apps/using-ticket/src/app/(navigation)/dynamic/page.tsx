import { QrScanner, Title } from '@components';
import { convertNewlineToJSX } from '@toss/react';

export default function DynamicPage() {
  return (
    <div>
      <Title className="mb-10">
        {convertNewlineToJSX('Dynamic QR 티켓\n 입장 시스템')}
      </Title>
      <div>
        <QrScanner />
        <h1 className="text-center text-26 font-bold mt-[26px]">
          {convertNewlineToJSX('위 화면에 \n QR 코드를 인식시켜주세요')}
        </h1>
      </div>
    </div>
  );
}
