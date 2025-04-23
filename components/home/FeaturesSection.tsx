'use client';

import { motion } from 'framer-motion';
import { Layers, Shield, Briefcase, TrendingUp, Users, Award } from 'lucide-react';

const features = [
  {
    icon: <Layers className="h-10 w-10 text-[#005b99]" />,
    title: 'Treasury Management',
    description: 'Optimize cash flow, improve liquidity, and streamline treasury operations with our comprehensive solution.',
  },
  {
    icon: <Shield className="h-10 w-10 text-[#005b99]" />,
    title: 'Risk Management',
    description: 'Identify, assess, and mitigate financial risks with advanced analytics and reporting tools.',
  },
  {
    icon: <Briefcase className="h-10 w-10 text-[#005b99]" />,
    title: 'Banking Solutions',
    description: 'Seamlessly connect with your banking partners and automate reconciliation processes.',
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-[#005b99]" />,
    title: 'Investment Management',
    description: 'Manage your investment portfolio with real-time monitoring and performance analysis.',
  },
  {
    icon: <Users className="h-10 w-10 text-[#005b99]" />,
    title: 'Client Relationship',
    description: 'Enhance client engagement with personalized services and seamless communication.',
  },
  {
    icon: <Award className="h-10 w-10 text-[#005b99]" />,
    title: 'Regulatory Compliance',
    description: 'Stay compliant with financial regulations through automated reporting and monitoring.',
  },
];

export default function FeaturesSection() {
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Financial Solutions
          </h2>
          <p className="text-lg text-gray-600">
            Our suite of fintech products addresses all aspects of financial management for modern businesses.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow duration-300"
              variants={item}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}