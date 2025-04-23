import Link from 'next/link';
import { Calendar, Search } from 'lucide-react';
import { client, urlFor } from '@/lib/sanityClient';
import { BlogPost } from '@/types/sanity';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

// Update the getAllBlogPosts function:
async function getAllBlogPosts() {
  return client.fetch<BlogPost[]>(
    `*[_type == "blog"] | order(publishDate desc) {
      _id,
      title,
      slug,
      publishDate,
      author,
      categories,
      image
    }`,
    {},
    {
      next: { tags: ['blog'] } // Add revalidation tag
    }
  );
}

async function getAllCategories() {
  const posts = await getAllBlogPosts();
  const categoriesSet = new Set<string>();

  posts.forEach(post => {
    if (post.categories) {
      post.categories.forEach(category => categoriesSet.add(category));
    }
  });

  return Array.from(categoriesSet);
}

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    getAllBlogPosts(),
    getAllCategories(),
  ]);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Blog & Insights</h1>
            <p className="text-xl text-blue-100 mb-8">
              Stay updated with the latest trends, news, and insights in financial technology.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="w-full md:w-auto relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10 w-full md:w-80"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="text-sm" size="sm">
                All
              </Button>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="outline"
                  className="text-sm"
                  size="sm"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="relative h-48 w-full bg-gray-200">
                    {post.image ? (
                      <img
                        src={urlFor(post.image).width(400).height(200).url()}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      {formatDate(post.publishDate)}
                      {post.author && (
                        <span className="ml-4">By {post.author}</span>
                      )}
                    </div>
                    <CardTitle className="group-hover:text-[#005b99] transition-colors duration-300">{post.title}</CardTitle>
                  </CardHeader>

                  <CardContent>
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((category) => (
                          <span
                            key={category}
                            className="text-xs bg-blue-100 text-[#005b99] rounded-full px-2 py-1"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>

                  <CardFooter>
                    <Button variant="link" className="text-[#005b99] p-0 group-hover:underline">
                      Read More
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Stay informed with the latest insights, trends, and news in financial technology, delivered directly to your inbox.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-md"
              />
              <Button variant="primary">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}