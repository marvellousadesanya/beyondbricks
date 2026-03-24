import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Youtube,
  Instagram,
  Mail,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  const quickLinks = [
    { name: "Home", href: "/#home", isSection: true },
    { name: "About Us", href: "/#about", isSection: true },
    { name: "Portfolio", href: "/portfolio", isSection: false },
    { name: "Projects", href: "/projects", isSection: false },
    { name: "Contact", href: "/contact", isSection: false },
  ];

  const socialLinks = [
    { icon: <Youtube size={20} />, href: "https://www.youtube.com/@bamithebuilder", label: "YouTube" },
    { icon: <Instagram size={20} />, href: "https://www.instagram.com/bamithebuilder?igsh=eHRndXp4cHk1NTR6", label: "Instagram" },
  ];

  const handleLinkClick = (e, href, isSection) => {
    if (href.startsWith("http")) return;
    e.preventDefault();

    if (!isSection) {
      navigate(href);
    } else if (location.pathname === "/") {
      const sectionId = href.split("#")[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      const sectionId = href.split("#")[1];
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <footer className="bg-primary-dark border-t border-white/5 relative overflow-hidden z-10">
      {/* Decorative background shape */}
      <div className="absolute bottom-0 right-0 w-[40rem] h-[40rem] bg-accent-gold/[0.02] rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {/* Company Info */}
          <div className="space-y-8">
            <h3 className="text-3xl font-bold uppercase tracking-tighter">
              <span className="text-white">Beyond</span>
              <span className="text-accent-gold"> Bricks</span>
            </h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed max-w-xs">
              Lagos' elite construction firm, engineering structural landmarks through precision and unyielding integrity.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, backgroundColor: "#f4b942", color: "#111" }}
                  className="bg-secondary-dark/50 p-4 text-gray-400 border border-white/5 rounded-full transition-all duration-300">
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10">Navigation</h4>
            <ul className="space-y-4">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href, link.isSection)}
                    className="text-gray-400 hover:text-accent-gold transition-colors duration-300 font-medium flex items-center group">
                    <span className="w-0 group-hover:w-4 h-[1px] bg-accent-gold transition-all duration-300 mr-0 group-hover:mr-3" />
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support / Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-[0.3em] mb-10">Contact Portal</h4>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <MapPin size={18} className="text-accent-gold flex-shrink-0" />
                <span className="font-light">Lagos, Nigeria</span>
              </li>
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <Phone size={18} className="text-accent-gold flex-shrink-0" />
                <a href="tel:+2348122497729" className="hover:text-accent-gold transition-colors font-light italic underline decoration-accent-gold/20">
                  +234 812 249 7729
                </a>
              </li>
              <li className="flex items-start gap-4 text-gray-400 text-sm">
                <Mail size={18} className="text-accent-gold flex-shrink-0" />
                <a href="mailto:info@beyondbricks.com" className="hover:text-accent-gold transition-colors font-light italic underline decoration-accent-gold/20">
                  builder@beyondbricks.ng
                </a>
              </li>
            </ul>
          </div>

          {/* Luxury CTA */}
          <div className="bg-secondary-dark/30 p-10 rounded-2xl border border-white/5 relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-24 h-24 bg-accent-gold/5 blur-3xl pointer-events-none" />
             <h4 className="text-white font-bold text-lg mb-6 leading-tight">Ready to break ground on your vision?</h4>
             <button 
               onClick={() => navigate("/contact")}
               className="w-full bg-accent-gold text-primary-dark py-4 font-black uppercase tracking-widest text-[0.65rem] hover:bg-white transition-all duration-300 shadow-[0_10px_30px_rgba(244,185,66,0.1)] flex items-center justify-center gap-3"
             >
               Consultation <ArrowRight size={14} />
             </button>
          </div>
        </div>
      </div>

      {/* Extreme Bottom Bar */}
      <div className="border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-gray-500 text-[0.7rem] uppercase font-bold tracking-[0.2em] text-center md:text-left">
              © {currentYear} Beyond Bricks Construction. All structural rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
