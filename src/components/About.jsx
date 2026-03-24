import React, { useRef } from "react";
import { ArrowRight, Award, Users, Shield, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import aboutImage from "../assets/who-we-are.webp";

const About = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: <Award size={24} />, value: "10+", label: "Years Experience" },
    { icon: <Users size={24} />, value: "50+", label: "Projects Completed" },
    { icon: <Shield size={24} />, value: "100%", label: "Safety Rating" },
    { icon: <TrendingUp size={24} />, value: "Nigeria", label: "Nationwide Impact" },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-32 md:py-48 bg-[#111] relative z-10 overflow-hidden"
    >
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#f4b942 0.5px, transparent 0.5px)', backgroundSize: '30px 30px' }} />
      
      <motion.div 
        style={{ opacity }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          
          {/* Left side – Multi-layered Image with Parallax */}
          <div className="relative group">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.5)] bg-secondary-dark h-[250px] md:h-auto"
            >
              <img
                src={aboutImage}
                alt="BeyondBricks team"
                className="w-full h-full object-cover object-top md:h-auto md:block"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Decorative Gold Frame Offset */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
              className="absolute -top-6 -right-6 w-full h-full border border-accent-gold/20 rounded-2xl -z-10 group-hover:scale-105 transition-transform duration-700" 
            />

            {/* Gold badge with rotating shimmer */}
          

            {/* Premium Stats Grid - Moved here under image */}
            <div className="grid grid-cols-2 gap-4 mt-12 md:mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white/[0.03] backdrop-blur-xl border border-white/5 p-5 md:p-6 rounded-2xl hover:border-accent-gold/40 transition-all duration-500 group relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-accent-gold/0 group-hover:bg-accent-gold/40 transition-all" />
                  <div className="text-accent-gold mb-3 group-hover:scale-110 transition-transform duration-500 scale-75 md:scale-100 origin-left">{stat.icon}</div>
                  <p className="text-xl md:text-2xl font-black text-white mb-1 tracking-tighter group-hover:text-accent-gold transition-colors">{stat.value}</p>
                  <p className="text-[0.5rem] md:text-[0.6rem] text-gray-500 uppercase font-bold tracking-[0.2em]">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right side – Content with word-by-word reveal style */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="relative mb-12">
                <h2 className="text-[3.5rem] md:text-[6rem] font-black text-white/5 absolute -top-10 -left-1 md:-top-16 md:-left-4 uppercase tracking-tighter leading-none select-none">
                  BEYOND
                </h2>
                <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight relative z-10">
                  Who <span className="text-accent-gold">We Are</span>
                </h2>
                <div className="w-20 h-1 bg-accent-gold mt-6 origin-left" />
              </div>
              
              <div className="space-y-6">
                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                  Beyond Bricks Construction is a leading construction firm specializing in residential, commercial, and industrial developments across Nigeria. We transform ideas into <span className="text-accent-gold font-medium">durable, high-performing structures</span> that stand the test of time.
                </p>
                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                  At Beyond Bricks Construction, we combine technical expertise with strategic project execution to deliver outstanding results. With over a decade of industry experience, our team has successfully handled diverse construction projects, consistently meeting the highest standards of safety, quality, and efficiency.
                </p>
                <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                  We pride ourselves on our ability to translate client visions into functional, sustainable, and aesthetically exceptional structures while maintaining strict timelines and budgets.
                </p>
              </div>
            </motion.div>

            <div className="mt-12 md:mt-20 pt-8 border-t border-white/5">
              {/* Stats moved out of here */}
            </div>

            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.6, delay: 0.6 }}
            >
              <button
                onClick={() => navigate("/contact")}
                className="group flex items-center gap-4 text-accent-gold hover:text-white transition-colors duration-300 uppercase tracking-widest font-bold text-xs"
              >
                Schedule consultation
                <div className="w-12 h-12 rounded-full border border-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-[#111] transition-all duration-300">
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
