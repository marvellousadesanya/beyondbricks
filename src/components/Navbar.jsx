import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo-black.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/#home", isSection: true },
    { name: "About", href: "/#about", isSection: true },
    { name: "Portfolio", href: "/portfolio", isSection: false },
    { name: "Projects", href: "/projects", isSection: false },
    { name: "Contact", href: "/contact", isSection: false },
  ];

  const handleNavClick = (e, href, isSection) => {
    if (href.startsWith("http")) return;
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (!isSection) {
      if (location.pathname !== href) navigate(href);
    } else if (location.pathname === "/") {
      const sectionId = href.split("#")[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate("/");
      setTimeout(() => {
        const sectionId = href.split("#")[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-primary-dark/90 backdrop-blur-xl border-b border-white/5 py-3 h-20"
          : "bg-transparent py-5 h-24"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-shrink-0"
        >
          <a href="/" onClick={(e) => handleNavClick(e, "/#home", true)}>
            <img
              src={logo}
              alt="Beyond Bricks"
              className="w-40 md:w-48 h-auto brightness-200 transition-all duration-300 hover:scale-[1.03]"
            />
          </a>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.li 
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isSection)}
                  className="text-xs uppercase tracking-[0.2em] font-bold text-white/70 hover:text-accent-gold transition-colors duration-300 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent-gold transition-all duration-300 group-hover:w-full" />
                </a>
              </motion.li>
            ))}
          </ul>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => handleNavClick(e, "/contact", false)}
            className="bg-accent-gold text-primary-dark px-8 py-3.5 text-[0.65rem] font-black uppercase tracking-widest shadow-[0_10px_30px_rgba(244,185,66,0.2)] hover:bg-white transition-all duration-300"
          >
            Inquire Now
          </motion.button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 h-screen bg-primary-dark z-[-1] flex flex-col justify-center px-8"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href, link.isSection)}
                  className="text-4xl font-bold text-white uppercase tracking-tighter hover:text-accent-gold"
                >
                  {link.name}
                </motion.a>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={(e) => handleNavClick(e, "/contact", false)}
                className="mt-12 bg-accent-gold text-primary-dark py-6 text-sm font-black uppercase tracking-widest text-center"
              >
                Start Your Project
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
