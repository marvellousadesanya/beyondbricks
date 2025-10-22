import React from "react";
import {
  Award,
  Users,
  CheckCircle,
  Shield,
  Clock,
  TrendingUp,
} from "lucide-react";

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <Award size={40} />,
      title: "Certified Professionals",
      description:
        "Our team consists of fully-certified construction experts with proven track records.",
    },
    {
      icon: <Users size={40} />,
      title: "Experienced Team",
      description:
        "Over 10 years of combined experience in delivering exceptional construction projects.",
    },
    {
      icon: <CheckCircle size={40} />,
      title: "Quality Assurance",
      description:
        "Rigorous quality control processes ensure every project meets the highest standards.",
    },
    {
      icon: <Shield size={40} />,
      title: "Safety First",
      description:
        "We prioritize safety on every site, maintaining strict compliance with industry regulations.",
    },
    {
      icon: <Clock size={40} />,
      title: "On-Time Delivery",
      description:
        "We respect your timeline and consistently deliver projects on schedule and within budget.",
    },
    {
      icon: <TrendingUp size={40} />,
      title: "Innovation",
      description:
        "We leverage cutting-edge construction technology and methodologies for optimal results.",
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-primary-dark">
            Why Choose <span className="text-accent-gold">BeyondBricks</span>
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto font-light">
            We go beyond building structures—we build lasting relationships
            through excellence, integrity, and unwavering commitment to our
            clients.
          </p>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="bg-white p-8 shadow-md hover:shadow-lg transition-all duration-300 group hover:-translate-y-1">
              {/* Icon */}
              <div className="text-accent-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-medium text-primary-dark mb-3 group-hover:text-accent-gold transition-colors duration-300">
                {reason.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed font-light">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6 font-light">
            Ready to experience the BeyondBricks difference?
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary-dark text-white px-8 py-4 font-medium hover:bg-gray-800 transition-all duration-200">
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
