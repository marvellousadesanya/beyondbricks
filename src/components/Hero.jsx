import React, { useRef, useState, useEffect } from "react";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const Hero = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 1, 
        delay: 0.5 + i * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }
    })
  };

  const buildingLetters = "Building".split("");
  const beyondLetters = "Beyond".split("");
  const expectationsLetters = "Expectations".split("");

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative h-[100vh] flex items-center justify-center overflow-hidden bg-primary-dark"
    >
      {/* Cinematic Video/Image Background */}
      <motion.div 
        style={{ y, scale, opacity }}
        className="absolute inset-0 w-full h-full"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover brightness-[0.3]"
        >
          <source
            src="https://res.cloudinary.com/dggeuuu1n/video/upload/v1761005613/AdobeStock_353539039_Video_4K_Preview_y1qzt4.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-dark/40 to-primary-dark" />
      </motion.div>

      {/* Floating Elements for Depth */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-accent-gold/20 rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
        <motion.div 
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-accent-gold/5 rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 -right-20 w-[40rem] h-[40rem] bg-accent-gold/5 rounded-full blur-[120px]" 
        />
      </div>

      <div className="relative z-10 text-center px-4 max-w-7xl mx-auto w-full">
        <motion.div
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          className="space-y-8"
        >
          {/* Label Pill */}
          <motion.div 
            variants={textVariants}
            custom={0}
            className="flex justify-center mb-6"
          >
            <span className="px-6 py-2 text-[0.7rem] md:text-xs font-bold tracking-[0.4em] uppercase border border-accent-gold/30 text-accent-gold bg-accent-gold/5 backdrop-blur-md rounded-full">
              Lagos' Premier Construction Firm
            </span>
          </motion.div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-[5.5rem] font-bold text-white leading-[0.9] uppercase tracking-tighter">
            <div className="flex flex-wrap justify-center overflow-hidden">
              {buildingLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 0.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="w-8 md:w-10" />
              {beyondLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 1.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block text-accent-gold"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="w-8 md:w-10" />
              {expectationsLetters.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={isLoaded ? { y: 0, opacity: 1 } : {}}
                  transition={{ duration: 1.2, delay: 1.6 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </h1>

          <motion.p 
            variants={textVariants}
            custom={2}
            className="text-sm sm:text-base md:text-xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed mt-6 md:mt-8 px-4"
          >
            Delivering structural excellence through <span className="text-white font-medium">precision, innovation, and integrity.</span>
          </motion.p>

          {/* CTA Group */}
          <motion.div 
            variants={textVariants}
            custom={3}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/contact")}
              className="group relative overflow-hidden bg-accent-gold text-primary-dark px-10 py-5 font-bold uppercase tracking-widest text-sm transition-all duration-300 shadow-[0_0_40px_rgba(244,185,66,0.2)]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start Building <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
                style={{ opacity: 0.2 }}
              />
            </motion.button>

            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate("/projects")}
              className="flex items-center gap-4 text-white hover:text-accent-gold transition-colors duration-300 uppercase tracking-[0.2em] text-xs font-bold"
            >
              <div className="w-14 h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:border-accent-gold transition-colors">
                <Play fill="currentColor" size={16} />
              </div>
              Explore Our Portfolio
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      {/* Extreme Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary-dark to-transparent z-20" />

      {/* Progress Indicator */}
      <motion.div 
        className="absolute bottom-10 left-10 md:left-20 flex flex-col items-start gap-4 z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <div className="flex items-center gap-4">
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-accent-gold">Beyond Bricks</span>
          <div className="w-20 h-[1px] bg-accent-gold/20" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">Master Builder</span>
        </div>
      </motion.div>

      {/* Scroll Mouse Icon */}
      <motion.div 
        className="absolute bottom-10 right-10 md:right-20 z-30 hidden lg:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-[1px] h-20 bg-gradient-to-b from-accent-gold to-transparent mx-auto" />
      </motion.div>
    </section>
  );
};

export default Hero;
