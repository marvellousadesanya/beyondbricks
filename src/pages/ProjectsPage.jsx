import React from "react";
import { useNavigate } from "react-router-dom";
import { projects } from "../data/projects";

const ProjectsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-20 min-h-screen bg-primary-dark">
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-medium mb-6 text-white">
              Our <span className="text-accent-gold">Projects</span>
            </h1>
            <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
              Explore our complete portfolio of successfully completed projects
              across Lagos. Each structure represents our commitment to quality
              and excellence.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className={`group relative overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-scale ${
                  index % 4 === 0
                    ? "animate-delay-100"
                    : index % 4 === 1
                    ? "animate-delay-200"
                    : index % 4 === 2
                    ? "animate-delay-300"
                    : "animate-delay-400"
                }`}>
                {/* Project Image */}
                <div className="aspect-square overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                </div>

                {/* Overlay with project info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  {/* <span className="text-accent-gold text-sm font-medium mb-2 uppercase tracking-wider">
                    {project.category}
                  </span> */}
                  <h3 className="text-white text-xl font-medium mb-2">
                    {project.title}
                  </h3>
                  {/* <div className="flex items-center text-accent-gold">
                    <span className="text-sm font-normal">View Project</span>
                    <ExternalLink size={16} className="ml-2" />
                  </div> */}
                </div>

                {/* Category Badge */}
                {/* <div className="absolute top-4 right-4 bg-accent-gold text-primary-dark px-3 py-1 text-xs font-medium">
                  {project.category}
                </div> */}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
