import { TermsOfService } from '@components/signup';

export default function Page() {
  return (
    <section className="h-full flex flex-col justify-between relative">
      <h1 className="text-white text-center font-bold text-26 my-10">
        약관 동의가 필요해요
      </h1>
      <TermsOfService />
    </section>
  );
}
