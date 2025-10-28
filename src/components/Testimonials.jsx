import React from "react";
import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sulaiman Adeyemo",
      text: "I recently had the pleasure of working with Beyond Bricks, and I couldn't be happier with the results. Their attention to detail, dedication to quality, and commitment to meeting deadlines exceeded my expectations. They transformed my vision into a stunning reality, and their communication throughout the project was exceptional. Thank you for making my project a success.",
      rating: 5,
    },
    {
      id: 2,
      name: "Olusegun Yemisi",
      text: "Beyond Bricks craftsmanship is unparalleled, and their dedication to delivering outstanding service is evident in every detail. From start to finish, Beyond Bricks exhibited professionalism and effective communication. They not only met my expectations but also provided innovative solutions that enhanced the final result.",
      rating: 5,
    },
    {
      id: 3,
      name: "Job Emeka",
      text: "I recently collaborated with Beyond Bricks. What truly sets them apart is their innovative approach to cost-effectiveness, helping me achieve my dream project within budget. I wholeheartedly recommend Beyond Bricks for their expertise, and dedication to sustainability. Make your project extraordinary with them!",
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-white">
            Client <span className="text-accent-gold">Testimonials</span>
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Don't just take our word for it. Here's what our satisfied clients
            have to say about working with BeyondBricks.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-secondary-dark p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-800 hover:border-accent-gold relative animate-fade-in-scale ${
                index === 0
                  ? "animate-delay-100"
                  : index === 1
                  ? "animate-delay-200"
                  : "animate-delay-300"
              }`}>
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-accent-gold opacity-20">
                <Quote size={48} />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-accent-gold text-accent-gold"
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 leading-relaxed mb-6 relative z-10 font-light">
                "{testimonial.text}"
              </p>

              {/* Client Info */}
              <div>
                <h4 className="text-white font-medium text-lg">
                  {testimonial.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl md:text-5xl font-medium text-accent-gold mb-2">
              100+
            </p>
            <p className="text-gray-300 font-light">Projects Completed</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium text-accent-gold mb-2">
              100%
            </p>
            <p className="text-gray-300 font-light">Client Satisfaction</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium text-accent-gold mb-2">
              10+
            </p>
            <p className="text-gray-300 font-light">Years Experience</p>
          </div>
          <div>
            <p className="text-4xl md:text-5xl font-medium text-accent-gold mb-2">
              35+
            </p>
            <p className="text-gray-300 font-light">Team Members</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
