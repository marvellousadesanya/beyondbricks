import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import useInView from "../hooks/useInView";

const Projects = () => {
  const navigate = useNavigate();
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.05);
  const [btnRef, btnInView] = useInView(0.3);

  const displayedProjects = projects.slice(0, 6);
  const delayMap = ["delay-100", "delay-200", "delay-300", "delay-200", "delay-300", "delay-400"];

  return (
    <section id="projects" className="py-20 md:py-32 bg-primary-dark relative overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 10% 50%, rgba(244,185,66,0.03) 0%, transparent 40%), radial-gradient(circle at 90% 50%, rgba(244,185,66,0.03) 0%, transparent 40%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className={`text-4xl md:text-5xl font-medium mb-4 text-white reveal-up ${headerInView ? "in-view" : ""}`}>
            Our <span className="text-accent-gold">Projects</span>
          </h2>
          <div className={`divider-expand mx-auto mb-6 ${headerInView ? "in-view" : ""}`} />
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto font-light reveal-up delay-200 ${headerInView ? "in-view" : ""}`}>
            Explore our portfolio of successfully completed projects across
            Lagos. Each structure represents our commitment to quality and
            excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              onClick={() => navigate(`/project/${project.id}`)}
              className={`group relative overflow-hidden shadow-md cursor-pointer reveal-scale ${delayMap[index]} ${gridInView ? "in-view" : ""}`}>

              {/* Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-6">
                <h3 className="text-white text-xl font-medium mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {project.title}
                </h3>
                <div className="flex items-center gap-2 text-accent-gold translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                  <span className="text-sm font-medium">View Project</span>
                  <ArrowRight size={14} />
                </div>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent-gold/50 transition-all duration-400 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-14" ref={btnRef}>
          <div className={`relative inline-block group reveal-scale ${btnInView ? "in-view" : ""}`}>
            {/* Pulse rings */}
            <span
              className="absolute inset-0 border border-accent-gold/40 pointer-events-none"
              style={{ animation: "pulseRing 2.4s ease-out infinite" }}
            />
            <span
              className="absolute inset-0 border border-accent-gold/20 pointer-events-none"
              style={{ animation: "pulseRing 2.4s ease-out infinite 0.8s" }}
            />
            <button
              onClick={() => navigate("/projects")}
              className="relative z-10 bg-transparent border-2 border-accent-gold text-accent-gold px-10 py-4 font-medium transition-all duration-300 hover:bg-accent-gold hover:text-primary-dark hover:shadow-[0_0_30px_rgba(244,185,66,0.3)] inline-flex items-center gap-2 group">
              View All Projects
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform duration-200"
                size={18}
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
