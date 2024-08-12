"use client";

import Image, { ImageProps, StaticImageData } from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src"> {
  src: string | StaticImageData | null;
  fallback?: string;
}

const DEFAULT_FALLBACK = "/assets/images/fallback.webp";

export default function ImageWithFallback({
  fallback,
  alt,
  src,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={(e) => setError(e)}
      src={error ? fallback || DEFAULT_FALLBACK : src || DEFAULT_FALLBACK}
      {...props}
    />
  );
}
