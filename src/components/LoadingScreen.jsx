import React from "react";
import logo from "../assets/logo-black.png";

const LoadingScreen = ({ isExiting }) => {
  return (
    <div
      className={`fixed inset-0 z-[9999] bg-primary-dark flex items-center justify-center transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}>
      <div className="text-center">
        {/* Logo Animation */}
        <div className="mb-8 animate-fade-in-scale">
          <img
            src={logo}
            alt="BeyondBricks"
            className="w-64 mx-auto animate-pulse"
          />
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center items-center space-x-2 mb-4">
          <div
            className="w-3 h-3 bg-accent-gold rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}></div>
          <div
            className="w-3 h-3 bg-accent-gold rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}></div>
          <div
            className="w-3 h-3 bg-accent-gold rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-400 text-sm font-light animate-fade-in">
          Building Excellence...
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
