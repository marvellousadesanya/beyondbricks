import React from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Testimonials from "../components/Testimonials";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Services />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default HomePage;
