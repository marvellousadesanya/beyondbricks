import React, { useRef, useState, useEffect } from "react";
import { Play, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import bamiHero from "../assets/bami-hero.jpg";
import teamHero from "../assets/beyondbricks-team-hero.jpg";
import showreelVideo from "../assets/showreel.mp4";
import { X } from "lucide-react";
import CTA from "../components/CTA";

// Split Text Component
const SplitTextReveal = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap gap-x-2 ${className}`}
    >
      {words.map((word, index) => (
        <span key={index} className="overflow-hidden pb-1">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "120%", opacity: 0 },
              visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 } }
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
};

// Image Reveal Component
const CoverImageReveal = ({ src, alt, className, style }) => {
  return (
    <motion.div
      className={`relative overflow-hidden w-full h-full ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={style}
    >
      <motion.div
        className="absolute inset-0 bg-accent-gold z-10"
        variants={{
          hidden: { x: "0%" },
          visible: { x: "100%", transition: { duration: 0.9, ease: [0.77, 0, 0.175, 1] } },
        }}
      />
      <motion.img
        src={src}
        alt={alt}
        className="block w-full h-full object-cover"
        variants={{
          hidden: { scale: 1.15 },
          visible: { scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.6 } }}
      />
    </motion.div>
  );
};

// Work Parallax Component
const WorkParallaxItem = ({ work, index }) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);

  return (
    <motion.div 
      ref={ref}
      onClick={() => navigate(`/project/${work.id}`)}
      className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-10 lg:gap-20 items-center cursor-pointer`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full md:w-3/5">
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative block">
           <CoverImageReveal src={work.thumbnail || work.images[0]} alt={work.title} style={{ y: imgY }} />
        </div>
      </div>

      <motion.div 
        className="w-full md:w-2/5 space-y-4"
        style={{ y: textY }}
        variants={{
          hidden: { opacity: 0, x: index % 2 !== 0 ? -30 : 30 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8, delay: 0.3, ease: "easeOut" } }
        }}
      >
        <motion.p 
          className="text-accent-gold font-medium tracking-widest text-base uppercase"
          whileHover={{ x: 8 }}
        >
          0{index + 1} <span className="mx-2 text-white/40">/</span> {work.category}
        </motion.p>
        <h3 className="text-3xl lg:text-5xl font-bold uppercase flex flex-col gap-4 group-hover:text-accent-gold transition-colors duration-400">
          {work.title}
        </h3>
        <p className="text-gray-400 text-base lg:text-lg leading-relaxed font-light mt-4">
          {work.description}
        </p>
        <div className="w-14 h-14 mt-6 rounded-full border border-gray-600 flex items-center justify-center group-hover:border-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-400">
          <ArrowUpRight strokeWidth={2} size={24} className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  // Global Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const rotateConst = useTransform(scrollYProgress, [0, 1], [0, 360]);

  // Hero Parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Specific Hero Background Text Parallax
  const bgHeroX1 = useTransform(heroScroll, [0, 1], ["0%", "20%"]);
  const bgHeroX2 = useTransform(heroScroll, [0, 1], ["0%", "-20%"]);

  // Background Text Parallax (General)
  const bgTextX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgTextX2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  // About Parallax
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // Showreel Modal State
  const [showreelOpen, setShowreelOpen] = useState(false);



  return (
    <div className="bg-[#111] text-white min-h-screen pt-20 overflow-hidden relative font-['Outfit',sans-serif]">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-gold z-50 origin-left" style={{ scaleX }} />

      {/* Background Text Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 flex flex-col justify-between py-40">
        <motion.h1 style={{ x: bgTextX1 }} className="text-[6rem] md:text-[10rem] font-black whitespace-nowrap uppercase tracking-tight text-white/5">
          ENGINEERING EXCELLENCE ENGINEERING EXCELLENCE
        </motion.h1>
        <motion.h1 style={{ WebkitTextStroke: '1px white', x: bgTextX2 }} className="text-[6rem] md:text-[10rem] font-bold whitespace-nowrap uppercase text-transparent tracking-tight opacity-5">
           TRANSFORMING LANDSCAPES TRANSFORMING LANDSCAPES
        </motion.h1>
      </div>
      
      {/* Portfolio Specific Hero Background Animation */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none z-0">
          <motion.div style={{ x: bgHeroX1 }} className="absolute top-[15%] -left-[10%] opacity-20">
             <h1 className="text-[12rem] md:text-[20rem] font-black text-white/5 uppercase tracking-tighter select-none">BEYOND</h1>
          </motion.div>
          <motion.div style={{ x: bgHeroX2 }} className="absolute bottom-[15%] -right-[10%] opacity-20">
             <h1 className="text-[12rem] md:text-[20rem] font-black text-white/5 uppercase tracking-tighter select-none">BRICKS</h1>
          </motion.div>
      </div>
      
      {/* Floating Rotating Accent Element */}
      <motion.div 
        style={{ rotate: rotateConst }}
        className="fixed top-1/2 right-10 md:right-32 w-24 h-24 border border-accent-gold/20 pointer-events-none z-0 hidden lg:block"
      />

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24 flex flex-col lg:flex-row items-center lg:items-start gap-12 min-h-[85vh]">
        <motion.div 
          className="flex-1 space-y-8"
          initial="hidden"
          animate="visible"
          style={{ opacity: heroOpacity }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}>
            <div className="overflow-hidden flex flex-col items-start">
              <motion.h1 
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.8, ease: "easeOut" } } }}
                className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter text-white"
              >
                Beyond
              </motion.h1>
              <motion.h1 
                variants={{ hidden: { y: "100%" }, visible: { y: 0, transition: { duration: 0.8, delay: 0.1, ease: "easeOut" } } }}
                className="text-6xl md:text-8xl font-black leading-[0.85] uppercase tracking-tighter text-accent-gold"
              >
                Bricks
              </motion.h1>
            </div>
            <motion.div 
               variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1.2, delay: 0.4, ease: "circOut" } } }}
               className="h-1 bg-accent-gold w-full origin-left mt-6"
            />
          </motion.div>

          <motion.div className="space-y-2 overflow-hidden">
            <motion.h6 variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.6 } } }} className="text-lg md:text-2xl text-gray-300 font-medium uppercase tracking-wide">
              Company <span className="text-accent-gold">Portfolio</span>
            </motion.h6>
            <motion.h6 variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.6 } } }} className="text-lg md:text-2xl text-gray-400 font-light uppercase tracking-widest text-[0.7rem]">
              Structural <span className="text-accent-gold">Landmarks</span>
            </motion.h6>
          </motion.div>
          
          <motion.button 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowreelOpen(true)}
            className="flex items-center gap-3 text-accent-gold hover:text-white transition-colors duration-300 uppercase tracking-widest font-semibold group mt-8"
          >
            <span className="w-14 h-14 rounded-full border border-accent-gold flex items-center justify-center group-hover:bg-accent-gold group-hover:text-[#111] transition-all duration-300 relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-accent-gold scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
              <Play className="relative z-10 ml-1" fill="currentColor" size={18} />
            </span>
            Watch Showreel
          </motion.button>
        </motion.div>
        
        <motion.div className="flex-1 w-full relative" style={{ y: heroY }}>
          <div className="w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl relative">
             <CoverImageReveal src={teamHero} alt="Beyond Bricks Team" className="transition-all duration-700" />
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} className="py-32 mt-12 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/40">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <motion.div 
            className="w-full md:w-5/12"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8 tracking-tight">
              Meet our <span className="text-accent-gold">CEO & Founder</span>
            </h2>
            <motion.div style={{ y: aboutImgY }} className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative group">
               <CoverImageReveal src={bamiHero} alt="CEO & Founder" />
               
               {/* Floating Experience Badge */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 className="absolute bottom-6 -right-6 bg-accent-gold text-primary-dark p-6 rounded-full w-32 h-32 flex flex-col items-center justify-center shadow-2xl z-20 hidden md:flex"
               >
                 <span className="text-3xl font-black leading-none">10+</span>
                 <span className="text-[10px] uppercase font-bold tracking-tighter">Years Exp</span>
               </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-7/12 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light">
              Our CEO is a proactive professional with deep technical expertise. Having led nationwide secondary developments, he is <span className="text-accent-gold font-medium">highly reliable</span> and dedicated to structural advancement.
            </p>
            <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light">
              His background spans corporate and private construction, with a track record of steering major projects to acclaim. His greatest strength is the ability to <span className="text-accent-gold font-medium">synthesize complex client concepts</span> into safe, sustainable landmarks. Under his leadership, Beyond Bricks overcomes any design challenge with precision.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              {[
                { label: "Years Experience", value: "10+" },
                { label: "Projects Completed", value: "50+" },
                { label: "Safety Rating", value: "100%" },
                { label: "City Impact", value: "Nigeria" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-white/5 p-4 rounded-xl border border-white/5 group hover:border-accent-gold/30 transition-colors"
                >
                  <div className="text-2xl font-bold text-accent-gold mb-1">{stat.value}</div>
                  <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trusted By Companies (Infinite Marquee) */}
      <section className="bg-accent-gold text-primary-dark py-12 relative z-10 overflow-hidden shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 text-center">
          <h3 className="text-sm md:text-base uppercase font-bold tracking-widest opacity-80">Trusted By Industry Leaders</h3>
        </div>
        <div className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <motion.ul 
            className="flex items-center justify-center md:justify-start [&_li]:mx-10 [&_img]:max-w-none whitespace-nowrap"
            animate={{ x: [0, -1500] }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
          >
            {["IX DESIGN ABUJA", "BRATATEK HOMES", "PRIVERIA SUPPORT SERVICES LTD", "SMALL IDEAS BIG TECH LTD", "MALOK NIGERIA LTD", "LAKE SIDE ESTATE", "PROPERTY GATE", "CRESCO HOMES & PROPERTY"].map((company, idx) => (
              <li key={idx} className="text-2xl md:text-5xl font-extrabold uppercase tracking-tighter opacity-70 hover:opacity-100 transition-opacity cursor-default flex items-center gap-6">
                <div className="w-4 h-4 bg-primary-dark rotate-45" />
                {company}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-[#111] py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SplitTextReveal text="OUR SPECIALIZATIONS" className="text-3xl md:text-5xl font-bold uppercase mb-20 text-accent-gold tracking-tight" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Construction Design", desc: "Our firm’s background spans residential, commercial, and industrial construction, with a track record of leading complex developments to acclaimed completion." },
              { title: "Project Management", desc: "Our passion lies in bringing vision to life from the ground up, combining deep technical knowledge with elite leadership to ensure absolute quality in execution." },
              { title: "Site Supervision", desc: "We are prolific supervisors. Beyond Bricks coordinates between contractors and stakeholders to ensure every timeline is met with safety and integrity as top priorities." }
            ].map((spec, i) => (
              <motion.div 
                key={i}
                className="space-y-6 relative group bg-secondary-dark/20 p-8 rounded-2xl border border-gray-800/30 hover:border-accent-gold/50 transition-colors duration-500 overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -10 }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15, ease: "easeOut" } }
                }}
              >
                <div className="text-8xl font-black text-gray-800 absolute -top-4 -right-2 z-0 opacity-10 group-hover:opacity-30 group-hover:text-accent-gold transition-colors duration-500">
                  0{i + 1}
                </div>
                <h4 className="text-xl md:text-2xl font-semibold uppercase pb-3 relative z-10">
                  {spec.title}
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-accent-gold origin-left"
                    variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.7, delay: 0.3 + (i * 0.15) } } }}
                  />
                </h4>
                <p className="text-gray-400 leading-relaxed text-sm md:text-base relative z-10 font-light">
                  {spec.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Voices Section */}
      <section className="py-24 md:py-48 bg-[#111] relative z-10 overflow-hidden">
        {/* Cinematic Quote Decoration */}
        <div className="absolute top-1/2 left-10 md:left-20 -translate-y-1/2 opacity-10 flex flex-col items-center gap-4">
           <div className="text-[10rem] md:text-[20rem] font-bold text-accent-gold select-none leading-none">“</div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="mb-20"
            >
               <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-4">
                 Client <span className="text-accent-gold">Voices</span>
               </h2>
               <div className="w-24 h-1 bg-accent-gold mx-auto" />
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="space-y-12"
            >
               {/* 5 Stars */}
               <div className="flex justify-center gap-2 text-accent-gold">
                  {[...Array(5)].map((_, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, scale: 0 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       transition={{ delay: 0.3 + i * 0.1 }}
                       className="fill-current"
                    >
                       ★
                    </motion.div>
                  ))}
               </div>

               <blockquote className="text-xl md:text-2xl lg:text-3xl text-gray-200 font-light leading-relaxed italic">
                 "Beyond Bricks craftsmanship is unparalleled, and their dedication to delivering outstanding service is evident in every detail. From start to finish, Beyond Bricks exhibited professionalism and effective communication. They not only met my expectations but also provided innovative solutions."
               </blockquote>

               <div className="pt-12">
                  <div className="w-16 h-16 rounded-full bg-accent-gold mx-auto flex items-center justify-center text-primary-dark font-black text-2xl mb-6 shadow-[0_10px_30px_rgba(244,185,66,0.3)]">
                    O
                  </div>
                  <h4 className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">Olusegun Yemisi</h4>
                  <p className="text-accent-gold text-xs font-bold uppercase tracking-[0.3em] mt-2">Real Estate Investor</p>
               </div>
            </motion.div>
        </div>
      </section>

      {/* Selected Works */}
      <section className="py-32 bg-secondary-dark/30 relative z-10 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/40">
        <SplitTextReveal text="SELECTED WORKS" className="text-4xl md:text-5xl font-bold uppercase mb-24 flex justify-center text-center text-accent-gold tracking-tight" />
        
        <div className="space-y-32">
          {projects.slice(0, 4).map((work, i) => (
            <WorkParallaxItem key={work.id} work={work} index={i} />
          ))}
        </div>
      </section>



      {/* Contact Section */}
      <CTA />

      {/* Showreel Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 pointer-events-auto"
          >
            <motion.div 
               className="absolute inset-0 bg-primary-dark/95 backdrop-blur-2xl"
               onClick={() => setShowreelOpen(false)}
            />
            
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(244,185,66,0.3)] border border-white/10"
            >
              <button 
                onClick={() => setShowreelOpen(false)}
                className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-accent-gold hover:text-primary-dark transition-all duration-300"
              >
                <X size={24} />
              </button>
              
              <video 
                src={showreelVideo} 
                className="w-full h-full object-contain" 
                controls 
                autoPlay 
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PortfolioPage;
