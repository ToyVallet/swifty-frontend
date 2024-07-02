'use client';

import { Accordion } from '@components/ui/accordion';
import { Button } from '@swifty/ui';
import { useCallback, useReducer } from 'react';

import TermOfServiceAccordionItem from './items';
import type { TermAccordion, TermAction } from './types';

function reducer(state: TermAccordion[], action: TermAction): TermAccordion[] {
  switch (action.type) {
    case 'singleApprove':
      return state.map((item, index) =>
        index === action.index ? { ...item, approve: !item.approve } : item,
      );
    case 'allApprove':
      return state.map((item) => ({ ...item, approve: true }));
    default:
      return state;
  }
}

const initailData: TermAccordion[] = [
  {
    title: '전장금융거래 이동약관 동의(필수)',
    content: '전장금융거래 ',
    approve: false,
    required: true,
  },
  {
    title: '개인정보 수집 및 이용 동의 동의(필수)',
    content:
      '약관 내용 업데이트 예정 , 올바른 준비가 필수입니다. 이번 블로그 포스트에서는 여행자가 가져가야 할 10가지 필수 아이템을 상세히 소개합니다. 첫째, 편안한 여행을 위한 양질의 여행 가방. 두 번째는 다양한 환경에 대비할 수 있는 다용도 의류. 세 번째 아이템은 여행 중 긴급 상황에 대비한 응급 키트입니다. 네 번째는 휴대용 충전기와 보조 배터리로, 언제 어디서든 기기를 충전할 수 있게 해줍니다. 다섯 번째는 고성능 카메라로, 여행의 순간들을 아름답게 기록할 수 있습니다. 여섯 번째 아이템은 여행지의 날씨에 상관없이 편안한 여행을 돕는 다목적 신발. 일곱 번째는 여행 중 건',
    approve: false,
    required: true,
  },
  {
    title: '개인정보 제3자와 제공 동의 (선택)',
    content: '전장금융거래 ',
    approve: false,
    required: false,
  },
  {
    title: '마케팅 정보 SMS 수신 동의 (선택)',
    content: '전장금융거래 ',
    approve: false,
    required: false,
  },
];

export default function TermsOfService() {
  const [termsOfServices, dispatch] = useReducer(reducer, initailData);

  const createButtonText = useCallback(() => {
    const isRequiredApproved = termsOfServices.every(
      (item) => !item.required || (item.required && item.approve),
    );
    if (isRequiredApproved) return '동의 완료';
    return '전체 동의';
  }, [termsOfServices]);

  const onApprove = () => {
    const buttonText = createButtonText();
    if (buttonText === '전체 동의') dispatch({ type: 'allApprove' });
    if (buttonText === '동의 완료') console.log('동의 완료');
  };

  return (
    <>
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        <Accordion className="flex flex-col gap-2.5" type="single" collapsible>
          {termsOfServices.map((term, index) => (
            <TermOfServiceAccordionItem
              key={term.title}
              value={term.title}
              index={index}
              dispatch={dispatch}
              termAccordion={term}
            />
          ))}
        </Accordion>
      </div>
      <div className="bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)] absolute bottom-0 right-0 left-0">
        <Button type="button" size="full" onClick={onApprove}>
          {createButtonText()}
        </Button>
      </div>
    </>
  );
}
