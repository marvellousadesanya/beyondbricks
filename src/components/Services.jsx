import React from "react";
import { ClipboardList, Settings, Wrench } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <ClipboardList size={48} />,
      title: "Construction Planning",
      description:
        "Comprehensive planning services that lay the foundation for successful project execution. We analyze every detail, from feasibility studies to resource allocation, ensuring your project starts on solid ground.",
    },
    {
      icon: <Settings size={48} />,
      title: "Construction Management",
      description:
        "End-to-end project management that keeps your construction on schedule and within budget. Our experienced team coordinates all aspects of construction, ensuring seamless execution and quality control.",
    },
    {
      icon: <Wrench size={48} />,
      title: "Building Maintenance",
      description:
        "Professional maintenance services to preserve and enhance your property's value. From routine inspections to repairs and renovations, we ensure your building remains in optimal condition.",
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
            Our <span className="text-accent-gold">Services</span>
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            From initial planning to ongoing maintenance, we provide
            comprehensive construction services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`bg-primary-dark p-10 shadow-md hover:shadow-xl transition-all duration-300 group hover:-translate-y-1 animate-fade-in-scale ${
                index === 0
                  ? "animate-delay-100"
                  : index === 1
                  ? "animate-delay-200"
                  : "animate-delay-300"
              }`}>
              {/* Title */}
              <h3 className="text-2xl font-medium text-white mb-4 group-hover:text-accent-gold transition-colors duration-300">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed font-light">
                {service.description}
              </p>

              {/* Learn More Link */}
              <a
                href="#contact"
                className="inline-flex items-center text-accent-gold font-medium hover:gap-2 transition-all duration-200 mt-6">
                Learn More
                <span className="ml-1 group-hover:ml-2 transition-all duration-200">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center p-12 md:p-16">
          <h3 className="text-3xl md:text-4xl font-medium text-white mb-6">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg font-light">
            Let's discuss how our services can bring your construction vision to
            life. Schedule a consultation with our experts today.
          </p>
          <a
            href="/contact"
            className="inline-block bg-accent-gold text-primary-dark px-10 py-4 font-medium hover:bg-yellow-500 transition-all duration-200">
            Schedule a Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
