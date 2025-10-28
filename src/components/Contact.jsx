import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // TODO: Replace with your actual Web3Forms access key
    // Get it from: https://web3forms.com (enter builder@beyondbricks.ng)
    const WEB3FORMS_ACCESS_KEY = "c29a8535-39f3-43e0-8a30-517748d498c7";

    const submissionData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      message: formData.message,
      subject: "New Contact Form Submission - BeyondBricks",
      from_name: "BeyondBricks Website",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });

        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Phone",
      content: "+234 907 222 2444",
      link: "tel:+2349072222444",
    },
    {
      icon: <Mail size={24} />,
      title: "Email",
      content: "builder@beyondbricks.ng",
      link: "mailto:builder@beyondbricks.ng",
    },
    {
      icon: <MapPin size={24} />,
      title: "Location",
      content: "Lagos, Nigeria",
      link: "#",
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-secondary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium mb-6 text-white">
            Get in <span className="text-accent-gold">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-accent-gold mx-auto mb-6"></div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light">
            Ready to start your construction project? Contact us today for a
            consultation and let's build something extraordinary together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-medium text-white mb-8">
              Contact Information
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-start gap-4 p-6 bg-primary-dark border border-gray-800 hover:border-accent-gold transition-all duration-300 group">
                  <div className="text-accent-gold group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {info.title}
                    </h4>
                    <p className="text-gray-300 font-light">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Office Hours */}
            <div className="bg-primary-dark p-6 border border-gray-800">
              <h4 className="text-white font-medium text-lg mb-4">
                Office Hours
              </h4>
              <div className="space-y-2 text-gray-300 font-light">
                <p className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="text-accent-gold">8:00 AM - 6:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="text-accent-gold">9:00 AM - 2:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="text-accent-gold">Closed</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-medium text-white mb-8">
              Send us a Message
            </h3>

            {isSubmitted ? (
              <div className="bg-green-500/10 border border-green-500 p-8 text-center">
                <CheckCircle
                  size={48}
                  className="text-green-500 mx-auto mb-4"
                />
                <h4 className="text-white font-medium text-xl mb-2">
                  Message Sent!
                </h4>
                <p className="text-gray-300 font-light">
                  Thank you for contacting us. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500 p-4 text-center">
                    <p className="text-red-500 font-light">{error}</p>
                  </div>
                )}
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-white font-medium mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-800 text-white focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-white font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-800 text-white focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-white font-medium mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-800 text-white focus:outline-none focus:border-accent-gold transition-colors"
                    placeholder="+234 XXX XXX XXXX"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-white font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="5"
                    className="w-full px-4 py-3 bg-primary-dark border border-gray-800 text-white focus:outline-none focus:border-accent-gold transition-colors resize-none"
                    placeholder="Tell us about your project..."></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent-gold text-primary-dark px-8 py-4 font-medium hover:bg-yellow-500 transition-all duration-200 flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send
                    size={20}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
