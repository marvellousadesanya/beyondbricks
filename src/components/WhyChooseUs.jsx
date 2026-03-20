import React from "react";
import { Award, Users, CheckCircle, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const navigate = useNavigate();

  const reasons = [
    {
      icon: <Award size={32} />,
      title: "Certified Excellence",
      description: "Our team consists of elite, fully-certified construction masters with proven global track records.",
    },
    {
      icon: <Users size={32} />,
      title: "Veteran Leadership",
      description: "Over a decade of combined strategic experience in delivering structurally complex landmarks.",
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Unyielding Quality",
      description: "Rigorous quality control protocols ensure every structural joint meets superior standards.",
    },
    {
      icon: <Shield size={32} />,
      title: "Safety Integrity",
      description: "We prioritize life and safety on every site, maintaining zero-compromise site regulations.",
    },
    {
      icon: <Clock size={32} />,
      title: "Precision Timelines",
      description: "We respect the rhythm of business and consistently deliver landmarks on precise schedules.",
    },
    {
      icon: <TrendingUp size={32} />,
      title: "Structural Innovation",
      description: "Leveraging cutting-edge construction technologies for safe and sustainable results.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-32 md:py-48 bg-primary-dark relative overflow-hidden z-20">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80rem] h-[80rem] bg-accent-gold/[0.02] rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tight">
              The Beyond <span className="text-accent-gold">Edge</span>
            </h2>
            <div className="w-16 md:w-24 h-1 bg-accent-gold mx-auto mb-8 md:mb-10 origin-left" />
            <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed max-w-xl mx-auto">
              We go beyond building structures, we build legacies through unyielding integrity and a commitment to precision.
            </p>
          </motion.div>
        </div>

        {/* Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-secondary-dark/40 p-6 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group border border-white/5 relative overflow-hidden rounded-3xl hover:border-accent-gold/40 transition-all duration-700"
            >
              {/* Background accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-gold/0 to-transparent group-hover:via-accent-gold/30 transition-all duration-700" />

              {/* Icon */}
              <div className="text-accent-gold mb-6 group-hover:scale-110 transition-transform duration-500">
                {reason.icon}
              </div>

              {/* Number watermark */}
              <span className="absolute top-8 right-8 text-7xl font-black text-white/[0.02] group-hover:text-accent-gold/5 transition-all duration-700 select-none leading-none pointer-events-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="text-lg font-bold text-white mb-3 uppercase tracking-wide group-hover:text-accent-gold transition-colors duration-300">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed font-light text-sm">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-24 text-center"
        >
          <p className="text-2xl text-gray-300 mb-10 font-light">
            Ready to experience the <span className="text-accent-gold font-bold italic">BeyondBricks</span> difference?
          </p>
          
          <button
            onClick={() => navigate("/contact")}
            className="group relative inline-flex items-center gap-4 bg-white text-primary-dark px-12 py-5 font-black uppercase tracking-widest text-xs transition-all duration-300 hover:bg-accent-gold shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
          >
            Start Your Legacy
            <ArrowRight className="group-hover:translate-x-2 transition-transform duration-300" size={18} />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
