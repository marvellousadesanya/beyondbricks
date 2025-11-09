import React from "react";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "Construction Planning",
    "Construction Management",
    "Building Maintenance",
    "Renovation Services",
    "Project Consultation",
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={20} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={20} />, href: "#", label: "Instagram" },
    { icon: <Linkedin size={20} />, href: "#", label: "LinkedIn" },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary-dark border-t border-gray-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              <span className="text-white">Beyond</span>
              <span className="text-accent-gold"> Bricks</span>
            </h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Lagos' leading construction company, building excellence one
              project at a time. We transform visions into reality.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="bg-secondary-dark p-3 text-gray-300 hover:text-accent-gold hover:bg-accent-gold/10 transition-all duration-200">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-gray-300 hover:text-accent-gold transition-colors duration-200 flex items-center">
                    <span className="mr-2">›</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, "#services")}
                    className="text-gray-300 hover:text-accent-gold transition-colors duration-200 flex items-center">
                    <span className="mr-2">›</span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin
                  size={20}
                  className="text-accent-gold flex-shrink-0 mt-1"
                />
                <span>Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Phone
                  size={20}
                  className="text-accent-gold flex-shrink-0 mt-1"
                />
                <a
                  href="tel:+234XXXXXXXXXX"
                  className="hover:text-accent-gold transition-colors">
                  +234 907 222 2444
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300">
                <Mail
                  size={20}
                  className="text-accent-gold flex-shrink-0 mt-1"
                />
                <a
                  href="mailto:info@beyondbricks.ng"
                  className="hover:text-accent-gold transition-colors">
                  info@beyondbricks.ng
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} BeyondBricks. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-accent-gold transition-colors">
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-gold transition-colors">
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-accent-gold transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
