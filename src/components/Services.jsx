import React from "react";
import { ClipboardList, Settings, Wrench, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useInView from "../hooks/useInView";

const Services = () => {
  const navigate = useNavigate();
  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.1);
  const [ctaRef, ctaInView] = useInView(0.2);

  const services = [
    {
      icon: <ClipboardList size={44} />,
      title: "Construction Planning",
      description:
        "Comprehensive planning services that lay the foundation for successful project execution. We analyze every detail, from feasibility studies to resource allocation, ensuring your project starts on solid ground.",
    },
    {
      icon: <Settings size={44} />,
      title: "Construction Management",
      description:
        "End-to-end project management that keeps your construction on schedule and within budget. Our experienced team coordinates all aspects of construction, ensuring seamless execution and quality control.",
    },
    {
      icon: <Wrench size={44} />,
      title: "Building Maintenance",
      description:
        "Professional maintenance services to preserve and enhance your property's value. From routine inspections to repairs and renovations, we ensure your building remains in optimal condition.",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary-dark relative overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(244,185,66,0.04) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(244,185,66,0.03) 0%, transparent 50%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className={`text-4xl md:text-5xl font-semibold mb-4 text-white reveal-up ${headerInView ? "in-view" : ""}`}>
            Our <span className="text-accent-gold">Services</span>
          </h2>
          <div className={`divider-expand mx-auto mb-6 ${headerInView ? "in-view" : ""}`} />
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto font-light reveal-up delay-200 ${headerInView ? "in-view" : ""}`}>
            From initial planning to ongoing maintenance, we provide
            comprehensive construction services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={cardsRef}>
          {services.map((service, index) => (
            <div
              key={index}
              className={`card-lift bg-primary-dark p-10 shadow-md group relative overflow-hidden reveal-scale ${
                index === 0 ? "delay-100" : index === 1 ? "delay-300" : "delay-500"
              } ${cardsInView ? "in-view" : ""}`}>

              {/* Gold accent corner */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-accent-gold/60 via-accent-gold/20 to-transparent transition-all duration-500 group-hover:w-1.5" />

              {/* Icon */}
              <div className="text-accent-gold mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1">
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed font-light mb-6">
                {service.description}
              </p>

              {/* Learn More */}
              <a
                href="/contact"
                onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
                className="inline-flex items-center gap-1.5 text-accent-gold text-sm font-medium transition-all duration-200 group/link hover:gap-3">
                Learn More
                <ArrowRight size={15} className="transition-transform duration-200 group-hover/link:translate-x-1" />
              </a>

              {/* Hover glow overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                   style={{ background: "radial-gradient(circle at 50% 120%, rgba(244,185,66,0.04) 0%, transparent 60%)" }} />
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className={`mt-20 text-center py-16 px-8 border border-gray-700/50 relative overflow-hidden reveal-up ${ctaInView ? "in-view" : ""}`}
          style={{ background: "rgba(244,185,66,0.03)" }}>
          {/* Decorative lines */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-b from-accent-gold/60 to-transparent" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-8 bg-gradient-to-t from-accent-gold/60 to-transparent" />

          <h3 className={`text-3xl md:text-4xl font-medium text-white mb-4 reveal-up delay-100 ${ctaInView ? "in-view" : ""}`}>
            Ready to Start Your Project?
          </h3>
          <p className={`text-gray-300 mb-8 max-w-2xl mx-auto text-lg font-light reveal-up delay-200 ${ctaInView ? "in-view" : ""}`}>
            Let&apos;s discuss how our services can bring your construction vision to
            life. Schedule a consultation with our experts today.
          </p>

          <div className={`relative inline-block group reveal-scale delay-300 ${ctaInView ? "in-view" : ""}`}>
            <span
              className="absolute inset-0 bg-accent-gold/20 pointer-events-none"
              style={{ animation: "pulseRing 2.2s ease-out infinite" }}
            />
            <span
              className="absolute inset-0 bg-accent-gold/10 pointer-events-none"
              style={{ animation: "pulseRing 2.2s ease-out infinite 0.7s" }}
            />
            <a
              href="/contact"
              onClick={(e) => { e.preventDefault(); navigate("/contact"); }}
              className="btn-shimmer relative z-10 inline-block bg-accent-gold text-primary-dark px-10 py-4 font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(244,185,66,0.4)]">
              Schedule a Consultation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
