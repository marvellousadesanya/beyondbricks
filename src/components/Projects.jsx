import React from "react";
import { useNavigate } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import project1 from "../assets/project-1.jpeg";
import project2 from "../assets/project-2.jpeg";
import project3 from "../assets/project-3.avif";
import project4 from "../assets/project-4.jpeg";
import project5 from "../assets/project-5.jpeg";
import project6 from "../assets/project-6.jpeg";
import project7 from "../assets/project-7.jpeg";
import project8 from "../assets/project-8.jpeg";
import project9 from "../assets/project-9.jpeg";

const Projects = () => {
  const navigate = useNavigate();

  // Placeholder project data - replace with actual project images
  const projects = [
    {
      id: 1,
      title: "Project 1",
      category: "Residential",
      image: project1,
    },
    {
      id: 2,
      title: "Contessina",
      category: "Commercial",
      image: project2,
    },
    {
      id: 3,
      title: "Project 3",
      category: "Residential",
      image: project3,
    },
    {
      id: 4,
      title: "Contessina",
      category: "Commercial",
      image: project4,
    },
    {
      id: 5,
      title: "Project 5",
      category: "Residential",
      image: project5,
    },
    {
      id: 6,
      title: "Project 6",
      category: "Industrial",
      image: project6,
    },
    {
      id: 7,
      title: "Project 7",
      category: "Hospitality",
      image: project7,
    },
    {
      id: 8,
      title: "Project 8",
      category: "Institutional",
      image: project8,
    },
    {
      id: 9,
      title: "Project 9",
      category: "Commercial",
      image: project9,
    },
  ];

  return (
    <section id="projects" className="py-20 md:py-32 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-white">
            Our <span className="text-accent-gold">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Explore our portfolio of successfully completed projects across
            Lagos. Each structure represents our commitment to quality and
            excellence.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative overflow-hidden shadow-md cursor-pointer transform transition-all duration-300 hover:scale-[1.02] animate-fade-in-scale ${
                index % 3 === 0
                  ? "animate-delay-100"
                  : index % 3 === 1
                  ? "animate-delay-200"
                  : "animate-delay-300"
              }`}>
              {/* Project Image */}
              <div className="aspect-square overflow-hidden">
                <img
                  src={project.image}
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

        {/* View All Projects Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/projects")}
            className="bg-transparent border-2 border-accent-gold text-accent-gold px-8 py-4 font-medium hover:bg-accent-gold hover:text-primary-dark transition-all duration-200">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
