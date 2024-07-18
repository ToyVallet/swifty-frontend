'use client';

import { CertificationStepContext } from '@app/(backable)/univ-certification/context';
import { FixedBottomCTA } from '@components/common';
import { API_CERTIFICATION } from '@lib/constants';
import { APIError, customFetch } from '@swifty/shared-lib';
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from '@swifty/ui';
import { useContext, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import OcrInput from './ocr-input';

export default function OcrDrawer() {
  const [isOpen, setIsOpen] = useState(false);

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
    } catch (e) {
      if (APIError.isAPIError(e)) {
        form.setError('root', {
          type: String(e.statusCode),
          message: e.message[0],
        });
      }
    }
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <FixedBottomCTA
          type="button"
          variant={!isValid ? 'white' : 'default'}
          disabled={!isValid}
        >
          {isValid ? '학적 인증 요청' : '이미지를 업로드 해주세요'}
        </FixedBottomCTA>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerTitle className="text-center mb-10">
          <h1 className="text-22 font-bold mb-[5px]">
            아래의 정보가 일치한가요?
          </h1>
          <span className="text-16 font-semibold">
            일치하지 않을 경우 수정해주세요
          </span>
        </DrawerTitle>
        <div className="flex flex-col w-full text-center text-white px-5 pb-10">
          <div className="w-full flex flex-col gap-5 mb-10">
            <OcrInput name="ocrName" label="이름" placeholder="홍길동" />
            <OcrInput
              name="ocrMajor"
              label="학과"
              placeholder="오징어심리학과"
            />
            <OcrInput name="ocrStudentId" label="학번" placeholder="20200000" />
            <OcrInput
              name="ocrStudenStatus"
              label="학적 상태(수정 불가 입력)"
              disabled
            />
          </div>
          <Button onClick={onNext} size="full">
            확인
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
