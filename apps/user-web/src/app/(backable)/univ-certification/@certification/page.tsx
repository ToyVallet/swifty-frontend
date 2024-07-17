'use client';

import { FormErrorControl } from '@components/signup';
import {
  OcrDrawer,
  StudentCertificationImage,
  StudentStatus,
} from '@components/univ-certification';
import { FormField } from '@swifty/ui';

export default function CertificationPage() {
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

      <OcrDrawer />
    </section>
  );
}
