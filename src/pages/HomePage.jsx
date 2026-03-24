import React, { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Clientele from "../components/Clientele";
import CTA from "../components/CTA";

const HomePage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={containerRef} className="relative">
      {/* Side Progress Timeline */}
      <div className="fixed left-6 md:left-12 top-0 bottom-0 w-[1px] bg-white/5 z-[90] hidden lg:block">
        <motion.div 
          style={{ scaleY }}
          className="w-full h-full bg-accent-gold origin-top"
        />
        
        {/* Indicators */}
        <div className="absolute top-[20vh] -left-1">
           <div className="w-2 h-2 rounded-full bg-accent-gold shadow-[0_0_10px_#f4b942]" />
        </div>
        <div className="absolute top-[50vh] -left-1">
           <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
        <div className="absolute top-[80vh] -left-1">
           <div className="w-2 h-2 rounded-full bg-white/20" />
        </div>
      </div>

      <Hero />
      <About />
      <Clientele />
      <Services />
      <Projects />
      <CTA />
      
      {/* Cinematic Floating Noise Layer */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
           style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }} />
    </div>
  );
};

export default HomePage;
