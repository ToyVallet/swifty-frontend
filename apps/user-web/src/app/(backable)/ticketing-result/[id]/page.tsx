import {
  FixedBottomCTA,
  ImageWithFallback,
  Navigation,
} from '@components/common';
import ImageFallBack from '@images/fallback-festival.png';
import { type Params, formatDateRange, http } from '@swifty/shared-lib';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type TicketingResultPageProps = Params<{ id: string }>;

interface TicketingResult {
  name: 'string';
  issuedDateTime: '2024-07-23T07:54:27.665Z';
  concertStartDateTime: '2024-07-23T07:54:27.665Z';
  concertEndDateTime: '2024-07-23T07:54:27.665Z';
  concertLocation: 'string';
  areaName: 'string';
  ticketIdentifier: '123456';
  festivalName: 'DANFESTA 2024';
  concertName: '1일차';
  poster: 'string';
}

export default async function TicketingResultPage({
  params: { id },
}: TicketingResultPageProps) {
  let result: TicketingResult | null = null;

  try {
    // TODO: 지금은 티켓팅 결과를 가져오는 API가 없어서 임시로 작성한 코드입니다.
    result = await http.get<TicketingResult>('/ticket/{id}', {
      params: { id },
      query: { type: 'RESULT' },
      credentials: 'include',
    });
  } catch (e) {
    redirect('/not-authorized');
  }

  return (
    <>
      <Navigation title="티켓 예매확인" />
      <div className="pt-[50px] px-5">
        <header className="flex items-center justify-between mt-[40px] pb-5 border-b border-swifty-color-700">
          <div className="flex flex-col items-start justify-start gap-[13px]">
            <span className="p-[4px_7px] bg-primary rounded-md font-semibold text-12 text-white">
              예매완료
            </span>
            <div>
              <h2 className="font-bold text-22">{result.festivalName}</h2>
              <p className="font-semibold text-20">{result.concertName}</p>
            </div>
          </div>

          <ImageWithFallback
            className="rounded-md w-[124px] h-[107px] object-cover "
            src={result.poster}
            fallback={ImageFallBack}
            alt="축제 이미지"
            width={124}
            height={107}
          />
        </header>
        <section className="mt-10">
          <h5 className="font-semibold text-18 mb-5">예매 정보</h5>
          <div className="bg-swifty-color-200 dark:bg-swifty-color-900 rounded-xl p-5 flex flex-col gap-[22px]">
            <div className="flex flex-col gap-1">
              <span className="text-12 font-medium">예매자</span>
              <p className="font-semibold text-16">{result.name}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-12 font-medium">예매번호</span>
              <p className="font-semibold text-16">{result.ticketIdentifier}</p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-12 font-medium">예매일시</span>
              <p className="font-semibold text-16">
                {new Date(result.issuedDateTime).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-12 font-medium">축제일시</span>
              <p className="font-semibold text-16">
                {formatDateRange(
                  result.concertStartDateTime,
                  result.concertEndDateTime,
                )}
              </p>
            </div>
            <div>
              <span className="text-12 font-medium">축제 장소</span>
              <p className="font-semibold text-16">{result.concertLocation}</p>
            </div>
          </div>
        </section>
      </div>
      <FixedBottomCTA asChild>
        <Link href="/">홈으로 가기</Link>
      </FixedBottomCTA>
    </>
  );
}
