'use client';

import {
  CarrierWithNationality,
  DateOfBirth,
  Name,
  PhoneNumber,
  Sex,
} from '@components/signup/identification';

export default function Identification() {
  return (
    <section className="flex flex-col gap-5">
      <PhoneNumber />
      <CarrierWithNationality />
      <Sex />
      <DateOfBirth />
      <Name />
    </section>
  );
}
