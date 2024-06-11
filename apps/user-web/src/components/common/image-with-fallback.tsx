'use client';

import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src?: StaticImageData | string;
  fallback: StaticImageData | string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallback,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<typeof src>(src);

  if (!imgSrc) return <Image src={fallback} alt={alt} {...props} />;

  return (
    <Image
      src={imgSrc}
      alt={alt}
      onError={(e) => {
        setImgSrc(fallback);
        onError?.(e);
      }}
      {...props}
    />
  );
}
