import React, { useRef, useState, useEffect } from "react";
import { Play, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import bamiHero from "../assets/bami-hero.jpg";
import bamiAbout from "../assets/bami-about.jpg";

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
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(heroScroll, [0, 1], [1, 0]);

  // Background Text Parallax
  const bgTextX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgTextX2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  // About Parallax
  const aboutRef = useRef(null);
  const { scrollYProgress: aboutScroll } = useScroll({ target: aboutRef, offset: ["start end", "end start"] });
  const aboutImgY = useTransform(aboutScroll, [0, 1], ["-15%", "15%"]);

  // Testimonials
  const testimonials = [
    { text: "It’s like he read our minds with this lovely building plan. The structural execution was flawless. I love it. Thank you!", name: "David Adeleke", title: "Real Estate Developer" },
    { text: "Bami expertly filled the lead contractor role. We hired him after seeing his past projects, and since then, he has completed numerous buildings without any flaw. Highly profound.", name: "Emeka O.", title: "CEO, Solat Tech" },
    { text: "His ability to take a client's ideas and make them come to life on the field is remarkable. He never loses sight of the task at hand.", name: "Amina C.", title: "Investor" }
  ];
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => { setActiveTestimonial((prev) => (prev + 1) % testimonials.length); }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <div className="bg-[#111] text-white min-h-screen pt-20 overflow-hidden relative font-['Outfit',sans-serif]">
      {/* Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent-gold z-50 origin-left" style={{ scaleX }} />

      {/* Background Text Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 flex flex-col justify-between py-40">
        <motion.h1 style={{ x: bgTextX1 }} className="text-[10rem] md:text-[12rem] font-bold whitespace-nowrap uppercase tracking-tight">
          BAMI THE BUILDER BAMI THE BUILDER
        </motion.h1>
        <motion.h1 style={{ WebkitTextStroke: '1px white', x: bgTextX2 }} className="text-[10rem] md:text-[12rem] font-bold whitespace-nowrap uppercase text-transparent tracking-tight">
          CONSTRUCTION MASTER CONSTRUCTION MASTER
        </motion.h1>
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
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight uppercase relative inline-block tracking-tight text-white mb-2">
              Hello, I'm <br />
              <span className="text-accent-gold relative z-10 font-bold">Bami</span>
              <motion.div 
                className="absolute bottom-2 left-0 h-4 bg-accent-gold/20 z-0 origin-left rounded-sm"
                initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
                style={{ width: "100%" }}
              />
            </h1>
          </motion.div>

          <motion.div className="space-y-2 overflow-hidden">
            <motion.h6 variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.6 } } }} className="text-lg md:text-2xl text-gray-300 font-medium uppercase tracking-wide">
              Master <span className="text-accent-gold">Builder</span>
            </motion.h6>
            <motion.h6 variants={{ hidden: { y: "100%" }, visible: { y: "0%", transition: { duration: 0.6 } } }} className="text-lg md:text-2xl text-gray-300 font-medium uppercase tracking-wide">
              Project <span className="text-accent-gold">Manager</span>
            </motion.h6>
          </motion.div>
          
          <motion.button 
            variants={{ hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
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
             <CoverImageReveal src={bamiHero} alt="Bami Hero" className="transition-all duration-700" />
          </div>
        </motion.div>
      </section>

      {/* About Me Section */}
      <section ref={aboutRef} className="py-32 relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/40">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            className="w-full md:w-5/12"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-5xl font-bold uppercase mb-8 tracking-tight">
              A bit <span className="text-accent-gold">About Me</span>
            </h2>
            <motion.div style={{ y: aboutImgY }} className="w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl relative">
               <CoverImageReveal src={bamiAbout} alt="About Bami" />
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full md:w-7/12 space-y-8"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <p className="text-xl md:text-3xl leading-relaxed text-gray-200 font-light">
              I am a proactive professional who knows his onions. Having worked on nationwide projects, I am <span className="text-accent-gold font-medium">highly reliable</span> and continuously seek to improve structural functionalities.
            </p>
            <p className="text-base md:text-xl leading-relaxed text-gray-400 font-light">
              My background includes corporate, agency, and private construction experience, with a history of leading major developments to acclaimed completion. One of my best skills is the ability to <span className="text-accent-gold font-medium">take client concepts and synthesize them</span> into a safe, sustainable finished product. I work seamlessly with a team to overcome virtually any design problem.
            </p>
            
            <motion.div className="pt-8 block">
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" alt="Signature" className="invert opacity-30 w-48 hover:opacity-100 hover:invert-0 hover:brightness-200 transition-all duration-300 block" />
            </motion.div>
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
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {["SOLAT TELECOMS", "EMRO", "RASMED PUBLICATIONS", "BUYBOOKS", "FORTEND VENTURES", "IX DESIGN", "MARBELLA REAL ESTATE", "BEN E. LTD"].map((company, idx) => (
              <li key={idx} className="text-2xl md:text-5xl font-bold uppercase tracking-wide opacity-80 hover:opacity-100 transition-opacity cursor-default">
                {company}
              </li>
            ))}
          </motion.ul>
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-[#111] py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SplitTextReveal text="MY SPECIALIZATIONS" className="text-3xl md:text-5xl font-bold uppercase mb-20 text-accent-gold tracking-tight" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { title: "Construction Design", desc: "My background includes residential, commercial, and industrial construction experience, with a history of leading building projects to acclaimed completion." },
              { title: "Project Management", desc: "While I have extensive technical knowledge, my passion lies in bringing a project to life from the ground up, managing teams to ensure quality execution." },
              { title: "Site Supervision", desc: "I am a prolific supervisor. I work with contractors to determine needs, develop timelines, and oversee creation. Safety and integrity are top priorities." }
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

      {/* Selected Works */}
      <section className="py-32 bg-secondary-dark/30 relative z-10 text-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-gray-800/40">
        <SplitTextReveal text="SELECTED WORKS" className="text-4xl md:text-5xl font-bold uppercase mb-24 flex justify-center text-center text-accent-gold tracking-tight" />
        
        <div className="space-y-32">
          {projects.slice(0, 4).map((work, i) => (
            <WorkParallaxItem key={work.id} work={work} index={i} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary-dark py-32 lg:py-48 overflow-hidden relative z-10 border-y border-gray-800/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center min-h-[350px] flex flex-col justify-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[15rem] font-serif text-accent-gold/5 leading-none z-0 pointer-events-none select-none">
            "
          </div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative z-10"
            >
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium leading-relaxed mb-12 text-white/95 px-4">
                " 
                <span className="block text-center mt-4 leading-tight">
                  {testimonials[activeTestimonial].text.includes("flawless") ? (
                    <>It’s like he read our minds with this lovely building plan. The structural execution was <span className="text-accent-gold">flawless</span>. I love it.</>
                  ) : testimonials[activeTestimonial].text.includes("profound") ? (
                    <>Bami expertly filled the lead contractor role. We hired him after seeing his past projects, and since then, he has completed numerous buildings without any flaw. <span className="text-accent-gold">Highly profound.</span></>
                  ) : (
                    <>His ability to take a client's ideas and make them come to life on the field is <span className="text-accent-gold">remarkable</span>. He never loses sight of the task at hand.</>
                  )}
                </span>
                "
              </h3>
              
              <div className="inline-flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 rounded-full border-2 border-accent-gold flex items-center justify-center font-bold text-2xl text-accent-gold bg-accent-gold/10">
                  {testimonials[activeTestimonial].name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl md:text-2xl font-bold tracking-widest uppercase">{testimonials[activeTestimonial].name}</h4>
                  <p className="text-accent-gold font-bold uppercase tracking-widest text-xs md:text-sm mt-2">{testimonials[activeTestimonial].title}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          
          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-16 relative z-10">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTestimonial(idx)}
                className={`transition-all duration-300 rounded-full h-1.5 ${
                  idx === activeTestimonial ? "w-10 bg-accent-gold" : "w-2 bg-gray-700 hover:bg-gray-500"
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 lg:py-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, scale: 0.9, y: 30 },
            visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
          }}
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase mb-12 tracking-wide">
            Let's Build <br /> 
            <motion.span 
              className="text-accent-gold inline-block"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              Together
            </motion.span>
          </h2>
        </motion.div>
        
        <motion.div 
          className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20 text-xl font-medium"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
          }}
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex items-center gap-3 hover:text-accent-gold transition-colors cursor-pointer group">
            <MapPin className="text-accent-gold group-hover:-translate-y-2 transition-transform duration-300" size={28} />
            <span className="font-light tracking-wide">Lagos, Nigeria</span>
          </motion.div>
          <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="mailto:info@beyondbricks.com" className="flex items-center gap-3 hover:text-accent-gold transition-colors group">
            <Mail className="text-accent-gold group-hover:-translate-y-2 transition-transform duration-300" size={28} />
            <span className="font-light tracking-wide">info@beyondbricks.com</span>
          </motion.a>
          <motion.a variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} href="tel:+2348122497729" className="flex items-center gap-3 hover:text-accent-gold transition-colors group">
            <Phone className="text-accent-gold group-hover:-translate-y-2 transition-transform duration-300" size={28} />
            <span className="font-light tracking-wide">+234 812 249 7729</span>
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default PortfolioPage;
