import { client, urlFor } from '@/lib/sanityClient';
import { Event } from '@/types/sanity';
import { formatDate } from '@/lib/utils';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PortableText } from '@/components/sanity/PortableText';
import { ChevronLeft, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';

async function getEvent(slug: string) {
  const event = await client.fetch<Event | null>(
    `*[_type == "events" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      date,
      location,
      description,
      registrationLink,
      image
    }`,
    { slug }
  );
  return event;
}

async function getRelatedEvents(currentEventId: string) {
  return client.fetch<Event[]>(
    `*[_type == "events" && _id != $currentEventId] | order(date asc)[0...3] {
      _id,
      title,
      slug,
      date,
      location,
      image
    }`,
    { currentEventId }
  );
}

export async function generateStaticParams() {
  const events = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "events"] {
      slug
    }`
  );
  return events.map((event) => ({
    slug: event.slug.current,
  }));
}

interface EventPageProps {
  params: {
    slug: string;
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEvent(params.slug);
  if (!event) {
    notFound();
  }
  const relatedEvents = await getRelatedEvents(event._id);
  const eventDate = new Date(event.date);
  const isPastEvent = eventDate < new Date();

  return (
    <>
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        {event.image ? (
          <div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center opacity-50"
            style={{
              backgroundImage: `url(${urlFor(event.image).width(1200).height(600).url()})`,
            }}
          ></div>
        ) : (
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-30"></div>
        )}
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/events"
              className="inline-flex items-center text-blue-300 hover:text-white mb-6 transition-colors"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Events
            </Link>
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isPastEvent ? "bg-gray-500/50 text-gray-100" : "bg-green-500/50 text-green-100"
              }`}>
                {isPastEvent ? "Past Event" : "Upcoming Event"}
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">{event.title}</h1>
            <div className="flex flex-wrap gap-6 mb-8">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-blue-100">{formatDate(event.date)}</span>
              </div>
              {event.location && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-300" />
                  <span className="text-blue-100">{event.location}</span>
                </div>
              )}
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-300" />
                <span className="text-blue-100">{eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
            {!isPastEvent && event.registrationLink && (
              <Button variant="primary" size="lg" className="bg-white text-[#005b99] hover:bg-gray-100" asChild>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                  Register Now <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Event Details</h2>
                {event.description ? (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700">{event.description}</p>
                  </div>
                ) : (
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-700">
                      Join us for an insightful session on the latest trends and innovations in financial technology.
                      Our expert speakers will discuss key challenges facing the industry and share strategies for
                      leveraging technology to drive growth and efficiency.
                    </p>
                    <h3>Key Topics</h3>
                    <ul>
                      <li>Treasury Management Automation</li>
                      <li>AI in Financial Decision-Making</li>
                      <li>Blockchain for Secure Transactions</li>
                      <li>Regulatory Compliance in FinTech</li>
                    </ul>
                    <h3>Who Should Attend</h3>
                    <p>
                      This event is designed for CFOs, Treasury Managers, Finance Directors, and technology leaders
                      interested in optimizing financial operations through innovative solutions.
                    </p>
                  </div>
                )}
                {!isPastEvent && (
                  <div className="mt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Register Today</h3>
                    <p className="text-gray-700 mb-6">
                      Spaces are limited. Secure your spot now to join financial leaders and innovators for this exclusive event.
                    </p>
                    {event.registrationLink ? (
                      <Button variant="primary" asChild>
                        <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">
                          Register Now <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    ) : (
                      <Button variant="primary" asChild>
                        <Link href="/contact">Contact for Registration</Link>
                      </Button>
                    )}
                  </div>
                )}
                {isPastEvent && (
                  <div className="mt-8 border-t border-gray-200 pt-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Recap</h3>
                    <p className="text-gray-700 mb-6">
                      Thank you to everyone who attended this event. The presentation slides and recording are now available.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">Download Presentation</a>
                      </Button>
                      <Button variant="outline" asChild>
                        <a href="#" target="_blank" rel="noopener noreferrer">Watch Recording</a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-1/3">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm sticky top-24">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Event Information</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Date & Time</h4>
                      <p className="text-gray-900">
                        {formatDate(event.date)}, {eventDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {event.location && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-500">Location</h4>
                        <p className="text-gray-900">{event.location}</p>
                      </div>
                    )}
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Format</h4>
                      <p className="text-gray-900">
                        {event.location && event.location.toLowerCase().includes("virtual") ? "Virtual Webinar" : "In-Person Event"}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Cost</h4>
                      <p className="text-gray-900">Free of charge</p>
                    </div>
                    {!isPastEvent && event.registrationLink && (
                      <div className="pt-4">
                        <Button variant="primary" className="w-full" asChild>
                          <a href={event.registrationLink} target="_blank" rel="noopener noreferrer">Register Now</a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Speakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Speaker"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Sarah Johnson</h3>
                <p className="text-[#005b99] font-medium mb-2">Chief Financial Officer</p>
                <p className="text-gray-600 text-sm">
                  Sarah has over 20 years of experience in financial leadership roles.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Speaker"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Michael Chen</h3>
                <p className="text-[#005b99] font-medium mb-2">Director of Technology</p>
                <p className="text-gray-600 text-sm">
                  Michael leads technological innovation and digital transformation initiatives.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                  <img
                    src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                    alt="Speaker"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">David Williams</h3>
                <p className="text-[#005b99] font-medium mb-2">Treasury Specialist</p>
                <p className="text-gray-600 text-sm">
                  David specializes in treasury management and financial risk mitigation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {relatedEvents.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Other Events You Might Be Interested In</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedEvents.map((relatedEvent) => (
                <Link key={relatedEvent._id} href={`/events/${relatedEvent.slug.current}`} className="group">
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="relative h-48 w-full bg-gray-100">
                      {relatedEvent.image ? (
                        <img
                          src={urlFor(relatedEvent.image).width(400).height(200).url()}
                          alt={relatedEvent.title}
                          className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          <Calendar className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-gray-500 mb-2">{formatDate(relatedEvent.date)}</div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#005b99] transition-colors duration-300 mb-2">{relatedEvent.title}</h3>
                      {relatedEvent.location && (
                        <div className="flex items-center text-gray-500 mb-4">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span>{relatedEvent.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Updated on Future Events</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Subscribe to our newsletter to receive notifications about upcoming webinars, conferences, and other events.
          </p>
          <Button
            variant="primary"
            size="lg"
            className="bg-white text-[#005b99] hover:bg-gray-100"
            asChild
          >
            <Link href="/contact#newsletter">Subscribe to Updates</Link>
          </Button>
        </div>
      </section>
    </>
  );
}