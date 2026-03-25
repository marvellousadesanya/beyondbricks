import React, { useRef, useState, useEffect } from "react";
import { Play, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import bamiHero from "../assets/bami-hero.jpg";
import teamHero from "../assets/team-portfolio.png";
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
      className={`group relative flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 lg:gap-20 items-center cursor-pointer`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="w-full lg:w-3/5">
        <div className="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl relative block">
           <CoverImageReveal src={work.thumbnail || work.images[0]} alt={work.title} style={{ y: imgY }} />
        </div>
      </div>

      <motion.div 
        className="w-full lg:w-2/5 space-y-4"
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
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase flex flex-col gap-4 group-hover:text-accent-gold transition-colors duration-400">
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
  const bgTextX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const bgTextX2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  // About Parallax
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // Showreel Modal State
  const [showreelOpen, setShowreelOpen] = useState(false);

  // Testimonial State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="bg-[#111] text-white min-h-screen pt-20 overflow-hidden relative font-['Outfit',sans-serif]">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-gold z-50 origin-left" style={{ scaleX }} />

      {/* Background Text Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 flex flex-col justify-between py-24 md:py-40">
        <motion.h1 style={{ x: bgTextX1 }} className="text-[3.5rem] md:text-[6rem] lg:text-[10rem] font-bold whitespace-nowrap uppercase tracking-tight text-white/5">
          ENGINEERING EXCELLENCE ENGINEERING EXCELLENCE
        </motion.h1>
        <motion.h1 style={{ WebkitTextStroke: '1px white', x: bgTextX2 }} className="text-[3.5rem] md:text-[6rem] lg:text-[10rem] font-bold whitespace-nowrap uppercase text-transparent tracking-tight opacity-5">
           TRANSFORMING LANDSCAPES TRANSFORMING LANDSCAPES
        </motion.h1>
      </div>
      
      {/* Portfolio Specific Hero Background Animation */}
      <div className="absolute top-0 left-0 right-0 h-screen overflow-hidden pointer-events-none z-0">
          <motion.div style={{ x: bgHeroX1 }} className="absolute top-[15%] -left-[5%] opacity-10 md:opacity-20">
             <h1 className="text-[8rem] md:text-[15rem] lg:text-[20rem] font-bold text-white/5 uppercase tracking-tighter select-none">BEYOND</h1>
          </motion.div>
          <motion.div style={{ x: bgHeroX2 }} className="absolute bottom-[15%] -right-[5%] opacity-10 md:opacity-20">
             <h1 className="text-[8rem] md:text-[15rem] lg:text-[20rem] font-bold text-white/5 uppercase tracking-tighter select-none">BRICKS</h1>
          </motion.div>
      </div>
      
      {/* Floating Rotating Accent Element */}
      <motion.div 
        style={{ rotate: rotateConst }}
        className="fixed top-1/2 right-10 md:right-32 w-24 h-24 border border-accent-gold/20 pointer-events-none z-0 hidden lg:block"
      />

      {/* Hero Section - Cinematic Wide */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center py-20 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={teamHero} 
            alt="Beyond Bricks Team" 
            className="w-full h-full object-cover brightness-[0.55] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/65 via-transparent to-primary-dark" />
        </div>
    
        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } } }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tighter leading-none text-white select-none">
              Beyond  
              <span className="text-accent-gold"> Bricks</span>
            </h1>
          </motion.div>     

          <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-4 text-accent-gold/60 uppercase tracking-[0.5em] text-xs font-bold">
              <span className="w-12 h-px bg-accent-gold/30" />
              Company Portfolio
              <span className="w-12 h-px bg-accent-gold/30" />
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => setShowreelOpen(true)}
              className="flex items-center gap-5 group cursor-pointer"
            >
              <span className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-gold group-hover:border-accent-gold transition-all duration-500 overflow-hidden relative">
                <Play className="relative z-10 ml-1 text-white group-hover:text-primary-dark transition-colors" fill="currentColor" size={24} />
              </span>
              <span className="text-white text-sm uppercase font-black tracking-widest group-hover:text-accent-gold transition-colors">Watch Showreel</span>
            </motion.button>
          </motion.div>
        </motion.div>
      </section>


      {/* CEO Section - Optimized Spacing */}
      <section ref={aboutRef} className="py-24 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 md:space-y-10"
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight">
              Meet our <br className="hidden md:block" />
              <span className="text-accent-gold">CEO & Founder</span>
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years Experience", value: "10+" },
                { label: "Projects Completed", value: "200+" },
                { label: "Safety Rating", value: "100%" },
                { label: "Country Scale", value: "Nationwide" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + (i * 0.1) }}
                  className="bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-accent-gold/20 transition-all group"
                >
                  <div className="text-xl md:text-2xl font-bold text-accent-gold mb-1 group-hover:scale-105 transition-transform">{stat.value}</div>
                  <div className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400 font-bold">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
             <CoverImageReveal src={bamiHero} alt="CEO & Founder" />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-24 bg-primary-dark relative z-10 overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            {/* Mission/Vision Text */}
            <div className="space-y-16">
              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent-gold flex items-center justify-center text-accent-gold text-lg font-bold shrink-0">01</div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Our Mission
                  </h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  Our mission is to solve unique project needs, by delivering precise & efficient results, thereby guaranteeing client satisfaction through a comprehensive approach.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: -30 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-accent-gold flex items-center justify-center text-accent-gold font-bold text-lg shrink-0">02</div>
                  <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight">
                    Our Vision
                  </h3>
                </div>
                <p className="text-gray-400 text-lg leading-relaxed font-light">
                  Our vision is to set the standard for construction excellence in Lagos and beyond. We aim to consistently exceed client expectations & innovate, as we build a better tomorrow, one project at a time.
                </p>
              </motion.div>
            </div>

            {/* Visual Block (Action Shot) - Fitted Image */}
            <motion.div 
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
            >
               <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                  <img src={projects[1]?.thumbnail || projects[0].thumbnail} alt="Mission in action" className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
               </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* History & Values Section */}
      <section className="py-24 bg-[#111] relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Values (Left) */}
            <div className="space-y-12">
               <motion.h2 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-4xl font-bold uppercase tracking-tighter"
               >
                 Our <span className="text-accent-gold">Values</span>
               </motion.h2>
               <div className="grid grid-cols-1 gap-4">
                 {["Excellence", "Client First", "Reliable", "Continuous Innovation", "Trust", "Exceptional Results"].map((value, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: -20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="flex items-center gap-6 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-accent-gold/30 transition-all hover:translate-x-4 group"
                   >
                     <div className="w-8 h-8 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all">
                        <ArrowUpRight size={16} />
                     </div>
                     <span className="text-xl font-medium tracking-tight text-gray-300">{value}</span>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* History (Right) */}
            <div className="space-y-12 lg:pt-24">
                <motion.div 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="bg-accent-gold p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group"
                >
                  <div className="absolute -top-5 md:-top-10 -right-5 md:-right-10 text-[4rem] md:text-[7rem] font-black text-black/5 select-none transition-transform group-hover:scale-110 duration-700">24</div>
                  <h3 className="text-primary-dark text-2xl md:text-4xl font-black uppercase mb-8 relative z-10">Company History</h3>
                  <p className="text-primary-dark/80 text-lg md:text-xl font-medium leading-relaxed relative z-10">
                    Established in 2000, we have worked on numerous projects from residential homes to commercial buildings across Nigeria and beyond. We also have a lot of major ongoing projects like the Contessina, Project F01, and The Malok Hotel.
                  </p>
                  <div className="w-24 h-2 bg-primary-dark mt-10 rounded-full" />
               </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section (Grid Layout) */}
      <section id="services" className="py-24 md:py-40 bg-primary-dark relative z-10 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             className="text-center mb-24"
          >
             <p className="text-accent-gold font-bold tracking-[0.4em] uppercase text-[10px] md:text-xs mb-4">Core Competencies</p>
             <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tight">Our <span className="text-accent-gold">Services</span></h2>
             <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light">At Beyond Bricks Integrated Solutions we provide a wide range of services including:</p>
          </motion.div>

          {/* Services Grid - Responsive Stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[
              { 
                title: "Civil Engineering Works", 
                items: ["Building constructions", "Structural designs", "Steel fabrications", "Swimming pools and retaining walls", "Foundation engineering"]
              },
              { 
                title: "Architectural Works", 
                items: ["Building designs", "Kitchen cabinets and wardrobes", "Solid core Flushdoors", "Interior decorations"]
              },
              { 
                title: "Mechanical / Electrical Works", 
                items: ["Plumbing services provision", "Electrical services provision"]
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-3xl border border-white/10 bg-secondary-dark/30 hover:bg-accent-gold hover:border-accent-gold transition-all duration-500 overflow-hidden relative group"
              >
                <div className="absolute -top-10 -right-10 text-8xl font-black italic select-none opacity-10 transition-transform group-hover:scale-110 text-accent-gold group-hover:text-primary-dark">0{i+1}</div>
                <h3 className="text-lg md:text-xl font-bold uppercase mb-10 pb-6 border-b border-white/5 group-hover:border-primary-dark/20 leading-tight min-h-[4rem] text-white group-hover:text-primary-dark leading-tight">{service.title}</h3>
                <ul className="space-y-4">
                  {service.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-4 text-sm md:text-base text-gray-400 group-hover:text-primary-dark/80 font-light group-hover:font-medium">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent-gold group-hover:bg-primary-dark text-accent-gold" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section (Polaroid Layout) */}
      <section className="py-24 bg-[#111] relative z-10 overflow-hidden border-t border-white/5">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-20 items-center">
               <div className="w-full lg:w-1/3 space-y-8">
                  <motion.div 
                     initial={{ opacity: 0, x: -30 }} 
                     whileInView={{ opacity: 1, x: 0 }} 
                     viewport={{ once: true }}
                     className="relative"
                  >
                     <span className="text-7xl font-black text-accent-gold/10 absolute -top-12 -left-4 select-none uppercase tracking-tighter">04</span>
                     <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tight relative z-10">Our <span className="text-accent-gold">Team</span></h2>
                  </motion.div>
                  <p className="text-gray-400 font-light leading-relaxed text-lg italic">
                    Meet the collective excellence behind every structural landmark. Our team combines decades of on-field precision with cutting-edge engineering strategy.
                  </p>
               </div>

               <div className="w-full lg:w-2/3 grid grid-cols-2 md:grid-cols-3 gap-6 relative">
                  {[1, 2, 3, 4, 11, 15].map((idx, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, rotate: i % 2 === 0 ? -10 : 10, y: 40 }}
                       whileInView={{ opacity: 1, rotate: i % 2 === 0 ? -3 : 3, y: 0 }}
                       viewport={{ once: true }}
                       transition={{ duration: 0.8, delay: i * 0.1 }}
                       whileHover={{ rotate: 0, scale: 1.05, zIndex: 30, transition: { duration: 0.3 } }}
                       className="bg-white p-3 pb-12 shadow-2xl relative transition-all"
                    >
                       <div className="aspect-square bg-gray-200 overflow-hidden">
                          <img src={projects[idx]?.thumbnail || projects[2].thumbnail} alt="Team member" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                       </div>
                       <div className="mt-4 flex flex-col items-center">
                          <span className="text-[10px] uppercase font-black text-primary-dark/30 tracking-[0.4em]">Beyond Bricks</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>
         </div>
         {/* Background Visual Ornament */}
         <div className="absolute top-[20%] right-[-5%] w-[40rem] h-[40rem] bg-accent-gold/5 rounded-full blur-[100px] pointer-events-none select-none" />
      </section>

      {/* Client Voices Section */}
      <section className="py-12 md:py-24 bg-[#111] relative z-10 overflow-hidden">
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
                <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tighter mb-4">
                  Client <span className="text-accent-gold">Voices</span>
                </h2>
               <div className="w-24 h-1 bg-accent-gold mx-auto" />
            </motion.div>

               {/* Testimonials - Animated Cinematic Sequence */}
               <div className="mt-20 min-h-[400px] flex items-center justify-center relative">
                  <AnimatePresence mode="wait">
                    {[
                      {
                        name: "Olusegun Yemisi",
                        role: "Real Estate Investor",
                        quote: "Beyond Bricks craftsmanship is unparalleled, and their dedication to delivering outstanding service is evident in every detail. From start to finish, Beyond Bricks exhibited professionalism and effective communication. They not only met my expectations but also provided innovative solutions."
                      },
                      {
                        name: "Sulaiman Adeyemo",
                        role: "Developer",
                        quote: "I recently had the pleasure of working with [Beyond Bricks], and I couldn't be happier with the results. Their attention to detail, dedication to quality, and commitment to meeting deadlines exceeded my expectations. They transformed my vision into a stunning reality."
                      },
                      {
                        name: "Job Emeka",
                        role: "Homeowner",
                        quote: "I recently collaborated with [Beyond Bricks]. What truly sets them apart is their innovative approach to cost-effectiveness, helping me achieve my dream project within budget. I wholeheartedly recommend [Beyond Bricks] for their expertise and dedication to sustainability."
                      }
                    ].map((voice, i) => i === activeTestimonial && (
                      <motion.div 
                         key={i}
                         className="absolute inset-0 flex flex-col items-center group"
                         initial={{ opacity: 0, scale: 0.95, y: 30 }}
                         animate={{ opacity: 1, scale: 1, y: 0 }}
                         exit={{ opacity: 0, scale: 1.05, y: -30 }}
                         transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      >
                         <div className="flex gap-1 text-accent-gold mb-10">
                            {[...Array(5)].map((_, idx) => <span key={idx} className="text-sm">★</span>)}
                         </div>
                         
                         <p className="text-base md:text-2xl text-white font-light text-center leading-tight tracking-tight mb-8 md:mb-12 relative max-w-4xl px-4 md:px-0">
                           <span className="absolute -top-6 md:-top-12 -left-2 md:-left-12 text-[4rem] md:text-[10rem] text-accent-gold/10 font-black italic select-none">"</span>
                           {voice.quote}
                         </p>
                         
                         <div className="flex flex-col items-center border-t border-accent-gold/20 pt-8 mt-4">
                            <h4 className="text-white font-black text-2xl uppercase tracking-tighter">{voice.name}</h4>
                            <p className="text-accent-gold/60 text-xs font-bold uppercase tracking-[0.5em] mt-2">{voice.role}</p>
                         </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* Progress Indicators */}
                  <div className="absolute -bottom-12 flex gap-3">
                    {[0, 1, 2].map((i) => (
                      <button 
                        key={i} 
                        onClick={() => setActiveTestimonial(i)}
                        className={`w-12 h-1 rounded-full transition-all duration-500 ${activeTestimonial === i ? 'bg-accent-gold w-20' : 'bg-white/10 hover:bg-white/20'}`} 
                      />
                    ))}
                  </div>
               </div>
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
    