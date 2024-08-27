import NoFestival from '@images/mypage/mypage-no-festival.png';
import Image from 'next/image';

export default function NoTicketCard() {
  return (
    <Image
      src={NoFestival}
      alt="no-festival"
      width={353}
      height={207}
      unoptimized
      className="mx-auto"
    />
  );
}
