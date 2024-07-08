'use client';

import {
  CarrierWithNationality,
  Name,
} from '@components/signup/identification';

export default function Identification() {
  return (
    <section className="flex flex-col gap-5">
      <CarrierWithNationality />
      <Name />
    </section>
  );
}
