import Link from 'next/link';

type IconButtonProps = {
  link: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
};

export default function IconButton({ link, Icon, label }: IconButtonProps) {
  return (
    <div className="flex flex-col items-center justify-center text-white w-full">
      <Link
        href={link}
        className="w-full h-full flex flex-col items-center justify-center"
      >
        <div className="flex items-center justify-center w-[30px] h-[30px]">
          <Icon />
        </div>
        <span className="text-10 font-semibold">{label}</span>
      </Link>
    </div>
  );
}
