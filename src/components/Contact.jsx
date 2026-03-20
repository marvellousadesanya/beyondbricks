import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const WEB3FORMS_ACCESS_KEY = "c29a8535-39f3-43e0-8a30-517748d498c7";

    const submissionData = {
      access_key: WEB3FORMS_ACCESS_KEY,
      ...formData,
      subject: "New Contact Form Submission - BeyondBricks",
      from_name: "BeyondBricks Website",
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setError("Failed to send message. Please try again.");
      }
    } catch (error) {
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
    <section id="contact" className="py-32 md:py-48 bg-secondary-dark relative z-10 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-accent-gold/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[30rem] h-[30rem] bg-accent-gold/5 rounded-full blur-[80px] translate-x-1/4 translate-y-1/4" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-7xl font-bold mb-6 text-white uppercase tracking-tight leading-none">
            Let's <span className="text-accent-gold">Partner</span>
          </h2>
          <div className="w-24 h-1 bg-accent-gold mx-auto mb-10 origin-left" />
          <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed">
            Ready to break ground on your next landmark? Contact us today for a consultation and let's craft something legendary.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 uppercase tracking-tight">
              Direct <span className="text-accent-gold">Access</span>
            </h3>

            {/* Contact Cards */}
            <div className="space-y-6 mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-8 bg-primary-dark/50 border border-white/5 backdrop-blur-xl group hover:border-accent-gold/40 transition-all duration-500 rounded-2xl">
                  <div className="w-14 h-14 rounded-full bg-accent-gold/10 flex items-center justify-center text-accent-gold group-hover:bg-accent-gold group-hover:text-primary-dark transition-all duration-500">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-[0.65rem] uppercase font-bold tracking-[0.4em] text-gray-500 mb-2">
                      {info.title}
                    </h4>
                    <p className="text-xl text-white font-medium group-hover:text-accent-gold transition-colors">{info.content}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Office Hours High-End Display */}
            <div className="bg-primary-dark/80 p-10 border border-white/5 rounded-2xl shadow-2xl overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent-gold/5 blur-3xl pointer-events-none" />
              <h4 className="text-white font-bold text-xl mb-8 uppercase tracking-widest flex items-center gap-4">
                 Operation <span className="text-accent-gold">Hours</span>
                 <div className="flex-grow h-[1px] bg-white/5 group-hover:bg-accent-gold/20 transition-colors" />
              </h4>
              <div className="space-y-6 text-gray-300 font-light">
                <div className="flex justify-between items-center group/line">
                  <span className="text-gray-500 uppercase tracking-widest text-[0.6rem] font-bold">Mon - Fri</span>
                  <div className="flex-grow mx-4 h-[1px] border-b border-dashed border-white/5" />
                  <span className="text-white font-medium group-hover/line:text-accent-gold transition-colors">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center group/line">
                  <span className="text-gray-500 uppercase tracking-widest text-[0.6rem] font-bold">Sat</span>
                   <div className="flex-grow mx-4 h-[1px] border-b border-dashed border-white/5" />
                  <span className="text-white font-medium group-hover/line:text-accent-gold transition-colors">9:00 AM - 3:00 PM</span>
                </div>
                <div className="flex justify-between items-center group/line">
                  <span className="text-gray-500 uppercase tracking-widest text-[0.6rem] font-bold">Sun</span>
                   <div className="flex-grow mx-4 h-[1px] border-b border-dashed border-white/5" />
                  <span className="text-red-400 font-medium">Closed for R&D</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 uppercase tracking-tight">
              Send <span className="text-accent-gold">Vision</span>
            </h3>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                  className="bg-accent-gold/10 border border-accent-gold/30 p-16 text-center rounded-3xl backdrop-blur-xl"
                >
                  <CheckCircle size={80} className="text-accent-gold mx-auto mb-8" />
                  <h4 className="text-white font-bold text-3xl mb-4 uppercase tracking-tight">Inquiry Received</h4>
                  <p className="text-gray-400 text-lg font-light leading-relaxed">
                    Thank you for your vision. Our structural experts will reach out within 24 hours to schedule your strategy session.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 p-4 text-center text-red-400 text-sm font-light rounded-xl">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-gray-500 px-4">Full Name</label>
                       <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-primary-dark/80 border border-white/5 text-white rounded-xl focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 transition-all font-light"
                        placeholder="e.g. Samuel Adetunde"
                      />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-gray-500 px-4">Email Address</label>
                       <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-6 py-4 bg-primary-dark/80 border border-white/5 text-white rounded-xl focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 transition-all font-light"
                        placeholder="samuel@firm.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-gray-500 px-4">Phone Number</label>
                     <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-6 py-4 bg-primary-dark/80 border border-white/5 text-white rounded-xl focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 transition-all font-light"
                      placeholder="+234 XXX XXX XXXX"
                    />
                  </div>

                  <div className="space-y-2">
                     <label className="text-[0.6rem] uppercase tracking-[0.4em] font-bold text-gray-500 px-4">Project Scope</label>
                     <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-6 py-4 bg-primary-dark/80 border border-white/5 text-white rounded-xl focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20 transition-all font-light resize-none"
                      placeholder="Briefly describe your vision or structural requirements..."></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-accent-gold text-primary-dark px-10 py-5 font-black uppercase tracking-widest text-sm shadow-[0_20px_50px_rgba(244,185,66,0.2)] flex items-center justify-center gap-4 group disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    <span>{isSubmitting ? "Transmitting..." : "Send Vision"}</span>
                    <Send size={18} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
                  </motion.button>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
