import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, FileText, Image as ImageIcon, Eye } from "lucide-react";
import MediaModal, { MediaItem } from "./MediaModal";

interface MediaGalleryProps {
  items: MediaItem[];
}

const MediaGallery = ({ items }: MediaGalleryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsModalOpen(true);
  };

  const getTypeLabel = (type: MediaItem["type"]) => {
    switch (type) {
      case "video":
        return "فيديو";
      case "pdf":
        return "PDF";
      default:
        return "صورة";
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => openModal(index)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="media-card group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg"
          >
            {/* Thumbnail with zoom effect */}
            <div className="absolute inset-0 bg-muted overflow-hidden">
              <motion.img
                src={item.thumbnail || item.src}
                alt={item.title}
                className="w-full h-full object-cover"
                loading="lazy"
                animate={{ scale: hoveredIndex === index ? 1.1 : 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Type indicator */}
            <div className="absolute top-2 right-2">
              <div className={`px-2 py-1 rounded-md backdrop-blur-sm text-xs font-medium flex items-center gap-1 ${
                item.type === 'video' ? 'bg-red-500/80 text-white' :
                item.type === 'pdf' ? 'bg-blue-500/80 text-white' :
                'bg-teal-500/80 text-white'
              }`}>
                {item.type === 'video' && <Play size={12} />}
                {item.type === 'pdf' && <FileText size={12} />}
                {item.type === 'image' && <ImageIcon size={12} />}
                <span>{getTypeLabel(item.type)}</span>
              </div>
            </div>

            {/* Hover overlay with icon */}
            <AnimatePresence>
              {hoveredIndex === index && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-black/30 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.5, opacity: 0 }}
                    className="p-4 rounded-full bg-white/90 backdrop-blur-sm shadow-lg"
                  >
                    <Eye size={32} className="text-foreground" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Title */}
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <motion.p 
                className="text-sm font-medium text-white line-clamp-2"
                animate={{ y: hoveredIndex === index ? 0 : 5 }}
              >
                {item.title}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>

      <MediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        items={items}
        currentIndex={currentIndex}
        onNavigate={setCurrentIndex}
      />
    </>
  );
};

export default MediaGallery;
