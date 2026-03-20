import React, { useRef } from "react";
import { ArrowRight, Award, Users, Wrench } from "lucide-react";
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

  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const stats = [
    { icon: <Award size={24} />, value: "10+", label: "Years Experience" },
    { icon: <Users size={24} />, value: "200+", label: "Completed Projects" },
    { icon: <Wrench size={24} />, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section 
      id="about" 
      ref={ref}
      className="py-32 md:py-48 bg-primary-dark relative z-10 overflow-hidden"
    >
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
              className="relative z-10 w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.5)] bg-secondary-dark"
            >
              <motion.img
                style={{ y: imgY }}
                src={aboutImage}
                alt="BeyondBricks construction site"
                className="w-full h-full object-cover scale-110"
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
            <motion.div
              initial={{ scale: 0, rotate: -10 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, delay: 0.8 }}
              className="absolute -bottom-10 -right-10 bg-accent-gold text-primary-dark p-10 md:p-12 shadow-[0_30px_60px_rgba(244,185,66,0.2)] hidden md:block"
            >
              <p className="text-6xl font-black tracking-tight leading-none mb-2">10+</p>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.3em] leading-tight">Years Building <br /> Excellence</p>
              <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, white 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              />
            </motion.div>
          </div>

          {/* Right side – Content with word-by-word reveal style */}
          <div className="space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-4xl md:text-6xl font-bold mb-8 text-white uppercase tracking-tight">
                Who <span className="text-accent-gold">We Are</span>
              </h2>
              <div className="w-20 h-1 bg-accent-gold mb-12 origin-left" />
              
              <div className="space-y-6">
                <p className="text-lg md:text-xl font-light text-gray-200 leading-relaxed">
                  BeyondBricks serves as a <span className="text-accent-gold font-medium">leading force</span> in the Lagos construction industry. We are a collective of elite professionals committed to structural perfection.
                </p>
                <p className="text-base text-gray-400 font-light leading-relaxed">
                  Fueled by our commitment to excellence, we go the extra mile to ensure every client's vision is brought to life with meticulous precision. Whether it's a massive corporate development or a bespoke private structure, our standard remains unwavering.
                </p>
              </div>
            </motion.div>

            {/* Premium Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-secondary-dark/40 border border-white/5 p-6 rounded-2xl hover:border-accent-gold/40 transition-all duration-500 group"
                >
                  <div className="text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-500 group-hover:rotate-6">{stat.icon}</div>
                  <p className="text-2xl font-bold text-white mb-1 tracking-tighter">{stat.value}</p>
                  <p className="text-[0.6rem] text-gray-500 uppercase font-bold tracking-[0.3em]">{stat.label}</p>
                </motion.div>
              ))}
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
