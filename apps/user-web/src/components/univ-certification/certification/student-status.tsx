'use client';

import { FormErrorControl } from '@components/signup';
import { FormField, Select } from '@swifty/ui';

export default function StudentStatus() {
  return (
    <FormField
      name="studentStatus"
      render={({ field }) => (
        <FormErrorControl>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            label="학적"
            placeholder="학적 선택"
            options={[
              { label: '재학생', value: 'STUDENT' },
              { label: '졸업생', value: 'GRADUATE' },
              { label: '휴학생', value: 'DROP_OUT' },
              { label: '대학원', value: 'POST_GRADUATE' },
            ]}
          />
        </FormErrorControl>
      )}
    />
  );
}
