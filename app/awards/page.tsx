import { client, urlFor } from '@/lib/sanityClient';
import { Award } from '@/types/sanity';
import { Trophy, Calendar, Bookmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Update the getAllAwards function:
async function getAllAwards() {
  return client.fetch<Award[]>(
    `*[_type == "awards"] | order(year desc) {
      _id,
      title,
      year,
      description,
      image,
      category
    }`,
    {},
    {
      next: { tags: ['awards'] } // New tag for awards
    }
  );
}

async function getAllCategories() {
  const awards = await getAllAwards();
  const categoriesSet = new Set<string>();
  awards.forEach(award => {
    if (award.category) {
      categoriesSet.add(award.category);
    }
  });
  return Array.from(categoriesSet);
}

export default async function AwardsPage() {
  const [awards, categories] = await Promise.all([
    getAllAwards(),
    getAllCategories(),
  ]);

  const awardsByYear = awards.reduce<Record<number, Award[]>>((acc, award) => {
    if (!acc[award.year]) {
      acc[award.year] = [];
    }
    acc[award.year].push(award);
    return acc;
  }, {});

  return (
    <>
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3153198/pexels-photo-3153198.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Awards & Recognition</h1>
            <p className="text-xl text-blue-100 mb-8">
              Our commitment to excellence and innovation has been recognized by leading industry organizations.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <Trophy className="h-16 w-16 text-[#005b99] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Excellence</h2>
            <p className="text-lg text-gray-600">
              At IBS Fintech, we're proud to be recognized for our innovative solutions and commitment to client success. Our awards reflect our dedication to excellence in financial technology.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {categories.map((category) => (
              <div
                key={category}
                className="flex items-center bg-gray-100 px-4 py-2 rounded-full text-gray-700 hover:bg-[#005b99] hover:text-white transition-colors cursor-pointer"
              >
                <Bookmark className="h-4 w-4 mr-2" />
                {category}
              </div>
            ))}
          </div>
          <div className="space-y-20">
            {Object.entries(awardsByYear)
              .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA))
              .map(([year, yearAwards]) => (
                <div key={year} className="relative">
                  <div className="sticky top-20 bg-white shadow-sm py-4 z-10">
                    <div className="container mx-auto px-4 md:px-6">
                      <div className="flex items-center">
                        <Calendar className="h-6 w-6 text-[#005b99] mr-2" />
                        <h2 className="text-2xl font-bold text-gray-900">{year}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
                    {yearAwards.map((award) => (
                      <Card key={award._id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="relative h-52 w-full bg-gray-100">
                          {award.image ? (
                            <img
                              src={urlFor(award.image).width(400).height(200).url()}
                              alt={award.title}
                              className="object-cover h-full w-full"
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full">
                              <Trophy className="h-20 w-20 text-gray-300" />
                            </div>
                          )}
                          {award.category && (
                            <div className="absolute top-4 right-4 bg-[#005b99] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                              {award.category}
                            </div>
                          )}
                        </div>
                        <CardHeader>
                          <CardTitle>{award.title}</CardTitle>
                          {award.year && (
                            <CardDescription>{award.year}</CardDescription>
                          )}
                        </CardHeader>
                        <CardContent>
                          {award.description && (
                            <p className="text-gray-600">{award.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Experience Award-Winning Solutions</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Discover why leading organizations choose IBS Fintech for their financial technology needs.
          </p>
          <div className="inline-flex">
            <a
              href="/contact"
              className="bg-white text-[#005b99] hover:bg-gray-100 font-medium px-8 py-3 rounded-md transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}