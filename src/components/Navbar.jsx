import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
    { name: "Projects", href: "/projects", isSection: false },
    // { name: "Services", href: "#services" },
    // { name: "Testimonials", href: "#testimonials" },
    { name: "Contact", href: "/contact", isSection: false },
  ];

  const handleNavClick = (e, href, isSection) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (!isSection) {
      // Navigate to a different page
      navigate(href);
    } else if (location.pathname === "/") {
      // On homepage, scroll to section
      const sectionId = href.split("#")[1];
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      // On other page, navigate to home then scroll
      navigate("/");
      setTimeout(() => {
        const sectionId = href.split("#")[1];
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-dark shadow-lg"
          : "bg-primary-dark/80 backdrop-blur-sm"
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" onClick={(e) => handleNavClick(e, "/home", true)}>
              <img
                src={logo}
                alt="Beyond Bricks"
                className="w-32 md:w-full  h-12"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isSection)}
                className="text-white hover:text-accent-gold transition-colors duration-200 font-medium">
                {link.name}
              </a>
            ))}
            <a
              href="/contact"
              onClick={(e) => handleNavClick(e, "/contact", false)}
              className="bg-accent-gold text-primary-dark px-6 py-2 font-medium hover:bg-yellow-500 transition-colors duration-200">
              Get Started
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:text-accent-gold transition-colors"
              aria-label="Toggle menu">
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}>
        <div className="px-4 pt-2 pb-6 space-y-3 bg-secondary-dark">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href, link.isSection)}
              className="block text-white hover:text-accent-gold transition-colors duration-200 font-medium py-2">
              {link.name}
            </a>
          ))}
          <a
            href="/contact"
            onClick={(e) => handleNavClick(e, "/contact", false)}
            className="block text-center bg-accent-gold text-primary-dark px-6 py-3 font-medium hover:bg-yellow-500 transition-colors duration-200 mt-4">
            Get Started
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
