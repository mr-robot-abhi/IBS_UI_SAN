'use client';

import { PortableText as PortableTextComponent } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanityClient';
import Link from 'next/link';

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative w-full h-96 my-8">
          <Image
            src={urlFor(value).url()}
            alt={value.alt || 'Image'}
            fill
            className="object-cover rounded-lg"
          />
        </div>
      );
    },
  },
  marks: {
    link: ({ value, children }: any) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <Link href={value?.href} target={target} className="text-blue-700 hover:underline">
          {children}
        </Link>
      );
    },
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl font-bold mt-6 mb-4">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-xl font-bold mt-6 mb-4">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-blue-700 pl-4 my-6 italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-6 mb-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="ml-6 mb-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};

export function PortableText({ content }: { content: any }) {
  return <PortableTextComponent value={content} components={components} />;
}