'use client';

import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import {
  OcrDrawer,
  StudentCertificationImage,
  StudentStatus,
} from '@components/verification';
import useIsDisabled from '@hooks/use-is-disabled';
import { FormField } from '@swifty/ui';
import { useContext } from 'react';

import { CertificationStepContext } from '../context';

export default function CertificationPage() {
  const isDisabled = useIsDisabled('image');

  const { nextStep } = useContext(CertificationStepContext);

  return (
    <section className="flex flex-col h-full gap-2.5">
      <div className="flex flex-col gap-2.5">
        <FormField
          name="image"
          render={({ field }) => (
            <FormErrorControl>
              <StudentCertificationImage onChange={field.onChange} />
            </FormErrorControl>
          )}
        />
      </div>
      <span className="text-center text-14 font-medium text-swifty-color-700 dark:text-swifty-color-300 mt-[5%]">
        학적 인증 요청 후 N시간 내로 승인 여부가 결정됩니다.<br></br> 승인
        여부는 마이페이지에서 확인 가능합니다.
      </span>
      <FixedBottomCTA
        variant="primary"
        disabled={isDisabled}
        onClick={nextStep}
      >
        다음
      </FixedBottomCTA>
    </section>
  );
}
