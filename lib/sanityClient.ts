import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// 1. Basic client config (no extra options)
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'dm1tq9mh', // Fallback to your ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'ibsdemo', // Fallback to your dataset
  apiVersion: '2023-05-03', // Freeze at this stable version
  useCdn: true // Always use CDN (faster, cheaper)
});

// 2. Only add image URL builder if you actually use it
const builder = imageUrlBuilder(client);
export const urlFor = (source: any) => builder.image(source);