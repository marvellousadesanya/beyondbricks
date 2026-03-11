import React from "react";
import { Award, Users, CheckCircle, Shield, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";

const WhyChooseUs = () => {
  const navigate = useNavigate();
  const [headerRef, headerInView] = useInView(0.2);
  const [gridRef, gridInView] = useInView(0.08);
  const [ctaRef, ctaInView] = useInView(0.3);

  const reasons = [
    {
      icon: <Award size={36} />,
      title: "Certified Professionals",
      description: "Our team consists of fully-certified construction experts with proven track records.",
    },
    {
      icon: <Users size={36} />,
      title: "Experienced Team",
      description: "Over 10 years of combined experience in delivering exceptional construction projects.",
    },
    {
      icon: <CheckCircle size={36} />,
      title: "Quality Assurance",
      description: "Rigorous quality control processes ensure every project meets the highest standards.",
    },
    {
      icon: <Shield size={36} />,
      title: "Safety First",
      description: "We prioritize safety on every site, maintaining strict compliance with industry regulations.",
    },
    {
      icon: <Clock size={36} />,
      title: "On-Time Delivery",
      description: "We respect your timeline and consistently deliver projects on schedule and within budget.",
    },
    {
      icon: <TrendingUp size={36} />,
      title: "Innovation",
      description: "We leverage cutting-edge construction technology and methodologies for optimal results.",
    },
  ];

  const delayMap = ["delay-100", "delay-200", "delay-300", "delay-200", "delay-300", "delay-400"];

  return (
    <section className="py-20 md:py-32 bg-gray-100 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(244,185,66,0.05) 0%, transparent 70%)", transform: "translate(30%, -30%)" }} />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
           style={{ background: "radial-gradient(circle, rgba(244,185,66,0.04) 0%, transparent 70%)", transform: "translate(-30%, 30%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className={`text-4xl md:text-5xl font-medium mb-4 text-primary-dark reveal-up ${headerInView ? "in-view" : ""}`}>
            Why Choose <span className="text-accent-gold">BeyondBricks</span>
          </h2>
          <div className={`divider-expand mx-auto mb-6 ${headerInView ? "in-view" : ""}`} />
          <p className={`text-lg text-gray-700 max-w-2xl mx-auto font-light reveal-up delay-200 ${headerInView ? "in-view" : ""}`}>
            We go beyond building structures—we build lasting relationships
            through excellence, integrity, and unwavering commitment to our clients.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" ref={gridRef}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              className={`card-lift bg-white p-8 shadow-sm group relative overflow-hidden reveal-scale ${delayMap[index]} ${gridInView ? "in-view" : ""}`}>

              {/* Top accent line */}
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <div className="text-accent-gold mb-4 transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                {reason.icon}
              </div>

              {/* Number badge */}
              <span className="absolute top-6 right-6 text-5xl font-bold text-gray-100 group-hover:text-accent-gold/10 transition-colors duration-500 select-none leading-none">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Title */}
              <h3 className="text-xl font-medium text-primary-dark mb-3 group-hover:text-accent-gold transition-colors duration-300 relative z-10">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-light text-sm relative z-10">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center" ref={ctaRef}>
          <p className={`text-xl text-gray-700 mb-6 font-light reveal-up ${ctaInView ? "in-view" : ""}`}>
            Ready to experience the BeyondBricks difference?
          </p>
          <div className={`relative inline-block group reveal-scale delay-200 ${ctaInView ? "in-view" : ""}`}>
            <span
              className="absolute inset-0 bg-primary-dark/15 pointer-events-none"
              style={{ animation: "pulseRing 2.5s ease-out infinite" }}
            />
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
              className="relative z-10 inline-flex items-center gap-2 bg-primary-dark text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-300 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] group">
              Get Started Today
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
