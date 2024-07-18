'use client';

import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import { ExampleImage, UnivSearch } from '@components/verification';
import { FormField } from '@swifty/ui';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CertificationStepContext } from '../context';

export default function ExamplePage() {
  const { nextStep } = useContext(CertificationStepContext);
  const form = useFormContext();
  const { getFieldState } = form;
  const university = getFieldState('universityId');

  return (
    <>
      <div className="flex flex-col gap-5 overflow-y-scroll scrollbar-hide">
        <FormField
          name="universityId"
          render={({ field }) => (
            <FormErrorControl>
              <UnivSearch onChange={field.onChange} />
            </FormErrorControl>
          )}
        />

        <ExampleImage />
      </div>
      <FixedBottomCTA
        onClick={nextStep}
        disabled={!university.isDirty && !university.error}
      >
        다음
      </FixedBottomCTA>
    </>
  );
}
