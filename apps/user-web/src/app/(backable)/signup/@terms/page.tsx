'use client';

import Items from '@components/signup/terms-of-service/items';
import { Accordion } from '@components/ui/accordion';
import { Button } from '@swifty/ui';
import { useContext, useReducer } from 'react';

import { StepContext } from '../layout';
import { initialData } from './data';
import { reducer } from './reducer';

export const APPROVE_ALL = '전체 동의';
export const APPROVE_COMPLETE = '동의 완료';

export default function Page() {
  const { nextStep } = useContext(StepContext);
  const [termsOfServices, dispatch] = useReducer(reducer, initialData);

  const createButtonText = () => {
    const isSomeNotApproved = termsOfServices.some(
      ({ required, approved }) => required && !approved,
    );
    if (isSomeNotApproved) return APPROVE_ALL;
    return APPROVE_COMPLETE;
  };

  const onApprove = () => {
    const buttonText = createButtonText();
    if (buttonText === APPROVE_ALL) dispatch({ type: 'allApprove' });
    else if (buttonText === APPROVE_COMPLETE) nextStep();
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
      <div className="bg-black rounded-t-xl shadow-[0_-40px_50px_0px_rgba(0,0,0,0.6)] absolute bottom-0 right-0 left-0">
        <Button type="button" size="full" onClick={onApprove}>
          {createButtonText()}
        </Button>
      </div>
    </>
  );
}
