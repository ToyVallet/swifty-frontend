'use client';

import {
  CarrierWithNationality,
  DateOfBirth,
  Name,
} from '@components/signup/identification';

export default function Identification() {
  return (
    <section className="flex flex-col gap-5">
      <CarrierWithNationality />
      <DateOfBirth />
      <Name />
    </section>
  );
}
