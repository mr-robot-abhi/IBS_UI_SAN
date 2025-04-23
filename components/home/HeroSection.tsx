'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative bg-gradient-to-r from-[#002259] to-[#005b99] text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579547945413-497e1b99dac0?ixlib=rb-4.0.3')] bg-no-repeat bg-cover opacity-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-24 md:py-32 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Innovative <span className="text-blue-300">Financial</span> Technology Solutions
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Transform your business with our cutting-edge treasury, banking, and payment solutions. Streamline operations, reduce costs, and drive growth with IBS Fintech.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button variant="primary" size="lg" asChild>
                <Link href="/solutions">
                  Explore Solutions <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline_primary" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-[#005b99]" asChild>
                <Link href="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-1/2 mt-12 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="relative h-[400px] w-full rounded-lg overflow-hidden shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Financial Technology" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003087]/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="bg-[#005b99] text-white text-xs font-semibold px-2.5 py-1 rounded-full mb-3 inline-block">
                  Featured
                </span>
                <h3 className="text-xl font-bold text-white mb-2">Next-Generation Treasury Management</h3>
                <p className="text-gray-200 text-sm mb-4">Optimize cash flow, manage liquidity, and streamline treasury operations.</p>
                <Link href="/solutions#treasury" className="text-blue-300 hover:text-white text-sm font-medium flex items-center">
                  Learn more <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}