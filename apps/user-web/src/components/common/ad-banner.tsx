import Image from 'next/image';

export default function AdBanner({ src }: { src: string }) {
  return (
    <div className="flex gap-4 w-full overflow-hidden">
      <Image
        className="object-cover w-full h-[100px] rounded-xl"
        src={src}
        alt={'Ad Banner'}
        width={353}
        height={100}
      />
    </div>
  );
}
