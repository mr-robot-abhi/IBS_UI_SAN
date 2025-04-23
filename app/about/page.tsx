import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Medal, Users, Timer, Globe, Shield, Zap } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-[#003087] text-white py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-no-repeat bg-cover opacity-20"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About IBS Fintech</h1>
            <p className="text-xl text-blue-100 mb-8">
              We're on a mission to transform financial operations through innovative technology and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6">
                Founded in 2005, IBS Fintech began with a simple vision: to bring cutting-edge technology to the financial industry. Our founders recognized the challenges faced by treasury and finance departments relying on outdated systems and manual processes.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Starting with a core treasury management solution, we've expanded our offerings to include comprehensive banking solutions, payment processing platforms, and risk management tools. Today, we serve clients in over 50 countries, from mid-sized businesses to global enterprises.
              </p>
              <p className="text-lg text-gray-700">
                Throughout our journey, our commitment to innovation, security, and client success has remained unwavering. As the financial landscape continues to evolve, we're proud to be at the forefront, helping organizations navigate challenges and seize opportunities.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="IBS Fintech Team" 
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              These principles guide everything we do, from product development to client relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <Medal className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in everything we do, from the quality of our solutions to the service we provide our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously innovate to ensure our clients have access to the most advanced financial technology solutions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Shield className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with the highest ethical standards, earning the trust of our clients through transparency and honesty.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Users className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Collaboration</h3>
              <p className="text-gray-600">
                We believe in the power of teamwork, both within our organization and in partnership with our clients.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Timer className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Adaptability</h3>
              <p className="text-gray-600">
                We embrace change and quickly adapt to evolving market trends and client needs.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Globe className="h-12 w-12 text-[#005b99] mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-3">Global Perspective</h3>
              <p className="text-gray-600">
                We understand the complexities of international finance and provide solutions that work across borders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600">
              Meet the experienced professionals guiding our company's vision and strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Robert Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Robert Chen</h3>
              <p className="text-[#005b99] font-medium mb-3">Chief Executive Officer</p>
              <p className="text-gray-600 text-sm">
                With over 25 years of experience in financial technology, Robert has led IBS Fintech from a small startup to a global leader.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sarah Johnson" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Sarah Johnson</h3>
              <p className="text-[#005b99] font-medium mb-3">Chief Technology Officer</p>
              <p className="text-gray-600 text-sm">
                Sarah drives our product innovation, ensuring our solutions leverage the latest technologies to meet client needs.
              </p>
            </div>

            <div className="text-center">
              <div className="mb-4 relative w-48 h-48 mx-auto overflow-hidden rounded-full">
                <img 
                  src="https://images.pexels.com/photos/3785104/pexels-photo-3785104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Michael Rodriguez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Michael Rodriguez</h3>
              <p className="text-[#005b99] font-medium mb-3">Chief Financial Officer</p>
              <p className="text-gray-600 text-sm">
                Michael brings extensive financial expertise to IBS Fintech, overseeing our global financial operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Presence</h2>
            <p className="text-lg text-gray-600">
              With offices in key financial hubs, we serve clients around the world with localized support.
            </p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <img 
              src="https://images.pexels.com/photos/103567/pexels-photo-103567.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Global Map" 
              className="w-full h-auto rounded-lg mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">North America</h3>
                <p className="text-gray-600">New York • Chicago • Toronto</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Europe</h3>
                <p className="text-gray-600">London • Frankfurt • Paris</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Asia Pacific</h3>
                <p className="text-gray-600">Singapore • Tokyo • Sydney</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Middle East</h3>
                <p className="text-gray-600">Dubai • Abu Dhabi</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Latin America</h3>
                <p className="text-gray-600">São Paulo • Mexico City</p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Africa</h3>
                <p className="text-gray-600">Johannesburg • Cairo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#005b99] text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Team</h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            We're always looking for talented individuals who share our passion for innovation and excellence.
          </p>
          <Button variant="primary" size="lg" className="bg-white text-[#005b99] hover:bg-gray-100" asChild>
            <Link href="/careers">
              View Open Positions
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}