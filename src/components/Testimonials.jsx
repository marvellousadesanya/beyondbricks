import React from "react";
import { Star, Quote } from "lucide-react";
import useInView from "../hooks/useInView";

const Testimonials = () => {
  const [headerRef, headerInView] = useInView(0.2);
  const [cardsRef, cardsInView] = useInView(0.08);
  const [statsRef, statsInView] = useInView(0.2);

  const testimonials = [
    {
      id: 1,
      name: "Sulaiman Adeyemo",
      role: "Property Developer",
      text: "I recently had the pleasure of working with Beyond Bricks, and I couldn't be happier with the results. Their attention to detail, dedication to quality, and commitment to meeting deadlines exceeded my expectations. They transformed my vision into a stunning reality.",
      rating: 5,
    },
    {
      id: 2,
      name: "Olusegun Yemisi",
      role: "Real Estate Investor",
      text: "Beyond Bricks craftsmanship is unparalleled, and their dedication to delivering outstanding service is evident in every detail. From start to finish, Beyond Bricks exhibited professionalism and effective communication. They not only met my expectations but also provided innovative solutions.",
      rating: 5,
    },
    {
      id: 3,
      name: "Job Emeka",
      role: "Homeowner",
      text: "I recently collaborated with Beyond Bricks. What truly sets them apart is their innovative approach to cost-effectiveness, helping me achieve my dream project within budget. I wholeheartedly recommend Beyond Bricks for their expertise, and dedication to sustainability.",
      rating: 5,
    },
  ];

  const stats = [
    { value: "100+", label: "Projects Completed" },
    { value: "100%", label: "Client Satisfaction" },
    { value: "10+",  label: "Years Experience" },
    { value: "35+",  label: "Team Members" },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-primary-dark relative overflow-hidden">
      {/* Background radial accents */}
      <div className="absolute inset-0 pointer-events-none"
           style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(244,185,66,0.05) 0%, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" ref={headerRef}>
          <h2 className={`text-4xl md:text-5xl font-medium mb-4 text-white reveal-up ${headerInView ? "in-view" : ""}`}>
            Client <span className="text-accent-gold">Testimonials</span>
          </h2>
          <div className={`divider-expand mx-auto mb-6 ${headerInView ? "in-view" : ""}`} />
          <p className={`text-lg text-gray-300 max-w-2xl mx-auto font-light reveal-up delay-200 ${headerInView ? "in-view" : ""}`}>
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients
            have to say about working with BeyondBricks.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" ref={cardsRef}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`card-lift bg-secondary-dark p-8 shadow-md border border-gray-800 group hover:border-accent-gold/40 relative overflow-hidden reveal-scale ${
                index === 0 ? "delay-100" : index === 1 ? "delay-300" : "delay-500"
              } ${cardsInView ? "in-view" : ""}`}>

              {/* Background quote watermark */}
              <div className="absolute top-4 right-4 text-accent-gold/8 group-hover:text-accent-gold/15 transition-all duration-500 select-none">
                <Quote size={64} />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-accent-gold text-accent-gold"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10 font-light text-sm">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Client */}
              <div className="flex items-center gap-3">
                {/* Avatar circle */}
                <div className="w-10 h-10 rounded-full bg-accent-gold/20 border border-accent-gold/30 flex items-center justify-center text-accent-gold font-bold text-sm flex-shrink-0">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white font-medium">{testimonial.name}</h4>
                  <p className="text-gray-500 text-xs">{testimonial.role}</p>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-accent-gold/0 to-transparent group-hover:via-accent-gold/50 transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center reveal-up ${
                index === 0 ? "delay-100" : index === 1 ? "delay-200" : index === 2 ? "delay-300" : "delay-400"
              } ${statsInView ? "in-view" : ""}`}>
              <p className={`text-4xl md:text-5xl font-medium text-accent-gold mb-2 stat-glow ${statsInView ? "in-view" : ""}`}>
                {stat.value}
              </p>
              <p className="text-gray-400 font-light text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
