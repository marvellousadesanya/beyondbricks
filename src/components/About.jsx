import React from "react";
import { ArrowRight, Award, Users, Wrench } from "lucide-react";
import { useNavigate } from "react-router-dom";
import aboutImage from "../assets/who-we-are.webp";
import useInView from "../hooks/useInView";

const About = () => {
  const navigate = useNavigate();
  const [sectionRef, inView] = useInView(0.1);

  const stats = [
    { icon: <Award size={28} />, value: "10+", label: "Years Experience" },
    { icon: <Users size={28} />, value: "200+", label: "Projects Completed" },
    { icon: <Wrench size={28} />, value: "100%", label: "Client Satisfaction" },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left side – Image */}
          <div className="relative">
            <div className={`aspect-[4/3] overflow-hidden reveal-left ${inView ? "in-view" : ""}`}>
              <img
                src={aboutImage}
                alt="BeyondBricks construction site"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Gold badge */}
            <div
              className={`absolute -bottom-6 -right-6 bg-accent-gold text-primary-dark p-8 shadow-2xl hidden md:block reveal-scale delay-300 ${inView ? "in-view" : ""}`}>
              <p className="text-4xl font-bold">10+</p>
              <p className="text-sm font-semibold">Years Building Lagos</p>
              {/* Shine sweep */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 3s linear infinite",
                }}
              />
            </div>
          </div>

          {/* Right side – Content */}
          <div>
            <div className={`reveal-up ${inView ? "in-view" : ""}`}>
              <h2 className="text-4xl md:text-5xl font-medium mb-4 text-primary-dark">
                Who <span className="text-accent-gold">We Are</span>
              </h2>
              {/* Animated divider */}
              <div className={`divider-expand mb-6 ${inView ? "in-view" : ""}`} />
            </div>

            <p className={`text-lg text-gray-700 mb-6 leading-relaxed font-light reveal-up delay-100 ${inView ? "in-view" : ""}`}>
              BeyondBricks serves as a leading Construction Company in Lagos
              Nigeria. We&apos;re a team of fully-certified professionals who tackle
              everything from complex large projects to smaller scale jobs.
            </p>
            <p className={`text-lg text-gray-700 mb-8 leading-relaxed font-light reveal-up delay-200 ${inView ? "in-view" : ""}`}>
              Fueled by our commitment to excellence, we go the extra mile to
              make sure clients are completely satisfied with our work.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`text-center p-4 border border-gray-100 hover:border-accent-gold/50 transition-colors duration-300 reveal-scale ${
                    index === 0 ? "delay-200" : index === 1 ? "delay-300" : "delay-400"
                  } ${inView ? "in-view" : ""}`}>
                  <div className="text-accent-gold mb-2 flex justify-center icon-float">
                    {stat.icon}
                  </div>
                  <p className="text-2xl md:text-3xl font-semibold text-primary-dark mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 font-light">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA button with glow */}
            <div className={`reveal-up delay-500 ${inView ? "in-view" : ""}`}>
              <div className="relative inline-block group">
                <span
                  className="absolute inset-0 bg-primary-dark/20 pointer-events-none"
                  style={{ animation: "pulseRing 2.5s ease-out infinite" }}
                />
                <a
                  href="/contact"
                  onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
                  className="relative z-10 inline-flex items-center gap-2 bg-primary-dark text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] group">
                  Schedule a Consultation
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
