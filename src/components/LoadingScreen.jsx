import React from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo-black.png";

const LoadingScreen = ({ isExiting }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0a0a0a] flex items-center justify-center transition-opacity duration-1000 ${
        isExiting ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative flex flex-col items-center">
        {/* Logo with Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 relative"
        >
          <img
            src={logo}
            alt="BeyondBricks"
            className="w-64 md:w-80 h-auto brightness-[5] grayscale contrast-200"
          />
          {/* Scanning Sweep */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-gold/20 to-transparent skew-x-12 translate-x-[-150%]"
            animate={{ x: "250%" }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
          />
        </motion.div>

        {/* Minimal Progress Bar */}
        <div className="w-48 h-[1px] bg-white/5 relative overflow-hidden mb-6">
          <motion.div 
            className="absolute inset-0 bg-accent-gold"
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </div>

        {/* Dynamic Status Text */}
        <div className="h-6 overflow-hidden">
          <motion.p 
            className="text-[0.6rem] md:text-xs uppercase tracking-[0.5em] font-black text-gray-500"
            initial={{ y: "100%" }}
            animate={{ y: [ "100%", "0%", "0%", "-100%" ] }}
            transition={{ 
              duration: 2, 
              times: [0, 0.2, 0.8, 1],
              repeat: Infinity,
              repeatDelay: 0.5 
            }}
          >
            Engineering Perfection
          </motion.p>
        </div>

        {/* Large Watermark B */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30rem] font-black text-white/[0.02] pointer-events-none select-none z-[-1]">
          B
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
