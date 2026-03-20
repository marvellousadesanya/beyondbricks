import React, { useState, useEffect } from "react";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sulaiman Adeyemo",
      role: "Property Developer",
      text: "I recently had the pleasure of working with Beyond Bricks, and I couldn't be happier with the results. Their attention to detail, dedication to quality, and commitment to meeting deadlines exceeded my expectations. They transformed my vision into a stunning reality.",
      rating: 5,
    },
    {
      id: 2,
      name: "Olusegun Yemisi",
      role: "Real Estate Investor",
      text: "Beyond Bricks craftsmanship is unparalleled, and their dedication to delivering outstanding service is evident in every detail. From start to finish, Beyond Bricks exhibited professionalism and effective communication. They not only met my expectations but also provided innovative solutions.",
      rating: 5,
    },
    {
      id: 3,
      name: "Job Emeka",
      role: "Homeowner",
      text: "I recently collaborated with Beyond Bricks. What truly sets them apart is their innovative approach to cost-effectiveness, helping me achieve my dream project within budget. I wholeheartedly recommend Beyond Bricks for their expertise and dedication.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "200+", label: "Completed Projects" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+",  label: "Years Experience" },
    { value: "35+",  label: "Team Members" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="testimonials" className="py-32 md:py-48 bg-primary-dark relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-accent-gold/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-24 px-4"
        >
          <h2 className="text-3xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tight">
            Client <span className="text-accent-gold">Voices</span>
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-10 origin-left" />
        </motion.div>

        {/* Cinematic Testimonial Slider */}
        <div className="relative min-h-[450px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="max-w-5xl mx-auto"
            >
              <div className="relative inline-block mb-12">
                <Quote size={80} className="text-accent-gold/20 absolute -top-10 -left-12 -z-10" />
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent-gold text-accent-gold" />
                  ))}
                </div>
                <h3 className="text-xl md:text-2xl lg:text-3xl font-light italic leading-relaxed text-white/90 px-4 md:px-0">
                  "{testimonials[activeIndex].text}"
                </h3>
              </div>
              
              <div className="space-y-4">
                <div className="w-16 h-16 rounded-full bg-accent-gold text-primary-dark mx-auto flex items-center justify-center font-black text-2xl shadow-[0_10px_30px_rgba(244,185,66,0.3)]">
                  {testimonials[activeIndex].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold uppercase tracking-widest text-white">{testimonials[activeIndex].name}</h4>
                  <p className="text-accent-gold text-xs uppercase tracking-[0.3em] font-medium mt-1">{testimonials[activeIndex].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slider Pagination */}
          <div className="flex justify-center gap-4 mt-16">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 rounded-full h-1.5 ${
                  idx === activeIndex ? "w-12 bg-accent-gold" : "w-3 bg-gray-800 hover:bg-gray-600"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* High-End Stats Visualization */}
        <div className="mt-40 grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group p-8 rounded-2xl bg-secondary-dark/30 border border-white/5 hover:border-accent-gold/30 transition-all duration-500"
            >
              <motion.div 
                 className="text-3xl md:text-6xl font-black text-accent-gold mb-3 tracking-tighter"
                 whileHover={{ scale: 1.05 }}
              >
                {stat.value}
              </motion.div>
              <p className="text-[0.7rem] md:text-xs text-gray-400 font-bold uppercase tracking-[0.4em] leading-relaxed group-hover:text-white transition-colors">
                {stat.label}
              </p>
              
              {/* Subtle animated border */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-[1px] bg-accent-gold/20 group-hover:w-20 group-hover:bg-accent-gold/60 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
