import Link from 'next/link';
import { client, urlFor } from '@/lib/sanityClient';
import { Event } from '@/types/sanity';
import { formatDate } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';

async function getAllEvents() {
  return client.fetch<Event[]>(
    `*[_type == "events"] | order(date asc) {
      _id,
      title,
      slug,
      date,
      location,
      description,
      registrationLink,
      image
    }`
  );
}

export default async function EventsPage() {
  const allEvents = await getAllEvents();
  const now = new Date().toISOString();
  const upcomingEvents = allEvents.filter(event => event.date > now);
  const pastEvents = allEvents.filter(event => event.date <= now);

  return (
    <>
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Events & Webinars</h1>
            <p className="text-xl text-blue-100 mb-8">
              Join us for insightful events, webinars, and conferences focused on financial technology and innovation.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Upcoming Events</h2>
          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link key={event._id} href={`/events/${event.slug.current}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 transform group-hover:-translate-y-1">
                    <div className="relative h-48 w-full bg-gray-100">
                      {event.image ? (
                        <img
                          src={urlFor(event.image).width(400).height(200).url()}
                          alt={event.title}
                          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 bg-[#005b99] text-white rounded-md overflow-hidden">
                        <div className="px-3 py-1 text-xs font-semibold">
                          {new Date(event.date).toLocaleString('default', { month: 'short' })}
                        </div>
                        <div className="px-3 py-1 bg-white text-[#005b99] text-center font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(event.date)}
                      </div>
                      <CardTitle className="group-hover:text-[#005b99] transition-colors duration-300">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {event.location && (
                        <div className="flex items-center text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                      {event.description && (
                        <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                      )}
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline_primary" asChild>
                        <Link href={`/events/${event.slug.current}`}>View Details</Link>
                      </Button>
                      {event.registrationLink && (
                        <Button variant="primary" asChild>
                          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                            Register <ExternalLink className="ml-1 h-4 w-4" />
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Upcoming Events</h3>
              <p className="text-gray-500 mb-6">Check back soon for new events or subscribe to our newsletter.</p>
              <Button variant="primary" asChild>
                <Link href="/contact#newsletter">Subscribe to Updates</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {pastEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.slice(0, 6).map((event) => (
                <Link key={event._id} href={`/events/${event.slug.current}`} className="group">
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 opacity-80 group-hover:opacity-100">
                    <div className="relative h-48 w-full bg-gray-100">
                      {event.image ? (
                        <img
                          src={urlFor(event.image).width(400).height(200).url()}
                          alt={event.title}
                          className="object-cover h-full w-full filter grayscale group-hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-0 transition-all duration-300">
                        <span className="bg-white/80 text-gray-800 px-3 py-1 rounded text-sm font-medium">Past Event</span>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="h-4 w-4 mr-1" />
                        {formatDate(event.date)}
                      </div>
                      <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {event.location && (
                        <div className="flex items-center text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" asChild>
                        <Link href={`/events/${event.slug.current}`}>View Recap</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </Link>
              ))}
            </div>
            {pastEvents.length > 6 && (
              <div className="text-center mt-12">
                <Button variant="outline">View All Past Events</Button>
              </div>
            )}
          </div>
        </section>
      )}

      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Interested in Hosting an Event with Us?</h2>
            <p className="text-xl text-blue-100 mb-8">
              We collaborate with industry partners to host webinars, workshops, and conferences focused on financial technology and innovation.
            </p>
            <Button
              variant="primary"
              size="lg"
              className="bg-white text-[#005b99] hover:bg-gray-100"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}