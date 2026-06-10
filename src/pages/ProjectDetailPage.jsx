import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, Maximize2, Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

const getInstagramThumbnail = (url) => {
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#&]+)/);
  return match ? `https://www.instagram.com/p/${match[1]}/media/?size=l` : null;
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoLightboxOpen, setIsVideoLightboxOpen] = useState(false);

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
  const openVideoLightbox = () => setIsVideoLightboxOpen(true);
  const closeVideoLightbox = () => setIsVideoLightboxOpen(false);

  // Keyboard navigation for lightboxes
  React.useEffect(() => {
    if (!isLightboxOpen && !isVideoLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsLightboxOpen(false);
        setIsVideoLightboxOpen(false);
      } else if (e.key === "ArrowLeft" && isLightboxOpen) {
        setSelectedImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length);
      } else if (e.key === "ArrowRight" && isLightboxOpen) {
        setSelectedImageIndex((prev) => (prev + 1) % project.images.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isLightboxOpen, isVideoLightboxOpen, project.images.length]);

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
        {/* Featured Image + Video split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div
              className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl cursor-pointer shadow-2xl group"
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
              <div className="flex items-center justify-between mt-6 text-gray-400 font-medium uppercase tracking-widest text-sm">
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

          {/* Project Video */}
          {project.videoUrl && (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="relative">
                <span className="inline-flex items-center gap-2 text-accent-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
                  <span className="w-6 h-px bg-accent-gold/60" />
                  Watch in Action
                </span>
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-accent-gold/10 border border-white/10 bg-secondary-dark group">
                  {typeof project.videoUrl === "string" && project.videoUrl.startsWith("http") ? (
                    <>
                      <div className="w-full h-full cursor-pointer" onClick={openVideoLightbox}>
                        <img
                          src={getInstagramThumbnail(project.videoUrl)}
                          alt={`${project.title} Video`}
                          className="w-full h-full object-cover"
                          onError={(e) => { e.target.classList.add('hidden'); }}
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition-colors">
                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent-gold flex items-center justify-center shadow-2xl shadow-accent-gold/30 transform transition-transform group-hover:scale-110">
                            <Play size={32} className="text-primary-dark ml-1.5" />
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={openVideoLightbox}
                        className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-sm text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-accent-gold hover:text-black"
                        title="View Fullscreen"
                      >
                        <Maximize2 size={16} />
                      </button>
                      <video
                        src={project.videoUrl}
                        className="w-full h-full object-contain"
                        controls
                        autoPlay
                      />
                    </>
                  )}
                </div>
                {typeof project.videoUrl === "string" && project.videoUrl.startsWith("http") && (
                  <div className="flex items-center justify-between mt-3">
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-gray-500 hover:text-accent-gold transition-colors uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <ExternalLink size={12} />
                      View on Instagram
                    </a>
                    <button
                      onClick={openVideoLightbox}
                      className="text-xs text-gray-500 hover:text-accent-gold transition-colors uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <Maximize2 size={12} />
                      Fullscreen
                    </button>
                  </div>
                )}
                <div className="absolute -bottom-3 -left-3 w-full h-full border border-accent-gold/20 rounded-2xl -z-10" />
              </div>
            </motion.div>
          )}
        </div>

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

      {/* Video Lightbox */}
      <AnimatePresence>
        {isVideoLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeVideoLightbox}
          >
            <button
              onClick={closeVideoLightbox}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-accent-gold transition-colors z-10 bg-white/5 rounded-full p-3 hover:bg-white/10"
            >
              <X size={24} />
            </button>

            <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
              {typeof project.videoUrl === "string" && project.videoUrl.startsWith("http") ? (
                <iframe
                  src={`${project.videoUrl.replace(/\/$/, "")}/embed`}
                  className="w-full rounded-lg shadow-2xl"
                  style={{ height: '80vh' }}
                  allowFullScreen
                  allow="clipboard-write; encrypted-media; picture-in-picture"
                  title={`${project.title} Video`}
                />
              ) : (
                <video
                  src={project.videoUrl}
                  className="w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                  controls
                  autoPlay
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetailPage;
