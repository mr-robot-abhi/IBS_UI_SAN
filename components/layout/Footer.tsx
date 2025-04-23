import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, PhoneCall, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  return (
    <footer className="bg-[#003087] text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">IBS Fintech</h3>
            <p className="text-gray-300 mb-4">
              Leading provider of innovative financial technology solutions for businesses worldwide.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </Link>
              <Link href="https://twitter.com" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </Link>
              <Link href="https://instagram.com" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions#treasury" className="text-gray-300 hover:text-white transition-colors">
                  Treasury Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions#banking" className="text-gray-300 hover:text-white transition-colors">
                  Banking Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions#payments" className="text-gray-300 hover:text-white transition-colors">
                  Payment Solutions
                </Link>
              </li>
              <li>
                <Link href="/solutions#risk" className="text-gray-300 hover:text-white transition-colors">
                  Risk Management
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-300 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-gray-300 hover:text-white transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/awards" className="text-gray-300 hover:text-white transition-colors">
                  Awards
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-2 h-5 w-5 text-[#005b99] flex-shrink-0" />
                <span className="text-gray-300">
                  123 Financial District, New York, NY 10001
                </span>
              </li>
              <li className="flex items-center">
                <PhoneCall className="mr-2 h-5 w-5 text-[#005b99] flex-shrink-0" />
                <span className="text-gray-300">+1 (123) 456-7890</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-[#005b99] flex-shrink-0" />
                <span className="text-gray-300">info@ibsfintech.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} IBS Fintech. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}