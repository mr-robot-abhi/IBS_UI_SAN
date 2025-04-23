import { client, urlFor } from '@/lib/sanityClient';
import { BlogPost } from '@/types/sanity';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { PortableText } from '@/components/sanity/PortableText';
import { Calendar, User, Tag, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

async function getBlogPost(slug: string) {
  const post = await client.fetch<BlogPost | null>(
    `*[_type == "blog" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      content,
      publishDate,
      author,
      categories,
      image
    }`,
    { slug }
  );
  return post;
}

async function getRelatedPosts(currentPostId: string, categories: string[] = []) {
  const query = categories.length === 0
    ? `*[_type == "blog" && _id != $currentPostId] | order(publishDate desc)[0...3] {
        _id,
        title,
        slug,
        publishDate,
        image
      }`
    : `*[_type == "blog" && _id != $currentPostId && count((categories[])[@ in $categories]) > 0] | order(publishDate desc)[0...3] {
        _id,
        title,
        slug,
        publishDate,
        image
      }`;
  return client.fetch<BlogPost[]>(query, { currentPostId, categories });
}

export async function generateStaticParams() {
  const posts = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "blog"] {
      slug
    }`
  );
  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);
  if (!post) {
    notFound();
  }
  const relatedPosts = await getRelatedPosts(post._id, post.categories ?? []);

  return (
    <>
      {/* Hero Section with Featured Image */}
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        {post.image ? (
          <>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div
              className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-50"
              style={{
                backgroundImage: `url(${urlFor(post.image).width(1200).height(600).url()})`,
              }}
            ></div>
          </>
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to All Blogs
            </Link>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              {post.publishDate && (
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {formatDate(post.publishDate)}
                </div>
              )}
              {post.author && (
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  {post.author}
                </div>
              )}
              {post.categories && post.categories.length > 0 && (
                <div className="flex items-center">
                  <Tag className="h-4 w-4 mr-1" />
                  {post.categories.join(', ')}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg lg:prose-xl max-w-none">
              <PortableText content={post.content} />
            </article>
            {post.categories && post.categories.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Link
                      key={category}
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      className="px-4 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-[#005b99] hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full bg-gray-200">
                      {relatedPost.image ? (
                        <img
                          src={urlFor(relatedPost.image).width(400).height(200).url()}
                          alt={relatedPost.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-400">No image</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">
                        {formatDate(relatedPost.publishDate)}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#005b99] transition-colors duration-300 mb-4">{relatedPost.title}</h3>
                      <Button variant="link" className="text-[#005b99] p-0 group-hover:underline">
                        Read More
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover how our financial technology solutions can help your business thrive in today's competitive market.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-[#005b99] hover:bg-gray-100"
            asChild
          >
            <Link href="/contact">
              Get in Touch
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}