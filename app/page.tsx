import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import StatsSection from '@/components/home/StatsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { client, urlFor } from '@/lib/sanityClient';
import { BlogPost, CaseStudy, Event } from '@/types/sanity';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Calendar, ArrowRight } from 'lucide-react';

async function getLatestBlogPosts() {
  return client.fetch<BlogPost[]>(`
    *[_type == "blog"] | order(publishDate desc)[0...3] {
      _id,
      title,
      slug,
      publishDate,
      author,
      categories,
      image
    }
  `);
}

async function getLatestCaseStudies() {
  return client.fetch<CaseStudy[]>(`
    *[_type == "caseStudies"] | order(_createdAt desc)[0...2] {
      _id,
      title,
      slug,
      description,
      client,
      images
    }
  `);
}

async function getUpcomingEvents() {
  return client.fetch<Event[]>(`
    *[_type == "events" && date > now()] | order(date asc)[0...3] {
      _id,
      title,
      slug,
      date,
      location,
      image
    }
  `);
}

export default async function Home() {
  const [blogPosts, caseStudies, events] = await Promise.all([
    getLatestBlogPosts(),
    getLatestCaseStudies(),
    getUpcomingEvents(),
  ]);

  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      
      {/* Latest Blog Posts */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Insights</h2>
            <Link href="/blog" className="text-[#005b99] hover:text-[#003087] font-medium flex items-center">
              View all insights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post._id} className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-48 w-full">
                  {post.image ? (
                    <img 
                      src={urlFor(post.image).width(400).height(200).url()}
                      alt={post.title}
                      className="h-full w-full object-cover rounded-t-lg"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 rounded-t-lg flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <CardHeader>
                  <div className="text-sm text-gray-500 mb-2 flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(post.publishDate)}
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.categories.map((category) => (
                        <span key={category} className="text-xs bg-blue-100 text-[#005b99] rounded-full px-2 py-1">
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline_primary" asChild>
                    <Link href={`/blog/${post.slug.current}`}>
                      Read More
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Case Studies Highlight */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-lg text-gray-600">
              Discover how our solutions have helped clients overcome financial challenges and achieve their goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {caseStudies.map((study) => (
              <Card key={study._id} className="overflow-hidden flex flex-col md:flex-row">
                <div className="md:w-2/5 relative h-60 md:h-auto">
                  {study.images && study.images.length > 0 ? (
                    <img 
                      src={urlFor(study.images[0]).width(400).height(200).url()}
                      alt={study.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No image</span>
                    </div>
                  )}
                </div>
                <div className="md:w-3/5 p-6">
                  <CardTitle className="text-2xl mb-3">{study.title}</CardTitle>
                  {study.client && (
                    <CardDescription className="text-blue-600 font-medium mb-4">
                      Client: {study.client}
                    </CardDescription>
                  )}
                  <p className="text-gray-600 mb-6">
                    {study.description || "Discover how we helped this client achieve their financial goals with our innovative solutions."}
                  </p>
                  <Button variant="primary" asChild>
                    <Link href={`/case-studies/${study.slug.current}`}>
                      Read Case Study
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button variant="outline_primary" asChild>
              <Link href="/case-studies">
                View All Case Studies
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      
      {/* CTA Section */}
      <section className="py-24 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Financial Operations?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact us today to learn how our solutions can help your organization achieve financial excellence.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button 
              variant="primary" 
              size="lg" 
              className="bg-white text-[#005b99] hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">
                Request a Demo
              </Link>
            </Button>
            <Button 
              variant="outline_primary" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-[#005b99]"
              asChild
            >
              <Link href="/solutions">
                Explore Solutions
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}