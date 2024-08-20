import { Instruction, QrScanner } from '@components';

export default function DynamicPage() {
  return (
    <div>
      <QrScanner />
      <Instruction>{'위 화면에 \n QR 코드를 인식시켜주세요'}</Instruction>
    </div>
  );
}
