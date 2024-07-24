import Link from 'next/link';

const footerLinks = [
  {
    name: '이용약관',
    href: '#',
  },
  {
    name: '개인정보처리방침',
    href: '#',
  },
  {
    name: '분쟁해결기준',
    href: '#',
  },
  {
    name: '공지사항',
    href: '#',
  },
];

export default function Footer() {
  return (
    <footer className="w-full flex flex-col px-9 pt-10 pb-8 lg:max-w-full bg-swifty-color-200 dark:bg-swifty-color-darkBg">
      <div className="w-full flex justify-between mb-12">
        {footerLinks.map(({ name, href }) => (
          <Link href={href} key={name} className="font-medium text-12">
            {name}
          </Link>
        ))}
      </div>
      <h3 className="font-medium text-[11px] mb-3">
        (주)스위프트코퍼레이션 사업자등록 정보
      </h3>
      <p className="text-[10px] whitespace-pre-line leading-[15px] mb-16 dark:text-swifty-color-300 text-swifty-color-600 ">
        주식회사 스위프티코퍼레이션
        <br />
        경기도 화성시 동탄중심상가2길 8,6층(반송동)
        <br />
        사업자등록번호 436-86-02915 &#91;
        <Link href="#" className="underline underline-offset-2">
          사업자정보 확인
        </Link>
        &#93;
        <br />
        이메일 info@feasta.kr
      </p>
      <div className="m-auto text-[9px] font-medium">
        Copyright ⓒ Swifty Corporation Co., Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
