"use client";

import { useState } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

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
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
}

