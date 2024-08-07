'use client';

import { Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@swifty/shared-lib';
import { Choose, Form, Otherwise, When } from '@swifty/ui';
import { AnimatePresence } from 'framer-motion';
import { type PropsWithChildren, type ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  type TicketingStep,
  TicketingStepContext,
  ticketingSteps,
} from './context';
import { type TicketingValues, ticketingSchema } from './schema';

type TicketingLayoutProps = PropsWithChildren<{
  date: ReactNode;
  check: ReactNode;
}>;

export default function TicketingLayout({ date, check }: TicketingLayoutProps) {
  const form = useForm<TicketingValues>({
    mode: 'onChange',
    resolver: zodResolver(ticketingSchema),
  });

  const [currentStep, setCurrentStep] = useState<TicketingStep>(
    ticketingSteps[0],
  );

  const nextStep = () => {
    const nextStepIndex = ticketingSteps.indexOf(currentStep) + 1;

    const nextStep = ticketingSteps[nextStepIndex];
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  return (
    <>
      <Navigation title="티켓 예매하기" />
      <TicketingStepContext.Provider value={{ currentStep, nextStep }}>
        <Form {...(form as any)}>
          <main
            className={cn(
              'h-full flex flex-col relative pb-20 overflow-y-auto scrollbar-hide',
              currentStep !== '티켓 예매 정보를 확인해주세요' && 'mt-[47px]',
            )}
          >
            <Choose value={currentStep}>
              <When value="티켓 예매 정보를 확인해주세요">{check}</When>
              <Otherwise>
                <Header>{currentStep}</Header>
                <AnimatePresence initial={false}>
                  <form
                    className="w-full h-full"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Choose value={currentStep}>
                      <When value="날짜를 선택해주세요">{date}</When>
                    </Choose>
                  </form>
                </AnimatePresence>
              </Otherwise>
            </Choose>
          </main>
        </Form>
      </TicketingStepContext.Provider>
    </>
  );
}
