import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

interface SanityImageProps {
  image: SanityImageSource;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
}

export default function SanityImage({
  image,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
}: SanityImageProps) {
  if (!image) return null;

  const imageUrl = urlFor(image).url();
  
  if (fill) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={imageUrl}
          alt={alt}
          fill
          className={`object-cover ${className}`}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      priority={priority}
    />
  );
}