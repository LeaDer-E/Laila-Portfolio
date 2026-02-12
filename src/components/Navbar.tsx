import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sparkles, Crown } from "lucide-react";

const navLinks = [
  { id: "home", label: "الرئيسية" },
  { id: "media-library", label: "مكتبة الميديا" },
  { id: "certificates", label: "الشهادات" },
  { id: "case-studies", label: "دراسات الحالة" },
  { id: "reports", label: "التقارير" },
  { id: "about", label: "عني" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = navLinks.map((link) => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const offsetTop = section.offsetTop;
          const offsetHeight = section.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(navLinks[index].id);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isMobileMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-toggle')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    
    if (id === "home") {
      // Just scroll to top for home
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      return;
    }
    
    // Dispatch event to open the section
    // CollapsibleSection will handle the scrolling after animation completes
    window.dispatchEvent(new CustomEvent("navigateToSection", { detail: id }));
  };

  return (
    <>
      <motion.header
        data-header="main"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "header-scrolled"
            : "header-transparent"
        }`}
      >
        <nav className="navbar-container">
          {/* Logo */}
          <motion.div
            className="logo-wrapper"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => scrollToSection("home")}
          >
            <motion.div 
              className="logo-icon"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <Crown className="w-6 h-6 text-primary-foreground" />
            </motion.div>
            <div className="flex flex-col">
              <span className="logo-text">Portfolio</span>
              <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">
                ليلى باعطية
              </span>
            </div>
          </motion.div>

          {/* Desktop navigation */}
          <ul className="desktop-nav">
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              >
                <button
                  onClick={() => scrollToSection(link.id)}
                  className={`nav-link-enhanced ${
                    activeSection === link.id ? "nav-link-active" : ""
                  }`}
                >
                  <span className="nav-link-text">{link.label}</span>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="nav-active-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              </motion.li>
            ))}
          </ul>

          {/* CTA Button - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="hidden lg:block"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection("about")}
              className="px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(175 80% 18%) 100%)',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)',
              }}
            >
              تواصل معي
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.9 }}
          >
            <div className="menu-icon-wrapper">
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.button>
        </nav>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mobile-menu-backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="mobile-menu"
            >
              <div className="mobile-menu-header">
                <div className="logo-wrapper" onClick={() => scrollToSection("home")}>
                  <motion.div 
                    className="logo-icon"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    <Crown className="w-5 h-5 text-primary-foreground" />
                  </motion.div>
                  <span className="logo-text">Media Hub</span>
                </div>
              </div>
              
              <nav className="mobile-menu-nav">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                  >
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className={`mobile-nav-link ${
                        activeSection === link.id ? "mobile-nav-link-active" : ""
                      }`}
                    >
                      <span className="mobile-nav-text">{link.label}</span>
                      {activeSection === link.id && (
                        <motion.div
                          layoutId="mobileActiveIndicator"
                          className="mobile-active-dot"
                        />
                      )}
                    </button>
                  </motion.div>
                ))}

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.3 }}
                  className="mt-6 px-4"
                >
                  <button
                    onClick={() => scrollToSection("about")}
                    className="w-full py-4 rounded-xl font-bold text-base transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(175 80% 18%) 100%)',
                      color: 'hsl(var(--primary-foreground))',
                      boxShadow: '0 4px 20px hsl(var(--primary) / 0.3)',
                    }}
                  >
                    تواصل معي
                  </button>
                </motion.div>
              </nav>
              
              <div className="mobile-menu-footer">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    © 2026 Portfolio
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
