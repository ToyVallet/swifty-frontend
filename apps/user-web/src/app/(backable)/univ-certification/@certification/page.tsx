'use client';

import { StudentStatus } from '@components/univ-certification';
import { useFormContext } from 'react-hook-form';

export default function CertificationPage() {
  const form = useFormContext();
  return (
    <div>
      <StudentStatus />
    </div>
  );
}
