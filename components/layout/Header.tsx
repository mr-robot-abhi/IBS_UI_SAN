'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItem {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
}

const navItems: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  {
    name: 'Solutions',
    href: '/solutions',
    children: [
      { name: 'Treasury Solutions', href: '/solutions#treasury' },
      { name: 'Banking Solutions', href: '/solutions#banking' },
      { name: 'Payment Solutions', href: '/solutions#payments' },
    ],
  },
  { name: 'Blog', href: '/blog' },
  { name: 'Awards', href: '/awards' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Events', href: '/events' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-[#005b99]">
          IBS Fintech
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name} className="relative">
                {item.children ? (
                  <div>
                    <button
                      className={cn(
                        'flex items-center text-gray-700 hover:text-[#005b99] transition-colors',
                        scrolled ? 'text-gray-800' : 'text-gray-800'
                      )}
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    >
                      {item.name}
                      <ChevronDown className="ml-1 h-4 w-4" />
                    </button>
                    <AnimatePresence>
                      {activeDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-10"
                        >
                          {item.children.map((child) => (
                            <Link
                              key={child.name}
                              href={child.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-[#005b99]"
                              onClick={() => setActiveDropdown(null)}
                            >
                              {child.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      'text-gray-700 hover:text-[#005b99] transition-colors',
                      scrolled ? 'text-gray-800' : 'text-gray-800'
                    )}
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Button variant="primary">Get Started</Button>
        </div>

        <button
          className="lg:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white"
          >
            <div className="container mx-auto px-4 py-4">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.name}>
                    {item.children ? (
                      <div>
                        <button
                          className="flex items-center justify-between w-full text-gray-700 hover:text-[#005b99]"
                          onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        >
                          {item.name}
                          <ChevronDown className={cn("h-4 w-4 transition-transform", activeDropdown === item.name ? "rotate-180" : "")} />
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.name && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-2 ml-4 space-y-2"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className="block text-gray-600 hover:text-[#005b99]"
                                  onClick={() => {
                                    setIsOpen(false);
                                    setActiveDropdown(null);
                                  }}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                        className="block text-gray-700 hover:text-[#005b99]"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <Button variant="primary" className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}