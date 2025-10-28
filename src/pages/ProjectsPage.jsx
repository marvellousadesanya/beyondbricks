import React from "react";
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
import project10 from "../assets/project-10.jpeg";
import project11 from "../assets/project-11.jpeg";
import project12 from "../assets/project-12.png";
import project13 from "../assets/project-13.jpeg";
import project14 from "../assets/project-14.jpeg";
import project15 from "../assets/project-15.jpeg";
import project16 from "../assets/project-16.jpeg";

const ProjectsPage = () => {
  // All projects
  const projects = [
    {
      id: 1,
      title: "Project 1",
      category: "Residential",
      image: project1,
    },
    {
      id: 2,
      title: "Project 2",
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
      title: "Project 4",
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
    {
      id: 10,
      title: "Project 10",
      category: "Residential",
      image: project10,
    },
    {
      id: 11,
      title: "Project 11",
      category: "Commercial",
      image: project11,
    },
    {
      id: 12,
      title: "Project 12",
      category: "Residential",
      image: project12,
    },
    {
      id: 13,
      title: "Project 13",
      category: "Commercial",
      image: project13,
    },
    {
      id: 14,
      title: "Project 14",
      category: "Residential",
      image: project14,
    },
    {
      id: 15,
      title: "Project 15",
      category: "Commercial",
      image: project15,
    },
    {
      id: 16,
      title: "Project 16",
      category: "Residential",
      image: project16,
    },
  ];

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
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
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
