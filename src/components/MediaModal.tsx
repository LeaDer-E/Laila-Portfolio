import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronRight, ChevronLeft, Download, ExternalLink } from "lucide-react";

export interface MediaItem {
  id: string;
  type: "image" | "video" | "pdf";
  src: string;
  thumbnail?: string;
  title: string;
  description?: string;
}

interface MediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MediaItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const MediaModal = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
}: MediaModalProps) => {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          handleNext(); // RTL: Left arrow goes to next
          break;
        case "ArrowRight":
          handlePrev(); // RTL: Right arrow goes to previous
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const renderMedia = () => {
    if (!currentItem) return null;

    switch (currentItem.type) {
      case "image":
        return (
          <motion.img
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={currentItem.src}
            alt={currentItem.title}
            className="w-full h-full object-contain"
          />
        );
      case "video":
        return (
          <motion.video
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            src={currentItem.src}
            controls
            autoPlay
            className="w-full h-full object-contain"
          />
        );
      case "pdf":
        return (
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full bg-card overflow-hidden"
          >
            <embed
              src={currentItem.src}
              type="application/pdf"
              className="w-full h-full"
              title={currentItem.title}
            />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return createPortal(
   <AnimatePresence>
     {isOpen && (
       <>
         {/* Backdrop with subtle shadow */}
         <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.25 }}
           className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
           onClick={onClose}
         />

         {/* Modal Container - Full Screen */}
         <motion.div
           initial={{ opacity: 0, scale: 0.95, y: 10 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           exit={{ opacity: 0, scale: 0.95, y: 10 }}
           transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
           className="fixed inset-0 z-[101] flex items-center justify-center p-8"
           onClick={(e) => {
             if (e.target === e.currentTarget) onClose();
           }}
         >
           <div className="relative w-full h-full max-w-[80vw] max-h-[80vh] flex items-center justify-center">
             {/* Media Container */}
             <motion.div
               className="w-full h-full bg-background rounded-2xl shadow-2xl overflow-hidden flex items-center justify-center"
               onClick={(e) => e.stopPropagation()}
             >
               <AnimatePresence mode="wait">
                 {renderMedia()}
               </AnimatePresence>
             </motion.div>

             {/* Close Button - Top Left */}
             <motion.button
               initial={{ opacity: 0, y: -10, x: 10 }}
               animate={{ opacity: 1, y: 0, x: 0 }}
               whileHover={{ scale: 1.1 }}
               whileTap={{ scale: 0.95 }}
               transition={{ delay: 0.1, duration: 0.2 }}
               onClick={onClose}
               className="absolute -top-16 left-0 p-3 rounded-full bg-white/90 text-foreground hover:bg-white transition-all backdrop-blur-sm shadow-lg dark:bg-foreground/90 dark:text-background"
               aria-label="إغلاق"
             >
               <X size={24} />
             </motion.button>

             {/* Download/Open Button - Top Right */}
             {currentItem && (
               <motion.a
                 initial={{ opacity: 0, y: -10, x: -10 }}
                 animate={{ opacity: 1, y: 0, x: 0 }}
                 whileHover={{ scale: 1.1 }}
                 whileTap={{ scale: 0.95 }}
                 transition={{ delay: 0.15, duration: 0.2 }}
                 href={currentItem.src}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="absolute -top-16 right-0 p-3 rounded-full bg-white/90 text-foreground hover:bg-white transition-all backdrop-blur-sm shadow-lg dark:bg-foreground/90 dark:text-background flex items-center gap-2"
                 onClick={(e) => e.stopPropagation()}
               >
                 {currentItem.type === "pdf" ? (
                   <>
                     <Download size={20} />
                     <span className="text-sm">تحميل</span>
                   </>
                 ) : (
                   <ExternalLink size={20} />
                 )}
               </motion.a>
             )}

             {/* Navigation Arrows */}
             {items.length > 1 && (
               <>
                 {/* Previous Button - Right */}
                 <motion.button
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   whileHover={{ scale: 1.15, x: 5 }}
                   whileTap={{ scale: 0.9 }}
                   transition={{ delay: 0.2, duration: 0.2 }}
                   onClick={(e) => {
                     e.stopPropagation();
                     handlePrev();
                   }}
                   className="absolute -right-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-foreground hover:bg-white transition-all backdrop-blur-sm shadow-lg dark:bg-foreground/90 dark:text-background"
                   aria-label="السابق"
                 >
                   <ChevronRight size={28} />
                 </motion.button>

                 {/* Next Button - Left */}
                 <motion.button
                   initial={{ opacity: 0, x: -20 }}
                   animate={{ opacity: 1, x: 0 }}
                   whileHover={{ scale: 1.15, x: -5 }}
                   whileTap={{ scale: 0.9 }}
                   transition={{ delay: 0.2, duration: 0.2 }}
                   onClick={(e) => {
                     e.stopPropagation();
                     handleNext();
                   }}
                   className="absolute -left-20 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-foreground hover:bg-white transition-all backdrop-blur-sm shadow-lg dark:bg-foreground/90 dark:text-background"
                   aria-label="التالي"
                 >
                   <ChevronLeft size={28} />
                 </motion.button>
               </>
             )}

             {/* Caption - Bottom */}
             {currentItem && (
               <motion.div
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.25, duration: 0.2 }}
                 className="absolute -bottom-24 left-1/2 -translate-x-1/2 text-center bg-white/90 dark:bg-foreground/90 dark:text-background backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg max-w-xs"
               >
                 <h3 className="text-lg font-semibold">{currentItem.title}</h3>
                 {currentItem.description && (
                   <p className="text-sm text-muted-foreground dark:text-muted-foreground/70 mt-1">
                     {currentItem.description}
                   </p>
                 )}
                 <p className="text-xs text-muted-foreground/60 dark:text-muted-foreground/50 mt-2">
                   {currentIndex + 1} من {items.length}
                 </p>
               </motion.div>
             )}
           </div>
         </motion.div>
       </>
     )}
   </AnimatePresence>,
   document.getElementById("modal-root") || document.body
  );
};

export default MediaModal;
