import FooterDrawer from '@components/common/footer/footer-accordion';
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
    <footer className="w-full flex flex-col px-9 pt-10 pb-24 lg:max-w-full bg-swifty-color-200 dark:bg-swifty-color-dark-bg">
      <div className="w-full flex justify-between mb-12">
        {footerLinks.map(({ name, href }) => (
          <Link href={href} key={name} className="font-medium text-12">
            {name}
          </Link>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center gap-[30px]">
        <FooterDrawer />
        <div className="m-auto text-[9px] font-medium">
          Copyright ⓒ Swifty Corporation Co., Ltd. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
