import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
            className="bg-accent-gold text-primary-dark px-6 py-3 font-medium hover:bg-yellow-500 transition-colors uppercase tracking-wider rounded-full">
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleNextImage = () => setSelectedImageIndex((prev) => (prev + 1) % project.images.length);
  const handlePreviousImage = () => setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
  const openLightbox = (index) => { setSelectedImageIndex(index); setIsLightboxOpen(true); };
  const closeLightbox = () => setIsLightboxOpen(false);

  // Keyboard navigation for lightbox
  React.useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      else if (e.key === "ArrowLeft") handlePreviousImage();
      else if (e.key === "ArrowRight") handleNextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", handleKeyDown); document.body.style.overflow = "unset"; };
  }, [isLightboxOpen, project.images.length]);

  return (
    <div className="pt-20 min-h-screen bg-primary-dark relative">
      {/* Header */}
      <div className="bg-secondary-dark border-b border-gray-800/60 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent-gold/5 blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 hover:text-accent-gold transition-colors mb-8 uppercase tracking-widest text-sm font-medium">
            <ArrowLeft size={18} />
            <span>Back to Projects</span>
          </motion.button>
          
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="inline-block bg-accent-gold text-primary-dark px-4 py-1.5 text-xs font-bold uppercase tracking-widest mb-4 rounded-sm">
              {project.category}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight">
              {project.title}
            </h1>
            {project.description && (
              <p className="text-gray-400 text-lg md:text-xl font-light max-w-3xl leading-relaxed">
                {project.description}
              </p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Main Image Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-40">
        {/* Featured Image */}
        <motion.div 
          className="mb-12 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div
            className="relative w-full aspect-[16/9] lg:aspect-[21/9] overflow-hidden rounded-2xl cursor-pointer shadow-2xl group"
            onClick={() => openLightbox(selectedImageIndex)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImageIndex}
                initial={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
                animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                exit={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
                transition={{ duration: 0.5 }}
                src={project.images[selectedImageIndex]}
                alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0 text-white text-lg font-bold uppercase tracking-widest border border-white/50 px-8 py-3 rounded-full backdrop-blur-md">
                Click to expand
              </div>
            </div>
          </div>

          {/* Image Navigation */}
          {project.images.length > 1 && (
            <div className="flex items-center justify-between mt-8 text-gray-400 font-medium uppercase tracking-widest text-sm">
              <button onClick={handlePreviousImage} className="flex items-center gap-3 hover:text-accent-gold transition-colors">
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-accent-gold hover:text-black transition-colors"><ChevronLeft size={18} /></div>
                <span>Previous</span>
              </button>
              <span className="text-gray-500">
                0{selectedImageIndex + 1} <span className="mx-2">/</span> 0{project.images.length}
              </span>
              <button onClick={handleNextImage} className="flex items-center gap-3 hover:text-accent-gold transition-colors">
                <span>Next</span>
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-accent-gold hover:text-black transition-colors"><ChevronRight size={18} /></div>
              </button>
            </div>
          )}
        </motion.div>

        {/* Thumbnail Grid */}
        {project.images.length > 1 && (
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial="hidden" animate="visible"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.4 } } }}
          >
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                onClick={() => setSelectedImageIndex(index)}
                className={`relative aspect-square overflow-hidden rounded-xl cursor-pointer transition-all duration-300 ${
                  selectedImageIndex === index ? "ring-2 ring-accent-gold scale-100 opacity-100" : "opacity-50 hover:opacity-100 hover:scale-[1.03]"
                }`}
              >
                <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}>
            <button onClick={closeLightbox} className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-accent-gold transition-colors z-10 bg-white/5 rounded-full p-3 hover:bg-white/10">
              <X size={24} />
            </button>

            {project.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePreviousImage(); }}
                  className="absolute left-4 md:left-10 text-white hover:text-accent-gold transition-colors z-10 bg-white/5 rounded-full p-4 hover:bg-white/10"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="absolute right-4 md:right-10 text-white hover:text-accent-gold transition-colors z-10 bg-white/5 rounded-full p-4 hover:bg-white/10"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}

            <div className="max-w-[90vw] w-full max-h-[85vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                 <motion.img
                  key={selectedImageIndex}
                  initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.3 }}
                  src={project.images[selectedImageIndex]}
                  alt={`${project.title} - Fullscreen Image ${selectedImageIndex + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                />
              </AnimatePresence>
            </div>
            
            {project.images.length > 1 && (
              <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white font-medium tracking-widest uppercase text-sm bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">
                0{selectedImageIndex + 1} / 0{project.images.length}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailPage;
