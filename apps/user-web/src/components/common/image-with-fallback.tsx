'use client';

import Image, { type ImageProps, type StaticImageData } from 'next/image';
import { useState } from 'react';

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallback: StaticImageData | string;
}

export default function ImageWithFallback({
  src,
  fallback,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<StaticImageData | string>(src);
  return (
    <Image
      {...props}
      src={imgSrc}
      alt={props.alt}
      onError={(e) => {
        setImgSrc(fallback);
        onError?.(e);
      }}
    />
  );
}
