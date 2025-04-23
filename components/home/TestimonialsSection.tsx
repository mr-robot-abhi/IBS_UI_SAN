'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "IBS Fintech's treasury management solution has revolutionized our financial operations. We've seen a 40% reduction in processing time and significant cost savings.",
    author: "Sarah Johnson",
    title: "CFO, Global Enterprises Inc.",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "The level of customer support we've received has been exceptional. The team at IBS Fintech truly understands our business needs and provides tailored solutions.",
    author: "Michael Chen",
    title: "Treasury Director, Pacific Trading Co.",
    image: "https://images.pexels.com/photos/3789888/pexels-photo-3789888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
  {
    quote: "Implementation was smooth and the ROI was almost immediate. Our payment processing is now faster, more secure, and compliant with all regulations.",
    author: "Emma Rodriguez",
    title: "Head of Finance, Innovate Financial",
    image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const handleNext = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setAutoplay(false);
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600">
            Hear from the organizations that have transformed their financial operations with IBS Fintech.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-gray-50 rounded-xl p-8 md:p-12 shadow-md"
            >
              <Quote className="h-12 w-12 text-[#005b99]/20 mb-6" />
              <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
                "{testimonials[current].quote}"
              </p>
              <div className="flex items-center">
                <img
                  src={testimonials[current].image}
                  alt={testimonials[current].author}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{testimonials[current].author}</h4>
                  <p className="text-gray-600">{testimonials[current].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false);
                  setCurrent(index);
                }}
                className={`w-3 h-3 rounded-full ${
                  index === current ? 'bg-[#005b99]' : 'bg-gray-300'
                } transition-colors duration-300`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-12 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-[#005b99] focus:outline-none hidden md:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-12 bg-white rounded-full p-2 shadow-md text-gray-700 hover:text-[#005b99] focus:outline-none hidden md:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}