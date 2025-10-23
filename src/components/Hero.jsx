import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background - Placeholder video URL */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover">
          {/* Placeholder construction video - replace with actual video URL */}
          <source
            // src="https://assets.mixkit.co/videos/preview/mixkit-construction-workers-working-on-a-building-43-large.mp4"
            src="https://res.cloudinary.com/dggeuuu1n/video/upload/v1761005613/AdobeStock_353539039_Video_4K_Preview_y1qzt4.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium mb-6 text-white animate-fade-in-up">
          Beyond<span className="text-accent-gold"> Bricks</span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-gray-200 font-light">
          Building Excellence, One Project at a Time
        </p>
        {/* <p className="text-lg md:text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
          Lagos' premier construction company delivering exceptional results
          from complex large-scale projects to specialized smaller jobs
        </p> */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#contact"
            className="group bg-accent-gold text-primary-dark px-5 py-3 font-medium hover:bg-yellow-500 transition-all duration-200 flex items-center gap-2 text-md">
            Start Your Project
            <ArrowRight
              className="group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </a>
          {/* <a
            href="#projects"
            className="bg-transparent border-2 border-white text-white px-8 py-4 font-medium hover:bg-white hover:text-primary-dark transition-all duration-200 text-lg">
            View Our Work
          </a> */}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-accent-gold rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
