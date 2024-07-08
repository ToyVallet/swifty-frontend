'use client';

import {
  CarrierWithNationality,
  DateOfBirth,
  Name,
  PhoneNumber,
  Sex,
  SmsCode,
} from '@components/signup/identification';

export default function Identification() {
  return (
    <section className="flex flex-col gap-5">
      <SmsCode />
      <PhoneNumber />
      <CarrierWithNationality />
      <Sex />
      <DateOfBirth />
      <Name />
    </section>
  );
}
