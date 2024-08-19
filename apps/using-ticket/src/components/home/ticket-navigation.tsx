import { Button } from '@swifty/ui';
import Link from 'next/link';

export default function TicketNavigation() {
  const navigations = [
    { title: 'Dynamic (QR) 티켓 전용', href: '/dynamic' },
    { title: 'FacePass 안면 티켓 전용', href: '/facepass' },
  ] as const;
  return (
    <div className="w-full h-full flex flex-col gap-2.5 ">
      {navigations.map((nav) => (
        <CustomLink key={nav.title} {...nav} />
      ))}
    </div>
  );
}

type CustomLinkProps = {
  title: string;
  href: string;
};
function CustomLink({ title, href }: CustomLinkProps) {
  return (
    <Button asChild block variant="outlined">
      <Link href={href}>{title}</Link>
    </Button>
  );
}
