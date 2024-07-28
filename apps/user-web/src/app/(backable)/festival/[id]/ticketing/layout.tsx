'use client';

import { Navigation } from '@components/common';
import { Header } from '@components/signup';
import { zodResolver } from '@hookform/resolvers/zod';
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
  area: ReactNode;
  check: ReactNode;
}>;

export default function TicketingLayout({
  date,
  area,
  check,
}: TicketingLayoutProps) {
  const form = useForm<TicketingValues>({
    mode: 'onChange',
    resolver: zodResolver(ticketingSchema),
    defaultValues: {
      festivalId: '',
      festivalDate: '',
      area: 'A', // 구역선택 기능 활성화되면 변경
    },
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
        <main className="h-full flex flex-col relative pb-20 overflow-y-auto scrollbar-hide mt-[47px]">
          <Choose value={currentStep}>
            <When value="선택 확인 페이지">{check}</When>
            <Otherwise>
              <>
                <Header>{currentStep}</Header>
                <AnimatePresence initial={false}>
                  <Form {...form}>
                    <form className="w-full h-full">
                      <Choose value={currentStep}>
                        <When value="날짜를 선택해주세요">{date}</When>
                        <When value="구역을 선택해주세요">{area}</When>
                      </Choose>
                    </form>
                  </Form>
                </AnimatePresence>
              </>
            </Otherwise>
          </Choose>
        </main>
      </TicketingStepContext.Provider>
    </>
  );
}
