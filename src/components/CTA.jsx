import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

const CTA = () => {
  const { scrollYProgress } = useScroll();
  const bgTextX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgTextX2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  return (
    <section className="py-24 lg:py-48 bg-[#111] relative overflow-hidden z-10 border-t border-white/5">
      {/* Background Parallax Text */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] flex flex-col justify-between py-20">
        <motion.h1 style={{ x: bgTextX1 }} className="text-[10rem] md:text-[15rem] font-bold whitespace-nowrap uppercase tracking-tight text-white">
          BEYOND BRICKS BEYOND BRICKS BEYOND BRICKS
        </motion.h1>
        <motion.h1 style={{ WebkitTextStroke: '1px white', x: bgTextX2 }} className="text-[10rem] md:text-[15rem] font-bold whitespace-nowrap uppercase text-transparent tracking-tight">
          ESTABLISHED 2014 ESTABLISHED 2014 ESTABLISHED 2014
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="text-5xl md:text-8xl font-black uppercase mb-16 tracking-tighter leading-none">
            Let's Build <br /> 
            <span className="text-accent-gold">Together</span>
          </h2>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
          }}
        >
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 rounded-full border border-accent-gold/20 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-300">
              <MapPin size={20} />
            </div>
            <span className="text-sm md:text-lg font-medium tracking-tight text-gray-300">Lagos, Nigeria</span>
          </div>

          <a href="mailto:builder@beyondbricks.ng" className="flex items-center gap-4 group transition-colors">
            <div className="w-10 h-10 rounded-full border border-accent-gold/20 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-300">
              <Mail size={20} />
            </div>
            <span className="text-sm md:text-lg font-medium tracking-tight text-gray-300 group-hover:text-accent-gold transition-colors underline decoration-accent-gold/20 underline-offset-8">builder@beyondbricks.ng</span>
          </a>

          <a href="tel:+2348122497729" className="flex items-center gap-4 group transition-colors">
            <div className="w-10 h-10 rounded-full border border-accent-gold/20 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-300">
              <Phone size={20} />
            </div>
            <span className="text-sm md:text-lg font-medium tracking-tight text-gray-300 group-hover:text-accent-gold transition-colors font-bold">+234 812 249 7729</span>
          </a>
        </motion.div>
      </div>
      
      {/* Decorative Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent-gold/5 rounded-full blur-[120px] pointer-events-none -z-10" />
    </section>
  );
};

export default CTA;
