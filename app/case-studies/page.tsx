import Link from 'next/link';
import { client, urlFor } from '@/lib/sanityClient';
import { CaseStudy } from '@/types/sanity';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Briefcase, ArrowRight } from 'lucide-react';

// Already updated in your file - keep as is:
async function getAllCaseStudies() {
  return client.fetch<CaseStudy[]>(
    `*[_type == "caseStudies"] | order(_createdAt desc) {
      _id,
      title,
      slug,
      description,
      client,
      services,
      images
    }`,
    {},
    {
      next: { tags: ['caseStudies'] }
    }
  );
}

export default async function CaseStudiesPage() {
  const caseStudies = await getAllCaseStudies();

  return (
    <>
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Case Studies</h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover how our solutions have helped organizations around the world transform their financial operations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Briefcase className="h-16 w-16 text-[#005b99] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Success Stories</h2>
            <p className="text-lg text-gray-600">
              Our clients have achieved remarkable results with our financial technology solutions. Explore these case studies to see how we can help your organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {caseStudies.map((study) => (
              <Link key={study._id} href={`/case-studies/${study.slug.current}`} className="group">
                <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                  <div className="relative h-64 w-full bg-gray-100">
                    {study.images && study.images.length > 0 ? (
                      <img
                        src={urlFor(study.images[0]).width(400).height(200).url()}
                        alt={study.title}
                        className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Briefcase className="h-20 w-20 text-gray-300" />
                      </div>
                    )}
                    {study.client && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <span className="text-white font-medium">{study.client}</span>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="group-hover:text-[#005b99] transition-colors duration-300">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {study.description && (
                      <p className="text-gray-600 mb-4">{study.description}</p>
                    )}
                    {study.services && study.services.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {study.services.map((service) => (
                          <span
                            key={service}
                            className="text-xs bg-blue-100 text-[#005b99] rounded-full px-2 py-1"
                          >
                            {service}
                          </span>
                        ))}
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-[#005b99] p-0 group-hover:underline flex items-center">
                      Read Case Study <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="md:w-1/3">
                <img
                  src="https://images.pexels.com/photos/3182822/pexels-photo-3182822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Global Bank CEO"
                  className="rounded-full w-32 h-32 md:w-48 md:h-48 object-cover mx-auto"
                />
              </div>
              <div className="md:w-2/3">
                <p className="text-xl md:text-2xl text-gray-600 italic mb-6">
                  "IBS Fintech's treasury management solution has transformed our financial operations. We've seen a 40% reduction in processing time and significant cost savings. Their team's expertise and support have been invaluable."
                </p>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Sarah Johnson</h3>
                  <p className="text-[#005b99]">CFO, Global Bank</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Client Results by the Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-[#005b99] mb-2">40%</p>
              <p className="text-gray-600">Average reduction in processing time</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-[#005b99] mb-2">$2M+</p>
              <p className="text-gray-600">Annual cost savings for enterprise clients</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-[#005b99] mb-2">99.9%</p>
              <p className="text-gray-600">System uptime, ensuring continuous operations</p>
            </div>
            <div className="text-center p-6 border border-gray-200 rounded-lg">
              <p className="text-4xl md:text-5xl font-bold text-[#005b99] mb-2">6</p>
              <p className="text-gray-600">Months average implementation time</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Financial Operations?</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Contact us today to discuss how our solutions can help your organization achieve similar results.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-[#005b99] hover:bg-gray-100"
            asChild
          >
            <Link href="/contact">Request a Consultation</Link>
          </Button>
        </div>
      </section>
    </>
  );
}