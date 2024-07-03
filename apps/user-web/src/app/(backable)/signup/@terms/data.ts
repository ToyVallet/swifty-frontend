import { type TermAccordion } from '@components/signup/terms-of-service/types';

export const initialData: TermAccordion[] = [
  {
    title: '전장금융거래 이동약관 동의 (필수)',
    content: '전장금융거래',
    approved: false,
    required: true,
  },
  {
    title: '개인정보 수집 및 이용 동의 동의 (필수)',
    content:
      '약관 내용 업데이트 예정, 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카메라로, 여행의 순간들을 아름답게 기록할 수 있습니다. 여섯 번째 아이템은 여행지의 날씨에 상관없이 편안한 여행을 돕는 다목적 신발. 일곱 번째는 여행 중 건',
    approved: false,
    required: true,
  },
  {
    title: '개인정보 제3자와 제공 동의 (선택)',
    content: '전장금융거래',
    approved: false,
    required: false,
  },
  {
    title: '마케팅 정보 SMS 수신 동의 (선택)',
    content: '전장금융거래',
    approved: false,
    required: false,
  },
];
