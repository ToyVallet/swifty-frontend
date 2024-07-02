import { type TicketInfo } from '@lib/mock/type';
import { Choose, Otherwise, When } from '@swifty/ui';

export default function StudentInfo({ info }: { info: TicketInfo | null }) {
  return (
    <div className="w-full flex flex-col p-8">
      <h2 className="text-32 font-bold mb-6">QR 코드 정보</h2>
      <Choose value={info}>
        <When value={null}>
          <p className="text-neutral-500 w-full text-center">정보 없음</p>
        </When>
        <Otherwise>
          <div className="flex flex-col gap-2">
            <Data title="이름" value={info?.name} />
            <Data title="학과" value={info?.major} />
            <Data title="학번" value={info?.studentId} />
            <Data
              title="발급 여부"
              value={info?.issued ? '발급 완료' : '발급 전'}
            />
          </div>
        </Otherwise>
      </Choose>
    </div>
  );
}

function Data({ title, value }: { title: string; value?: string }) {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-neutral-400">{title}</p>
      <p className="text-18">{value}</p>
    </div>
  );
}
