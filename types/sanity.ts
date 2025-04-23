import { SanityImageSource } from '@sanity/image-url/lib/types/types';

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  content: any;
  publishDate: string;
  author?: string;
  categories?: string[];
  image?: SanityImage;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  content?: any;
  publishDate?: string;
  client?: string;
  industry?: string;
  services?: string[];
  images: SanityImage[];
}

export interface Event {
  _id: string;
  title: string;
  slug: { current: string };
  date: string;
  location?: string;
  description?: string;
  registrationLink?: string;
  image?: SanityImage;
}

export interface Award {
  _id: string;
  title: string;
  year: number;
  description?: string;
  image?: SanityImage;
  category?: string;
}