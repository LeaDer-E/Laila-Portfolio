import { ReactNode, useRef, useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, LucideIcon } from "lucide-react";

interface CollapsibleSectionProps {
  id: string;
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  className?: string;
  icon?: LucideIcon;
}

const CollapsibleSection = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
  className = "",
  icon: Icon = Sparkles,
}: CollapsibleSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Get header height for scroll offset
  const getHeaderHeight = useCallback(() => {
    const header = document.querySelector('[data-header="main"]');
    if (header) {
      return header.getBoundingClientRect().height;
    }
    // Fallback: check for header element
    const fallbackHeader = document.querySelector('header');
    if (fallbackHeader) {
      return fallbackHeader.getBoundingClientRect().height;
    }
    // Default header height if not found
    return 80;
  }, []);

  // Scroll to section when it opens
  const scrollToSection = useCallback(() => {
    if (!sectionRef.current) return;

    const headerHeight = getHeaderHeight();
    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    // Calculate target scroll position
    // sectionRect.top is viewport-relative, so we add window.scrollY to get document-relative
    const documentSectionTop = window.scrollY + sectionRect.top;
    const targetScrollY = documentSectionTop - headerHeight - 16; // 16px padding

    // Use requestAnimationFrame for smoother scroll after DOM updates
    requestAnimationFrame(() => {
      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    });
  }, [getHeaderHeight]);

  // Handle scroll when section opens
  useEffect(() => {
    if (isOpen && !isAnimating) {
      // Wait for the animation to complete (500ms duration + buffer)
      const timer = setTimeout(() => {
        scrollToSection();
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [isOpen, isAnimating, scrollToSection]);

  // Handle animation state
  const handleAnimationStart = useCallback(() => {
    setIsAnimating(true);
  }, []);

  const handleAnimationComplete = useCallback(() => {
    setIsAnimating(false);
    // After animation completes, scroll if still open
    if (isOpen) {
      // Use double requestAnimationFrame to ensure DOM has updated
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToSection();
        });
      });
    }
  }, [isOpen, scrollToSection]);

  // Reset animation state when closed
  useEffect(() => {
    if (!isOpen) {
      setIsAnimating(false);
    }
  }, [isOpen]);

  return (
    <section id={id} ref={sectionRef} className={`py-6 ${className}`}>
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={onToggle}
            className="w-full group"
            aria-expanded={isOpen}
          >
            <div 
              className="flex items-center justify-between py-5 px-6 rounded-2xl transition-all duration-500"
              style={{
                background: isOpen 
                  ? 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--card)))' 
                  : 'hsl(var(--card))',
                border: `1px solid ${isOpen ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--border))'}`
              }}
            >
              <div className="flex items-center gap-4">
                {/* Decorative icon */}
                <motion.div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{
                    background: isOpen 
                      ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(38 90% 45%))' 
                      : 'hsl(var(--primary) / 0.1)',
                  }}
                  animate={{ 
                    rotate: isOpen ? 360 : 0,
                    scale: isOpen ? 1.1 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon 
                    className={`w-5 h-5 transition-colors duration-300 ${
                      isOpen ? 'text-primary-foreground' : 'text-primary'
                    }`} 
                  />
                </motion.div>
                
                {/* Title */}
                <h2 className="section-header text-right">{title}</h2>
              </div>
              
              {/* Chevron */}
              <motion.div
                animate={{ 
                  rotate: isOpen ? 180 : 0,
                  scale: isOpen ? 1.1 : 1
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isOpen 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                <ChevronDown size={22} />
              </motion.div>
            </div>
          </button>

          {/* Glow effect when open */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute -inset-4 -z-10 rounded-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, hsl(var(--primary) / 0.1), transparent 70%)',
                  filter: 'blur(20px)',
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>

        {/* Content */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="overflow-hidden"
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
            >
              <motion.div 
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                exit={{ y: 20 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="pt-8 pb-4"
              >
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom border */}
        <motion.div
          className="mt-6 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--border)), transparent)',
          }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </section>
  );
};

export default CollapsibleSection;
