import { motion } from "framer-motion";
import { Linkedin, Crown, Heart, ArrowUp, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { id: 1, label: "الرئيسية", href: "#home" },
    { id: 2, label: "مكتبة الميديا", href: "#media-library" },
    { id: 3, label: "الشهادات", href: "#certificates" },
    { id: 4, label: "دراسات الحالة", href: "#case-studies" },
    { id: 5, label: "التقارير", href: "#reports" },
    { id: 6, label: "عني", href: "#about" },
  ];

  const socialLinks = [
    { icon: Linkedin, href: "https://www.linkedin.com/in/layla-baatyah", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
  ];

  const scrollToSection = (href: string) => {
    const sectionId = href.replace("#", "");
    
    if (sectionId === "home") {
      // Just scroll to top for home
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
      return;
    }
    
    // Dispatch event to open the section
    // CollapsibleSection will handle the scrolling after animation completes
    window.dispatchEvent(new CustomEvent("navigateToSection", { detail: sectionId }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-wrapper">
      {/* Decorative Top Border */}
      <div className="footer-top-border" />
      
      {/* Background glow effect */}
      <div className="footer-glow" />
      
      <div className="footer-container">
        {/* Main Footer Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-20"
        >
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:w-3/4"
          >
            <div className="footer-logo mb-">
              <motion.div 
                className="footer-logo-icon"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
              >
                <Crown className="w-6 h-6 text-primary-foreground" />
              </motion.div>
              <span className="footer-logo-text">ليلي باعطية</span>
            </div>
            <p className="footer-description">
              بدأت مسيرتي في العمل الصحفي عام 2012 من صحيفة التحلية التابعة لمؤسسة تحلية المياه المالحة   (SWCC)  في جدة، واستمر عطائي حتى عام 2023 عبر صحيفة البلاد.
              وخلال هذه السنوات، تعاونت مع عدد من الصحف العربية من أبرزها:
              مجلة سيدتي - ياسمينا - رواد الأعمال - والجوهرة – LEADRS  
              امتازت تجربتي بتغطية موضوعات متنوعة تجمع بين العمق الصحفي والأسلوب الإبداعي، مما أسهم في بناء خبرة متكاملة في إعداد المحتوى والتحرير الإعلامي.
              كما قمت بتقديم نشرة أخبار الصحف السعودية عبر إذاعة BBC عربي منذ عام 2027، مما أتاح لي إثراء خبرتي الإعلامية وتعزيز مهاراتي في الإلقاء والتحرير الإذاعي الى عام 2022 .

            </p>
            
            {/* Social Links */}
            <div className="footer-social">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -4 }}
                  whileTap={{ scale: 0.95 }}
                  className="footer-social-link group"
                  aria-label={social.label}
                >
                  <social.icon size={20} className="transition-colors duration-300" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="footer-links-section lg:w-1/4"
          >
            <h4 className="footer-section-title">روابط سريعة</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <motion.button
                    onClick={() => scrollToSection(link.href)}
                    whileHover={{ x: -8 }}
                    className="footer-link group"
                  >
                    <span className="footer-link-dot" />
                    <span>{link.label}</span>
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="footer-divider"
        />

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="footer-bottom"
        >
          <div className="footer-copyright">
            <p>
              © {currentYear}{" "}
              <span className="text-gradient-gold font-bold">Portfolio</span>
              . جميع الحقوق محفوظة
            </p>
          </div>
          
          <motion.div 
            className="footer-made-with"
            whileHover={{ scale: 1.05 }}
          >
            <span>صُنع بـ</span>
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500 mx-1" />
            </motion.span>
            <span>مخصوصاً</span>
            <span className="text-primary font-semibold mr-1">لـ"ليلى باعطية"</span>
          </motion.div>
          
          {/* Scroll to Top Button */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="footer-scroll-top group"
            aria-label="العودة للأعلى"
          >
            <motion.div
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowUp size={20} />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative bottom gradient */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{
          background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.4), transparent)',
        }}
      />
    </footer>
  );
};

export default Footer;
