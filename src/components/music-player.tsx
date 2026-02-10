import { useState } from "react";
import { X } from "lucide-react";
import { IoHeadset } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

interface MusicPlayerProps {
  videoId?: string;
}

export default function MusicPlayer({
  videoId = "dQw4w9WgXcQ",
}: MusicPlayerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOverlay = () => {
    setIsOpen(!isOpen);
  };

  const closeOverlay = () => {
    setIsOpen(false);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleOverlay}
        className="fixed bottom-4 right-4 z-[996] border border-sand/50 bg-dark text-white rounded-full p-2 shadow-2xl hover:bg-teal/90 hover:text-dark transition-colors duration-200 flex items-center justify-center intelliurl-btn"
        aria-label="Open music player"
      >
        <IoHeadset size={16} />
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeOverlay}
              className="music-backdrop fixed inset-0 bg-dark/50 z-[997] backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[998] flex items-center justify-center p-4"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                closeOverlay();
              }}
            >
              <div className="relative w-full max-w-3xl aspect-video bg-dark rounded-sm overflow-hidden shadow-2xl">
                <button
                  onClick={closeOverlay}
                  className="absolute top-2 right-2 z-10 bg-dark/60 hover:bg-dark/70 text-light rounded-sm p-1 transition-colors duration-200 focus:outline-none focus:ring-0"
                  aria-label="Close music player"
                >
                  <X size={18} className="text-light" />
                </button>

                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${videoId}`}
                  title="Music Player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
