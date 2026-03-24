import React, { useRef } from "react";
import { ClipboardList, Settings, Wrench, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

const Services = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const bgX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const bgX2 = useTransform(scrollYProgress, [0, 1], ["-40%", "0%"]);

  const services = [
    {
      icon: <ClipboardList size={40} />,
      index: "01 /",
      title: "Construction Design",
      description:
        "We deliver end-to-end construction solutions across residential, commercial, and industrial sectors. From concept development to final execution, our designs prioritize durability, functionality, and modern aesthetics.",
    },
    {
      icon: <Settings size={40} />,
      index: "02 /",
      title: "Project Management",
      description:
        "Our project management approach ensures seamless coordination from start to finish. We oversee planning, resource allocation, and execution, ensuring projects are delivered on time, within budget, and to specification.",
    },
    {
      icon: <Wrench size={40} />,
      index: "03 /",
      title: "Site Supervision",
      description:
        "We are highly detail-oriented supervisors. We work with contractors to determine needs, develop timelines, and oversee execution. Safety and integrity remain top priorities.",
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }
    })
  };

  return (
    <section 
      id="services" 
      ref={ref}
      className="py-32 md:py-48 bg-secondary-dark relative overflow-hidden"
    >
      {/* Background Parallax Text */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03] flex flex-col justify-center space-y-10 md:space-y-20">
        <motion.h1 style={{ x: bgX1 }} className="text-[5rem] md:text-[14rem] font-bold text-white whitespace-nowrap uppercase tracking-tighter">
          EXCELLENCE INNOVATION
        </motion.h1>
        <motion.h1 style={{ x: bgX2, WebkitTextStroke: '1px white' }} className="text-[5rem] md:text-[14rem] font-black text-transparent whitespace-nowrap uppercase tracking-tighter">
          CONSTRUCTION EXPERTISE
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto">
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-4xl font-bold mb-6 text-white uppercase tracking-tight">
              Our <span className="text-accent-gold">Expertise</span>
            </h2>
            <div className="w-24 h-1 bg-accent-gold mx-auto mb-10 origin-left" />
            <p className="text-base md:text-lg text-gray-400 font-light leading-relaxed">
              From initial structural planning to ongoing white-glove maintenance, we provide elite construction solutions tailored for high-stakes projects.
            </p>
          </motion.div>
        </div>

        {/* Services Grid - Responsive Stacking */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-primary-dark p-12 shadow-2xl group border border-white/5 relative overflow-hidden rounded-2xl hover:border-accent-gold/40 transition-all duration-500"
            >
              {/* Index Number */}
              <div className="absolute top-8 right-8 text-white/5 text-8xl font-black italic tracking-tighter transition-all duration-700 group-hover:scale-125 group-hover:text-accent-gold/10 pointer-events-none select-none">
                0{index + 1}
              </div>

              {/* Icon with Gold Circle Background */}
              <div className="mb-10 relative">
                <div className="w-20 h-20 rounded-full bg-accent-gold/5 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-700">
                  {service.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-6 relative z-10">
                <p className="text-xs uppercase tracking-[0.4em] font-bold text-accent-gold">{service.index} Superior Quality</p>
                <h3 className="text-xl font-bold text-white uppercase tracking-wide group-hover:text-accent-gold transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                  {service.description}
                </p>
              </div>

              {/* Bottom Interactive Link */}
              <button 
                onClick={() => navigate("/contact")}
                className="mt-12 flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs group/btn transition-colors hover:text-accent-gold"
              >
                Inquire <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
              </button>

              {/* Animated Corner accent */}
              <motion.div 
                className="absolute top-0 left-0 w-2 h-0 bg-accent-gold transition-all duration-700 group-hover:h-full"
              />
            </motion.div>
          ))}
        </div>

        {/* High-Impact CTA Segment */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-32 p-1 relative rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-gold via-accent-gold/20 to-accent-gold opacity-10 group-hover:opacity-30 transition-opacity duration-700" />
          <div className="bg-primary-dark/80 backdrop-blur-xl p-8 md:p-24 rounded-3xl relative z-10 text-center border border-white/5 overflow-hidden">
             
             {/* Huge background "B" */}
             <div className="absolute -top-20 -right-20 text-[15rem] md:text-[30rem] font-black text-white/5 pointer-events-none select-none z-0">
               B
             </div>

             <div className="relative z-10 max-w-4xl mx-auto space-y-6 md:space-y-10">
                <h3 className="text-md font-bold text-white uppercase tracking-tight">
                  Ready to start your <span className="text-accent-gold">Legacy?</span>
                </h3>
                <p className="text-base text-sm text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
                  Let’s discuss how our services can bring your vision into reality. Schedule a consultation session today.
                </p>
                
                <motion.button
                   whileHover={{ scale: 1.05 }}
                   whileTap={{ scale: 0.95 }}
                   onClick={() => navigate("/contact")}
                   className="mt-10 bg-accent-gold text-primary-dark px-16 py-6 font-black uppercase tracking-widest text-[10px] shadow-[0_20px_50px_rgba(244,185,66,0.2)]"
                >
                  Schedule consultation
                </motion.button>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
