import { TermsOfService } from '@components/signup';

export default function Page() {
  return (
    <section className="h-full flex flex-col justify-between">
      <h1 className="text-white text-center text-[26px] my-10">
        약관 동의가 필요해요
      </h1>
      <TermsOfService />
    </section>
  );
}
