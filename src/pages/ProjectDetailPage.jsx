import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { projects } from "../data/projects";

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <div className="pt-20 min-h-screen bg-primary-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate("/projects")}
            className="bg-accent-gold text-primary-dark px-6 py-3 font-medium hover:bg-yellow-500 transition-colors">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % project.images.length);
  };

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  };

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
      } else if (e.key === "ArrowLeft") {
        setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      } else if (e.key === "ArrowRight") {
        setSelectedImageIndex((prev) => (prev + 1) % project.images.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen, project.images.length]);

  return (
    <div className="pt-20 min-h-screen bg-primary-dark">
      {/* Header */}
      <div className="bg-secondary-dark border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors mb-4">
            <ArrowLeft size={20} />
            <span>Back to Projects</span>
          </button>
          <div>
            <span className="inline-block bg-accent-gold text-primary-dark px-4 py-1 text-sm font-medium uppercase tracking-wider mb-3">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-medium text-white mb-2">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-gray-300 text-lg font-light max-w-3xl">
                {project.description}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Featured Image */}
        <div className="mb-8">
          <div
            className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(selectedImageIndex)}>
            <img
              src={project.images[selectedImageIndex]}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-lg font-medium">
                Click to view fullscreen
              </div>
            </div>
          </div>

          {/* Image Navigation */}
          {project.images.length > 1 && (
            <div className="flex items-center justify-between mt-4">
              <button
                onClick={handlePreviousImage}
                className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors">
                <ChevronLeft size={24} />
                <span>Previous</span>
              </button>
              <span className="text-gray-400 text-sm">
                {selectedImageIndex + 1} / {project.images.length}
              </span>
              <button
                onClick={handleNextImage}
                className="flex items-center gap-2 text-white hover:text-accent-gold transition-colors">
                <span>Next</span>
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnail Grid */}
        {project.images.length > 1 && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {project.images.map((image, index) => (
              <div
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-lg cursor-pointer transition-all duration-300 ${
                  selectedImageIndex === index
                    ? "ring-4 ring-accent-gold scale-105"
                    : "opacity-70 hover:opacity-100 hover:scale-105"
                }`}>
                <img
                  src={image}
                  alt={`${project.title} - Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-accent-gold transition-colors z-10 bg-black/50 rounded-full p-2 hover:bg-black/70">
            <X size={28} />
          </button>

          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePreviousImage();
                }}
                className="absolute left-4 md:left-8 text-white hover:text-accent-gold transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70">
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextImage();
                }}
                className="absolute right-4 md:right-8 text-white hover:text-accent-gold transition-colors z-10 bg-black/50 rounded-full p-3 hover:bg-black/70">
                <ChevronRight size={32} />
              </button>
            </>
          )}

          <div
            className="max-w-7xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}>
            <img
              src={project.images[selectedImageIndex]}
              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-[90vh] object-contain"
            />
          </div>

          {project.images.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-sm">
              {selectedImageIndex + 1} / {project.images.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetailPage;

