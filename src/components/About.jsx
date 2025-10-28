import React from "react";
import { ArrowRight, Award, Users, Wrench } from "lucide-react";
import aboutImage from "../assets/who-we-are.webp";

const About = () => {
  const stats = [
    { icon: <Award size={32} />, value: "10+", label: "Years Experience" },
    { icon: <Users size={32} />, value: "200+", label: "Projects Completed" },
    { icon: <Wrench size={32} />, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side - Image */}
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden animate-slide-in-left">
              {/* Placeholder image - replace with actual company image */}
              <img
                src={aboutImage}
                alt="BeyondBricks construction site"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-accent-gold text-primary-dark p-8 shadow-xl hidden md:block animate-fade-in-scale animate-delay-300">
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm font-semibold">Years Building Lagos</p>
            </div>
          </div>

          {/* Right side - Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-medium mb-6 text-primary-dark">
              Who <span className="text-accent-gold">We Are</span>
            </h2>
            <div className="w-20 h-1 bg-accent-gold mb-6"></div>
            <p className="text-lg text-gray-700 mb-6 leading-relaxed font-light">
              BeyondBricks serves as a leading Construction Company in Lagos
              Nigeria. We're a team of fully-certified professionals who tackle
              everything from complex large projects to smaller scale jobs.
            </p>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed font-light">
              Fueled by our commitment to excellence, we go the extra mile to
              make sure clients are completely satisfied with our work.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-accent-gold mb-2 flex justify-center">
                    {stat.icon}
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-primary-dark mb-1">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-600 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary-dark text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-200 group">
              Schedule a Consultation
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
