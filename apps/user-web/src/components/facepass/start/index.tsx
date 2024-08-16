'use client';

import { FacePassContext } from '@app/(backable)/facepass/start/context';
import { reducer } from '@app/(backable)/signup/@terms/reducer';
import { FixedBottomCTA } from '@components/common';
import Items from '@components/signup/terms-of-service/items';
import { Accordion } from '@components/ui/accordion';
import { useContext, useMemo, useReducer } from 'react';

import { initialData } from './data';

const APPROVE_ALL = '전체 동의';
const APPROVE_COMPLETE = '시작하기';

export default function Term() {
  const [termsOfServices, dispatch] = useReducer(reducer, initialData);
  const { nextStep } = useContext(FacePassContext);

  const isSomeNotApproved = useMemo(
    () =>
      termsOfServices.some(({ required, approved }) => required && !approved),
    [termsOfServices],
  );

  const onApprove = () => {
    if (isSomeNotApproved) {
      dispatch({ type: 'allApprove' });
    } else {
      nextStep();
    }
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
      <FixedBottomCTA onClick={onApprove}>
        {isSomeNotApproved ? APPROVE_ALL : APPROVE_COMPLETE}
      </FixedBottomCTA>
    </>
  );
}
