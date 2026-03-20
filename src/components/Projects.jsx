import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";

const Projects = () => {
  const navigate = useNavigate();
  const displayedProjects = projects.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section id="projects" className="py-32 md:py-48 bg-primary-dark relative overflow-hidden z-10">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[50rem] h-[50rem] bg-accent-gold/[0.03] rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12 text-left md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:max-w-2xl px-4 md:px-0"
          >
            <h2 className="text-3xl md:text-6xl font-bold mb-6 text-white uppercase tracking-tight leading-none">
              Selected <span className="text-accent-gold">Landmarks</span>
            </h2>
            <div className="w-16 md:w-24 h-1 bg-accent-gold mb-8 md:mb-12 origin-left" />
            <p className="text-sm md:text-lg text-gray-400 font-light leading-relaxed">
              Explore our record of high-performance buildings and iconic structural masterpieces delivered across Nigeria.
            </p>
          </motion.div>

          <motion.div
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
          >
            <button 
              onClick={() => navigate("/projects")}
              className="group flex items-center gap-6 text-white font-black uppercase tracking-widest text-xs hover:text-accent-gold transition-colors"
            >
              View Full Gallery
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-accent-gold group-hover:text-primary-dark group-hover:border-accent-gold transition-all duration-500">
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          </motion.div>
        </div>

        {/* Projects Grid - Balanced Layout */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-secondary-dark/40"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Modern Hover Reveal */}
                <div className="absolute inset-0 bg-primary-dark/60 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500 flex items-center justify-center">
                   <div className="w-24 h-24 rounded-full border border-accent-gold flex items-center justify-center text-accent-gold scale-0 group-hover:scale-100 transition-all duration-500 delay-100">
                     <Plus size={32} strokeWidth={1} />
                   </div>
                </div>

                {/* Category Badge */}
                <div className="absolute top-6 left-6 z-10">
                   <span className="bg-white/10 backdrop-blur-md text-white text-[10px] uppercase font-bold tracking-[0.3em] px-4 py-2 border border-white/10 rounded-full">
                     {project.category}
                   </span>
                </div>
              </div>

              {/* Info Overlay (Visible or Semi-Visible) */}
              <div className="p-6 md:p-10 space-y-3 md:space-y-4">
                <div className="flex justify-between items-center text-accent-gold uppercase tracking-[0.4em] text-[0.5rem] md:text-[0.6rem] font-bold">
                   <span>0{index + 1} / Project</span>
                   <span className="group-hover:translate-x-4 transition-transform duration-500">→</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-tight group-hover:text-accent-gold transition-colors duration-300">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
