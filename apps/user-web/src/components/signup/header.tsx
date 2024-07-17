'use client';

import { convertNewlineToJSX } from '@toss/react';
import { motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';

import Funnel, { type StepType } from './funnel';

export default function Header({ children }: PropsWithChildren) {
  return (
    <h1 className="text-white text-center font-bold text-26 my-10 flex flex-col items-center">
      {typeof children === 'string' ? convertNewlineToJSX(children) : children}
    </h1>
  );
}

Header.Title = function Title({ children }: PropsWithChildren) {
  return <h1 className="text-26 font-bold">{children}</h1>;
};

Header.Subtitle = function Subtitle({ children }: PropsWithChildren) {
  return <div className="text-14 flex text-center font-medium">{children}</div>;
};

type TransformerProps = {
  step: string;
  steps: StepType;
};

Header.Transformer = function Transformer({ step, steps }: TransformerProps) {
  return (
    <Funnel step={step} steps={steps} accumulate={false}>
      {steps.map((s) => (
        <Funnel.Step key={s} step={s} className="w-auto">
          <TransformerSubtitle>{s}</TransformerSubtitle>
        </Funnel.Step>
      ))}
    </Funnel>
  );
};

export function TransformerSubtitle({ children }: PropsWithChildren) {
  return (
    <motion.div
      initial={{ y: '-20%', opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ duration: 1, type: 'spring' }}
    >
      {children}
    </motion.div>
  );
}
