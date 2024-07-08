'use client';

import { Id, Password } from '@components/signup/account';

export default function AccountPage() {
  return (
    <section className="flex flex-col gap-5">
      <Password />
      <Id />
    </section>
  );
}
