import React from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { projects } from "../data/projects";

// Split Text Component
const SplitTextReveal = ({ text, className }) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={`flex flex-wrap gap-x-2 justify-center ${className}`}
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

const ProjectsPage = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const bgTextX = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="pt-20 min-h-screen bg-primary-dark overflow-hidden relative">
      {/* Background Text Parallax */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-5 flex flex-col justify-center">
        <motion.h1 style={{ x: bgTextX }} className="text-[10rem] md:text-[15rem] font-bold whitespace-nowrap uppercase tracking-tight">
          OUR PROJECTS OUR PROJECTS
        </motion.h1>
      </div>

      <section className="py-20 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-24">
            <SplitTextReveal text="OUR PROJECTS" className="text-5xl md:text-7xl font-bold mb-6 text-white uppercase tracking-wide" />
            <motion.div 
              className="w-24 h-1 bg-accent-gold mx-auto mb-8 origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Explore our complete portfolio of successfully completed projects
              across Lagos. Each structure represents our commitment to quality,
              precision, and excellence.
            </motion.p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="group relative overflow-hidden rounded-2xl shadow-2xl cursor-pointer bg-secondary-dark"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 40 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: (index % 3) * 0.15 } }
                }}
                whileHover={{ y: -10, transition: { duration: 0.4 } }}
              >
                {/* Project Image */}
                <div className="aspect-[4/3] w-full overflow-hidden relative">
                  <motion.div className="absolute inset-0 bg-accent-gold z-10 origin-left"
                    variants={{ hidden: { scaleX: 1 }, visible: { scaleX: 0, transition: { duration: 0.8, delay: (index % 3) * 0.15 + 0.2, ease: "easeInOut" } } }}
                  />
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Overlay with project info */}
                <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end">
                  <p className="text-accent-gold font-medium tracking-widest text-sm uppercase mb-2">
                    0{index + 1} / {project.category}
                  </p>
                  <h3 className="text-white text-3xl font-bold uppercase tracking-wide">
                    {project.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
