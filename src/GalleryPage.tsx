import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { CustomCursor } from './components/CustomCursor';

interface GalleryPageProps {
  category: string;
  images: string[];
  backgroundImage: string;
  onBack: () => void;
}

const GalleryPage: React.FC<GalleryPageProps> = ({ category, images, backgroundImage, onBack }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const openModal = (img: string) => {
    setSelectedImg(img);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImg(null);
  };

  return (
    <div className="min-h-screen bg-luxury-black text-white relative overflow-hidden">
      <CustomCursor />
      <div className="bg-grain" />

      {/* Parallax Background */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Overlay for readability */}
        <img
          src={backgroundImage}
          alt={`${category} Background`}
          className="w-full h-full object-cover opacity-80 scale-110 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-black/80 z-20" />
      </motion.div>

      {/* Header Section */}
      <div className="relative z-30 pt-16 px-6 md:px-20 pb-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          onClick={onBack}
          className="group flex items-center gap-3 text-white/60 hover:text-luxury-gold transition-colors duration-300 uppercase tracking-[0.2em] text-[10px] font-medium mb-16"
        >
          <span className="w-8 h-[1px] bg-white/40 group-hover:bg-luxury-gold transition-colors duration-300"></span>
          Back to Archives
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ opacity }}
          className="text-center md:text-left mb-24"
        >
          <p className="text-luxury-gold font-mono text-xs uppercase tracking-[0.4em] mb-4 opacity-80">Series //</p>
          <h1 className="text-6xl md:text-9xl font-display font-light tracking-wide text-white drop-shadow-2xl">
            {category}
          </h1>
        </motion.div>
      </div>

      {/* Gallery Grid - Masonry Feel */}
      <div className="relative z-30 px-6 md:px-20 pb-32">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="break-inside-avoid group relative cursor-pointer overflow-hidden rounded-sm shadow-2xl"
              onClick={() => openModal(img)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={img}
                  alt={`${category} ${idx + 1}`}
                  className="w-full h-auto transform transition-transform duration-[1.2s] ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  loading="lazy"
                />
                {/* Premium Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <span className="w-16 h-16 border border-white/30 rounded-full flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-500 backdrop-blur-sm">
                    <span className="text-xs uppercase tracking-widest text-white">View</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer / Copyright for this page */}
      <footer className="relative z-30 py-12 border-t border-white/10 text-center text-white/20 text-xs font-mono tracking-widest uppercase">
        &copy; 2026 Rudrasish Portfolio. {category} Series.
      </footer>

      {/* Modal - Enhanced */}
      <AnimatePresence>
        {modalOpen && selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/98 backdrop-blur-3xl z-[100] flex items-center justify-center p-4 md:p-10"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-[90vw] max-h-[90vh]"
            >
              <img
                src={selectedImg}
                alt="Enlarged"
                className="max-w-full max-h-full object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-sm"
              />
              <button
                onClick={closeModal}
                className="absolute -top-12 md:-top-8 right-0 text-white/40 hover:text-white transition-colors uppercase tracking-[0.2em] text-xs flex items-center gap-2"
              >
                <span>Close</span>
                <span className="text-lg">×</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;