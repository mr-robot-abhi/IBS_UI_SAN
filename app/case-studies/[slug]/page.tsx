import { client, urlFor } from '@/lib/sanityClient';
import { CaseStudy } from '@/types/sanity';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Briefcase, CheckCircle, Building, Users } from 'lucide-react';

async function getCaseStudy(slug: string) {
  const study = await client.fetch<CaseStudy | null>(
    `*[_type == "caseStudies" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      client,
      services,
      images
    }`,
    { slug }
  );
  return study;
}

async function getRelatedCaseStudies(currentStudyId: string, services: string[] = []) {
  const query = services.length === 0
    ? `*[_type == "caseStudies" && _id != $currentStudyId] | order(_createdAt desc)[0...3] {
        _id,
        title,
        slug,
        client,
        images
      }`
    : `*[_type == "caseStudies" && _id != $currentStudyId && count((services[])[@ in $services]) > 0] | order(_createdAt desc)[0...3] {
        _id,
        title,
        slug,
        client,
        images
      }`;
  return client.fetch<CaseStudy[]>(query, { currentStudyId, services });
}

export async function generateStaticParams() {
  const studies = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "caseStudies"] {
      slug
    }`
  );
  return studies.map((study) => ({
    slug: study.slug.current,
  }));
}

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = await getCaseStudy(params.slug);
  if (!study) {
    notFound();
  }
  const relatedStudies = await getRelatedCaseStudies(study._id, study.services);

  const results = [
    { title: "Reduced Processing Time", value: "40%", description: "Faster transaction processing through automation" },
    { title: "Cost Savings", value: "$1.2M", description: "Annual cost reduction in treasury operations" },
    { title: "Improved Accuracy", value: "99.8%", description: "Reduction in manual errors and discrepancies" },
    { title: "ROI Timeline", value: "9 months", description: "Time to achieve positive return on investment" },
  ];

  return (
    <>
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {study.images && study.images.length > 0 ? (
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url(${urlFor(study.images[0]).width(1200).height(600).url()})`,
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/case-studies"
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to All Case Studies
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="h-6 w-6 text-blue-300" />
              <span className="text-blue-300 font-medium">Case Study</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{study.title}</h1>
            {study.client && (
              <div className="flex items-center mb-6">
                <Building className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-xl text-blue-100">{study.client}</span>
              </div>
            )}
            {study.services && study.services.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {study.services.map((service) => (
                  <span
                    key={service}
                    className="bg-blue-100/20 text-blue-100 px-3 py-1 rounded-full text-sm"
                  >
                    {service}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Overview</h2>
            <p className="text-lg text-gray-700 mb-8">
              {study.description || `${study.client || 'Our client'} faced significant challenges with their treasury operations, including manual processes, limited visibility into cash positions, and inefficient risk management. They needed a comprehensive solution to streamline operations, improve accuracy, and enhance decision-making.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Challenges</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">•</div>
                    <span>Manual, time-consuming treasury processes</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">•</div>
                    <span>Limited visibility into global cash positions</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">•</div>
                    <span>Inefficient bank connectivity and reconciliation</span>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-red-500 mr-2">•</div>
                    <span>Difficulty managing financial risk exposure</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Solution</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <span>Implementation of IBS Treasury Management System</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <span>Automated cash management and forecasting</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <span>Secure bank connectivity via SWIFT and API integration</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mr-2" />
                    <span>Comprehensive risk management tools</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {study.images && study.images.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Solution in Action</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {study.images.map((image, index) => (
                  <div key={index} className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <img
                      src={urlFor(image).width(600).height(400).url()}
                      alt={`${study.title} - Image ${index + 1}`}
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Results</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              {results.map((result, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg border-l-4 border-[#005b99]">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{result.title}</h3>
                  <p className="text-3xl font-bold text-[#005b99] mb-2">{result.value}</p>
                  <p className="text-gray-600">{result.description}</p>
                </div>
              ))}
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-12">
              <div className="flex items-start">
                <Users className="flex-shrink-0 h-6 w-6 text-[#005b99] mt-1 mr-3" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Client Testimonial</h3>
                  <p className="text-gray-700 italic mb-4">
                    "IBS Fintech's treasury management solution has transformed our financial operations. We've seen a 40% reduction in processing time and significant cost savings. Their team's expertise and support have been invaluable throughout the implementation and beyond."
                  </p>
                  <p className="text-[#005b99] font-medium">Chief Financial Officer</p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Button variant="primary" size="lg" asChild>
                <Link href="/contact">Request a Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {relatedStudies.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Case Studies</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedStudies.map((relatedStudy) => (
                <Link key={relatedStudy._id} href={`/case-studies/${relatedStudy.slug.current}`} className="group">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full bg-gray-100">
                      {relatedStudy.images && relatedStudy.images.length > 0 ? (
                        <img
                          src={urlFor(relatedStudy.images[0]).width(400).height(200).url()}
                          alt={relatedStudy.title}
                          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Briefcase className="h-16 w-16 text-gray-300" />
                        </div>
                      )}
                      {relatedStudy.client && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <span className="text-white text-sm font-medium">{relatedStudy.client}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#005b99] transition-colors duration-300">{relatedStudy.title}</h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}