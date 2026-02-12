import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image, Award, FileBarChart, FileText, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import HomeSection from "@/components/sections/HomeSection";
import MediaLibrarySection from "@/components/sections/MediaLibrarySection";
import CertificatesSection from "@/components/sections/CertificatesSection";
import CaseStudiesSection from "@/components/sections/CaseStudiesSection";
import ReportsSection from "@/components/sections/ReportsSection";
import AboutSection from "@/components/sections/AboutSection";
import CollapsibleSection from "@/components/CollapsibleSection";
import Footer from "@/components/Footer";

type SectionId = "media-library" | "certificates" | "case-studies" | "reports" | "about" | null;

const Index = () => {
  const [openSection, setOpenSection] = useState<SectionId>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth entrance
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleNavClick = (event: CustomEvent<SectionId>) => {
      if (event.detail) {
        setOpenSection(event.detail);
      }
    };

    window.addEventListener("navigateToSection", handleNavClick as EventListener);
    return () => window.removeEventListener("navigateToSection", handleNavClick as EventListener);
  }, []);

  const toggleSection = (id: SectionId) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'hsl(var(--background))' }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(38 90% 45%))',
                  boxShadow: '0 8px 40px hsl(var(--primary) / 0.4)',
                }}
              >
                <span className="text-2xl font-black text-primary-foreground">M</span>
              </motion.div>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-1 mx-auto rounded-full"
                style={{
                  background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(38 90% 70%))',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen"
        style={{ background: 'hsl(var(--background))' }}
      >
        <Navbar />

        {/* Home Section - Always visible */}
        <HomeSection />

        {/* Section divider */}
        <div className="flex flex-col items-center py-12">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="h-px w-full max-w-md bg-gradient-to-r from-transparent via-primary/30 to-transparent"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4"
          >
            <span className="text-2xl font-bold text-primary tracking-wider">استكشف أعمالي</span>
          </motion.div>
        </div>

        {/* Main Content with Collapsible Sections */}
        <main className="pb-20">
          {/* Media Library */}
          <CollapsibleSection
            id="media-library"
            title="مكتبة الميديا"
            isOpen={openSection === "media-library"}
            onToggle={() => toggleSection("media-library")}
            icon={Image}
          >
            <MediaLibrarySection />
          </CollapsibleSection>

          {/* Certificates */}
          <CollapsibleSection
            id="certificates"
            title="الشهادات"
            isOpen={openSection === "certificates"}
            onToggle={() => toggleSection("certificates")}
            icon={Award}
          >
            <CertificatesSection />
          </CollapsibleSection>

          {/* Case Studies */}
          <CollapsibleSection
            id="case-studies"
            title="دراسات الحالة"
            isOpen={openSection === "case-studies"}
            onToggle={() => toggleSection("case-studies")}
            icon={FileText}
          >
            <CaseStudiesSection />
          </CollapsibleSection>

          {/* Reports */}
          <CollapsibleSection
            id="reports"
            title="التقارير"
            isOpen={openSection === "reports"}
            onToggle={() => toggleSection("reports")}
            icon={FileBarChart}
          >
            <ReportsSection />
          </CollapsibleSection>

          {/* About */}
          <CollapsibleSection
            id="about"
            title="عني"
            isOpen={openSection === "about"}
            onToggle={() => toggleSection("about")}
            icon={User}
          >
            <AboutSection />
          </CollapsibleSection>
        </main>

        {/* Footer */}
        <Footer />

        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          {/* Top right glow */}
          <div 
            className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-20"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.3), transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          {/* Bottom left glow */}
          <div 
            className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full opacity-15"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary) / 0.2), transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
      </motion.div>
    </>
  );
};

export default Index;
