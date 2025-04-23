'use client';

import { motion } from 'framer-motion';
import { Users as users } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Global Clients' },
  { value: '50+', label: 'Countries Served' },
  { value: '99.9%', label: 'System Uptime' },
  { value: '$2T+', label: 'Transactions Processed' },
];

export default function StatsSection() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-[#005b99] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted Worldwide</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            IBS Fintech is the preferred financial technology partner for organizations around the globe.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-colors duration-300"
              variants={item}
            >
              <p className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-blue-100">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}