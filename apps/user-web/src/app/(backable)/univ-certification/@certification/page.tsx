'use client';

import { FixedBottomCTA } from '@components/common';
import { FormErrorControl } from '@components/signup';
import {
  StudentCertificationImage,
  StudentStatus,
} from '@components/univ-certification';
import { API_CERTIFICATION } from '@lib/constants';
import { customFetch } from '@swifty/shared-lib';
import { FormField } from '@swifty/ui';
import { useContext } from 'react';
import { useFormContext } from 'react-hook-form';

import { CertificationStepContext } from '../context';

export default function CertificationPage() {
  const form = useFormContext();

  const {
    formState: { isValid },
  } = form;

  const { nextStep } = useContext(CertificationStepContext);
  const onNext = async () => {
    try {
      const formValue = form.getValues();
      const keys = Object.keys(formValue).filter(
        (name) => name !== 'exampleImage',
      );

      const formData = new FormData();
      keys.forEach((key) => {
        formData.append(key, formValue[key]);
      });

      await customFetch(API_CERTIFICATION.certification, {
        method: 'post',
        headers: {},
        credentials: 'include',
        body: formData,
      });

      nextStep();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="flex flex-col h-full gap-2.5 justify-between">
      <div className="flex flex-col gap-2.5">
        <StudentStatus />
        <FormField
          name="image"
          render={({ field }) => (
            <FormErrorControl>
              <StudentCertificationImage onChange={field.onChange} />
            </FormErrorControl>
          )}
        />
      </div>

      <span className="text-center text-14">
        학적 인증 요청 후 N시간 내로 승인 여부가 결정됩니다.<br></br> 승인
        여부는 마이페이지에서 확인 가능합니다.
      </span>

      <FixedBottomCTA type="button" onClick={onNext} disabled={!isValid}>
        학적 인증 요청
      </FixedBottomCTA>
    </section>
  );
}
