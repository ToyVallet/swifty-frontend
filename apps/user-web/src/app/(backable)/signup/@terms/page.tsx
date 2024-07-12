'use client';

import { FixedBottomCTA } from '@components/common';
import Items from '@components/signup/terms-of-service/items';
import { Accordion } from '@components/ui/accordion';
import { useContext, useMemo, useReducer } from 'react';
import { useFormContext } from 'react-hook-form';

import { StepContext } from '../context';
import { initialData } from './data';
import { reducer } from './reducer';

const APPROVE_ALL = '전체 동의';
const APPROVE_COMPLETE = '동의 완료';
const MARKETING = 'marketingAvailable';
const PRIVACY = 'privacyInfoAvaliable';

export default function Page() {
  const { nextStep } = useContext(StepContext);
  const form = useFormContext();
  const [termsOfServices, dispatch] = useReducer(reducer, initialData);

  const isSomeNotApproved = useMemo(
    () =>
      termsOfServices.some(({ required, approved }) => required && !approved),
    [termsOfServices],
  );

  const onApprove = () => {
    // form 데이터 최신화
    termsOfServices.forEach(({ id, approved }) => {
      // 마케팅
      if (id === MARKETING) form.setValue(id, approved);

      // 제 3자
      if (id === PRIVACY) form.setValue(id, approved);
    });

    // 버튼 텍스트 및 기능 조작
    if (isSomeNotApproved) {
      dispatch({ type: 'allApprove' });
    } else nextStep();
  };

  return (
    <>
      <div className="flex-1 overflow-y-scroll scrollbar-hide">
        <Accordion className="flex flex-col gap-2.5" type="single" collapsible>
          {termsOfServices.map((term, index) => (
            <Items
              key={term.title}
              value={term.title}
              index={index}
              dispatch={dispatch}
              termAccordion={term}
            />
          ))}
        </Accordion>
      </div>
      <FixedBottomCTA type="button" onClick={onApprove}>
        {isSomeNotApproved ? APPROVE_ALL : APPROVE_COMPLETE}
      </FixedBottomCTA>
    </>
  );
}
