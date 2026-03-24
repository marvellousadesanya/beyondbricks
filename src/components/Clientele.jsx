import React from "react";
import { motion } from "framer-motion";

const Clientele = () => {
  const companies = [
    "IX Design Abuja", 
    "Bratatek Homes", 
    "PriverIA Support Services Ltd", 
    "Small Ideas Big Tech Ltd", 
    "Malok Nigeria Ltd", 
    "Lake Side Estate", 
    "Property Gate", 
    "Cresco Homes & Property"
  ];

  return (
    <section className="bg-accent-gold text-primary-dark py-12 md:py-20 relative z-10 overflow-hidden shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 md:mb-12 text-center">
        <h3 className="text-[0.6rem] md:text-xs uppercase font-bold tracking-[0.4em] opacity-80 mb-2">Our Impact</h3>
        <h2 className="text-[15px] font-bold uppercase tracking-tight">Trusted By Industry Leaders</h2>
      </div>
      
      <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
        <motion.ul 
          className="flex items-center justify-center md:justify-start [&_li]:mx-10 [&_img]:max-w-none whitespace-nowrap"
          animate={{ x: [0, -1500] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {companies.map((company, idx) => (
            <li key={idx} className="text-2xl md:text-5xl font-extrabold uppercase tracking-tighter opacity-70 hover:opacity-100 transition-opacity cursor-default flex items-center gap-6">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-dark rotate-45" />
              {company}
            </li>
          ))}
          {/* Duplicate for seamless loop */}
          {companies.map((company, idx) => (
            <li key={`dup-${idx}`} className="text-2xl md:text-5xl font-extrabold uppercase tracking-tighter opacity-70 hover:opacity-100 transition-opacity cursor-default flex items-center gap-6">
              <div className="w-3 h-3 md:w-4 md:h-4 bg-primary-dark rotate-45" />
              {company}
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
};

export default Clientele;
