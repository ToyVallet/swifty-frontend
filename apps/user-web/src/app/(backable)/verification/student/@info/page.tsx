'use client';

import { CertificationStepContext } from '@app/(backable)/verification/student/context';
import { FixedBottomCTA } from '@components/common';
import { OcrInput, StudentStatus } from '@components/verification';
import { APIError, http } from '@swifty/shared-lib';
import { convertNewlineToJSX } from '@toss/react';
import { useContext } from 'react';
import {
  type FieldValues,
  type UseFormReturn,
  useFormContext,
} from 'react-hook-form';
import { toast } from 'sonner';

export default function VerificationStudentInfoPage() {
  const form = useFormContext();
  const { nextStep } = useContext(CertificationStepContext);

  const onNext = async () => {
    const isAble = [
      'ocrName',
      'ocrMajor',
      'ocrStudentId',
      'studentStatus',
    ].every((value) => {
      const { invalid, isDirty } = form.getFieldState(value);
      return !invalid && isDirty;
    });

    if (!isAble) {
      toast.error('입력창에 값을 입력해주세요');
      return;
    }

    await postCertificate(form, nextStep);
  };

  return (
    <div className="flex flex-col gap-3">
      <StudentStatus />
      <OcrInput name="ocrName" label="이름" placeholder="홍길동" />
      <OcrInput name="ocrMajor" label="학과" placeholder="오징어심리학과" />
      <OcrInput name="ocrStudentId" label="학번" placeholder="20200000" />
      <p className="text-center text-14 font-medium dark:text-swifty-color-300 text-swifty-color-700">
        {convertNewlineToJSX(
          '입력하신 정보가 정확하지 않거나 일치하지 않는 경우\n 학적 인증이 반려될 수 있어요.',
        )}
      </p>
      <FixedBottomCTA onClick={onNext}>완료</FixedBottomCTA>
    </div>
  );
}

async function postCertificate(
  form: UseFormReturn<FieldValues, any, undefined>,
  nextStep: () => void,
) {
  try {
    const formValue = form.getValues();
    const keys = Object.keys(formValue).filter(
      (name) => name !== 'exampleImage',
    );

    const formData = new FormData();
    keys.forEach((key) => {
      formData.append(key, formValue[key]);
    });
    formData.append('ocrStudentStatus', form.getValues('studentStatus'));
    await http.post('/certification', formData, { credentials: 'include' });
    nextStep();
  } catch (e) {
    if (APIError.isAPIError(e)) {
      form.setError('root', {
        type: String(e.statusCode),
        message: e.message[0],
      });
    }
  }
}
