'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Phone, Mail, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Name must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  company: z.string().optional(),
  phone: z.string().optional(),
  subject: z.string().min(5, {
    message: 'Subject must be at least 5 characters.',
  }),
  message: z.string().min(10, {
    message: 'Message must be at least 10 characters.',
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log(data);
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 mb-8">
              Get in touch with our team to learn more about our solutions or to request a demo.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#005b99] text-white rounded-full mb-4">
                <MapPin className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Headquarters</h3>
              <p className="text-gray-600">
                123 Financial District<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#005b99] text-white rounded-full mb-4">
                <Phone className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600 mb-2">Main: +1 (123) 456-7890</p>
              <p className="text-gray-600">Support: +1 (123) 456-7891</p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg text-center hover:shadow-md transition-shadow duration-300">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-[#005b99] text-white rounded-full mb-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-2">General: info@ibsfintech.com</p>
              <p className="text-gray-600">Support: support@ibsfintech.com</p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-8">
                Have questions about our solutions? Fill out the form below and one of our representatives will get back to you shortly.
              </p>

              {isSubmitted ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-4">
                    Thank you for contacting us. We'll get back to you as soon as possible.
                  </p>
                  <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        {...register('name')}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        {...register('email')}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <Input
                        id="company"
                        placeholder="Your company"
                        {...register('company')}
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <Input
                        id="phone"
                        placeholder="Your phone number"
                        {...register('phone')}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="subject"
                      placeholder="Message subject"
                      {...register('subject')}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      placeholder="Your message"
                      rows={5}
                      {...register('message')}
                      className={`w-full rounded-md border ${
                        errors.message ? 'border-red-500' : 'border-input'
                      } bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button type="submit" variant="primary" disabled={isSubmitting} className="w-full md:w-auto">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            <div>
              <div className="bg-gray-50 p-8 rounded-lg h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">How We Can Help</h2>

                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Request a Demo</h3>
                    <p className="text-gray-600 mb-4">
                      See our solutions in action with a personalized demo tailored to your business needs.
                    </p>
                    <Link href="#" className="text-[#005b99] hover:underline inline-flex items-center">
                      Schedule a Demo
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Sales Inquiries</h3>
                    <p className="text-gray-600 mb-4">
                      Speak with our sales team to learn about pricing, implementation, and customization options.
                    </p>
                    <Link href="#" className="text-[#005b99] hover:underline inline-flex items-center">
                      Contact Sales
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h3>
                    <p className="text-gray-600 mb-4">
                      Already a client? Our technical support team is available to assist you with any issues.
                    </p>
                    <Link href="#" className="text-[#005b99] hover:underline inline-flex items-center">
                      Get Support
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Partnership Opportunities</h3>
                    <p className="text-gray-600 mb-4">
                      Interested in partnering with IBS Fintech? Explore our partnership programs.
                    </p>
                    <Link href="#" className="text-[#005b99] hover:underline inline-flex items-center">
                      Partner With Us
                      <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-0">
        <div className="h-96 w-full bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343008!2d-74.0059418843508!3d40.74127737932881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259bf5c1654f3%3A0xc80f9cfce5383d5d!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sus!4v1637176814332!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Stay updated with the latest news, insights, and events from IBS Fintech.
          </p>

          <div className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 placeholder:text-gray-500"
              />
              <Button variant="primary" className="bg-white text-[#005b99] hover:bg-gray-100">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We respect your privacy. You can unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}