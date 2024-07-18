'use client';

import { convertNewlineToJSX } from '@toss/react';

type Props = {
  status: string;
};

export default function VerificationStatus() {
  return (
    <div className="mt-[47px]">
      <h1></h1>
      <VerticalBar />
    </div>
  );
}

function VerificationStep() {}

function VerticalBar() {
  return (
    <div className="h-[42px] w-0 border-2 border-primary border-solid"></div>
  );
}

function VerificationTitle() {}
