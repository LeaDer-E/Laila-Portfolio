import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, Download, Eye, Play, Star, Award, Users, Briefcase, FileText, Zap, Target, Palette, TrendingUp } from "lucide-react";
import MediaModal, { MediaItem } from "@/components/MediaModal";

const HomeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [pdfItem] = useState<MediaItem>({
    id: "media-kit",
    type: "pdf",
    src: "/ليلى باعطية.pdf",
    title: "Media Kit - ليلى باعطية",
    description: "السيرة الذاتية والمشاريع",
  });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 1]);

  const scrollToMediaLibrary = () => {
    document.getElementById("media-library")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadMediaKit = () => {
    const pdfUrl = "/ليلى باعطية.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "ليلى باعطية.pdf";
    link.click();
  };

  // Stats data
  const stats = [
    { icon: Briefcase, number: "150+", label: "مشروع منجز" },
    { icon: Users, number: "50+", label: "عميل سعيد" },
    { icon: Award, number: "5+", label: "سنوات خبرة" },
    { icon: Star, number: "4.9", label: "تقييم العملاء" },
  ];

  // Services data
  const services = [
    { icon: Palette, title: "تصميم الهوية البصرية", description: "تصميم شعارات وهوية مميزة تعكس قيم علامتك التجارية" },
    { icon: TrendingUp, title: "التسويق الرقمي", description: "استراتيجيات تسويق فعالة للوصول لجمهورك المستهدف" },
    { icon: Target, title: "إدارة المحتوى", description: "إنشاء وإدارة محتوى احترافي عبر جميع المنصات" },
    { icon: Zap, title: "التنسيق الإعلامي", description: "تنسيق صحفي وإعلامي للمناسبات والفعاليات" },
  ];

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
  }));

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Main gradient background */}
        <div className="hero-bg-gradient" />
        
        {/* Animated glow orbs */}
        <motion.div
          className="hero-glow"
          style={{ top: '10%', left: '20%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="hero-glow"
          style={{ bottom: '20%', right: '10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        <div className="hero-particles">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="hero-particle"
              style={{
                left: `${particle.x}%`,
                bottom: '-10px',
              }}
              animate={{
                y: [0, -window.innerHeight - 100],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div 
        style={{ y, opacity }}
        className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 text-center relative z-10"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-8 glass"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Star className="w-4 h-4 text-primary fill-primary" />
          </motion.div>
          <span className="text-sm font-medium text-foreground/80">
            أخصائي التواصل الاجتماعي والتنسيق الإعلامي
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 150, damping: 20 }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-foreground mb-6 leading-tight"
        >
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block text-foreground/70 font-semibold tracking-wide mb-2"
          >
            مرحباً، أنا
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              textShadow: [
                "0 0 20px rgba(175, 85%, 22%, 0.3)",
                "0 0 60px rgba(175, 85%, 22%, 0.6)",
                "0 0 20px rgba(175, 85%, 22%, 0.3)"
              ]
            }}
            transition={{ 
              duration: 0.8, 
              delay: 0.5, 
              type: "spring", 
              stiffness: 150, 
              damping: 15,
              textShadow: { duration: 3, repeat: Infinity }
            }}
            className="block mt-3 pb-2 text-gradient-elegant"
          >
            ليلى باعطية
          </motion.span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 150, damping: 20 }}
          className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-10 font-light"
        >
          أحوّل الأفكار إلى{" "}
          <span className="text-primary font-semibold">محتوى مرئي جذاب</span>{" "}
          يحقق أهداف المنظمات ويبني{" "}
          <span className="text-primary font-semibold">حضوراً رقمياً مؤثراً</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, type: "spring", stiffness: 150, damping: 20 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          {/* Primary Button - Download Media Kit */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleDownloadMediaKit}
            className="group relative px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-bold text-lg overflow-hidden shadow-lg shadow-primary/30"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-primary to-primary-foreground/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
            <span className="relative flex items-center gap-3">
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              >
                <Download className="w-5 h-5" />
              </motion.span>
              تحميل سيرتي الذاتيه
              <motion.span
                animate={{ x: [-3, 0, -3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowLeft 
                  size={20} 
                  className="transition-transform duration-300" 
                />
              </motion.span>
            </span>
          </motion.button>

          {/* Secondary Button - Browse Works */}
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={scrollToMediaLibrary}
            className="group relative px-8 py-4 bg-secondary/50 text-foreground rounded-2xl font-semibold text-lg border-2 border-primary/20 overflow-hidden"
          >
            <span className="relative flex items-center gap-3">
              <motion.span
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Play className="w-5 h-5" />
              </motion.span>
              استعرض الأعمال
            </span>
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="stat-card-enhanced group cursor-pointer"
            >
              <motion.div
                className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5"
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <stat.icon className="w-7 h-7 text-primary" />
              </motion.div>
              <motion.div
                className="stat-number-enhanced"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1, duration: 0.3 }}
              >
                {stat.number}
              </motion.div>
              <div className="stat-label">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-8"
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold text-foreground mb-8 relative inline-block"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            ماذا أقدم؟
            <motion.div
              className="absolute -bottom-2 right-0 w-20 h-1 rounded-full bg-gradient-to-l from-primary to-primary/50"
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring", stiffness: 200, damping: 20 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="bg-card/80 backdrop-blur-sm border border-primary/10 rounded-2xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
                onClick={scrollToMediaLibrary}
              >
                <motion.div
                  className="w-12 h-12 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5"
                  whileHover={{ rotate: 12, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <service.icon className="w-6 h-6 text-primary" />
                </motion.div>
                <h4 className="font-bold text-foreground mb-2">{service.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-3 text-muted-foreground"
          >
            <span className="text-sm font-medium">اكتشف المزيد</span>
            <div className="w-8 h-12 rounded-full border-2 border-primary/40 flex items-start justify-center p-2 relative overflow-hidden">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50"
              />
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-b from-primary/20 to-transparent opacity-50" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* PDF Media Kit Preview - Elegant Integrated Design */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hidden xl:flex absolute right-[5%] top-1/2 -translate-y-1/2 z-20 items-center gap-4"
      >
        <button
          onClick={() => setIsPdfModalOpen(true)}
          className="group cursor-pointer"
        >
          <div className="flex items-center gap-3 bg-card/60 backdrop-blur-md border border-primary/15 rounded-full px-5 py-3 shadow-lg shadow-primary/5 hover:shadow-primary/15 hover:border-primary/30 transition-all duration-500 hover:bg-card/80"
          >
            {/* Document preview */}
            <div className="relative w-14 h-16 rounded-lg overflow-hidden shadow-md group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
              <img
                src="/ليلى باعطية.jpg"
                alt="Media Kit"
                className="w-full h-full object-cover"
              />
              {/* PDF badge */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-md flex items-center justify-center shadow-sm">
                <FileText className="w-3 h-3 text-primary-foreground" />
              </div>
            </div>
            
            {/* Text */}
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">Media Kit</span>
              <span className="text-xs text-muted-foreground"> اضغط للعرض</span>
            </div>
            
            {/* Arrow */}
            <ArrowLeft className="w-4 h-4 text-primary/60 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
          </div>
        </button>
      </motion.div>

      {/* PDF Modal */}
      <MediaModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        items={[pdfItem]}
        currentIndex={0}
        onNavigate={() => {}}
      />

      {/* Decorative elements */}
      <motion.div
        className="absolute top-1/4 right-10 w-24 h-24 border-2 border-primary/20 rounded-full"
        animate={{ rotate: 360, scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-10 w-36 h-36 border border-primary/10 rounded-full"
        animate={{ rotate: -360, scale: [1, 1.05, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary/50 rounded-full shadow-lg shadow-primary/50"
        animate={{ 
          scale: [1, 1.5, 1], 
          opacity: [0.5, 1, 0.5],
          boxShadow: [
            "0 0 10px rgba(175, 85%, 22%, 0.5)",
            "0 0 25px rgba(175, 85%, 22%, 0.8)",
            "0 0 10px rgba(175, 85%, 22%, 0.5)"
          ]
        }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-4 h-4 bg-primary/30 rounded-full shadow-lg shadow-primary/30"
        animate={{ 
          scale: [1.5, 1, 1.5], 
          opacity: [0.3, 0.7, 0.3],
          boxShadow: [
            "0 0 15px rgba(175, 85%, 22%, 0.3)",
            "0 0 30px rgba(175, 85%, 22%, 0.6)",
            "0 0 15px rgba(175, 85%, 22%, 0.3)"
          ]
        }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
    </section>
  );
};

export default HomeSection;
