import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Award, Image as ImageIcon } from "lucide-react";
import MediaGallery from "../MediaGallery";
import { MediaItem } from "../MediaModal";

/*
 * =============================================
 * CERTIFICATES DATA
 * =============================================
 */

interface CertificateItem {
  id: string;
  type: "image" | "video" | "pdf";
  src: string;
  thumbnail?: string;
  title: string;
}

interface CertificateSectionData {
  id: string;
  title: string;
  items: CertificateItem[];
}

// ============ START: CERTIFICATES DATA ============

const certificatesData: CertificateSectionData[] = [
  // ========================================
  // القسم الأول: التنسيق الإعلامي
  // ========================================
  {
    id: "tansik-ilamy",
    title: "التنسيق الإعلامي",
    items: [
      {
        id: "cert-1",
        type: "image",
        src: "/Certificates/تنسيق اعلامي/English Recommendation letter, Layla_page_1.webp",
        title: "Letter of Recommendation",
      },
      {
        id: "cert-2",
        type: "image",
        src: "/Certificates/تنسيق اعلامي/تنسيق اعلامي فن ميديا_page_1.webp",
        title: "تنسيق إعلامي فن ميديا",
      },
    ],
  },
  // ========================================
  // القسم الثاني: الخبرة الصحفية
  // ========================================
  {
    id: "khabria-experience",
    title: "الخبرة الصحفية",
    items: [
      {
        id: "cert-3",
        type: "image",
        src: "/Certificates/خبرة صحفية/سواحل الجزيرة للاعلام وريادة الاعمال_page_1.webp",
        title: "سواحل الجزيرة للاعلام وريادة الاعمال - صفحة 1",
      },
      {
        id: "cert-4",
        type: "image",
        src: "/Certificates/خبرة صحفية/سواحل الجزيرة للاعلام وريادة الاعمال_page_2.webp",
        title: "سواحل الجزيرة للاعلام وريادة الاعمال - صفحة 2",
      },
      {
        id: "cert-5",
        type: "image",
        src: "/Certificates/خبرة صحفية/سواحل الجزيرة للاعلام وريادة الاعمال_page_3.webp",
        title: "سواحل الجزيرة للاعلام وريادة الاعمال - صفحة 3",
      },
      {
        id: "cert-6",
        type: "image",
        src: "/Certificates/خبرة صحفية/سواحل الجزيرة للاعلام وريادة الاعمال_page_4.webp",
        title: "سواحل الجزيرة للاعلام وريادة الاعمال - صفحة 4",
      },
      {
        id: "cert-7",
        type: "image",
        src: "/Certificates/خبرة صحفية/شبكةالاعلام السعودي_page_1.webp",
        title: "شبكة الإعلام السعودي",
      },
      {
        id: "cert-8",
        type: "image",
        src: "/Certificates/خبرة صحفية/صحيفة البلد_page_1.webp",
        title: "صحيفة البلد",
      },
      {
        id: "cert-9",
        type: "image",
        src: "/Certificates/خبرة صحفية/مشرفة قسم محليات صحيفة البلد_page_1.webp",
        title: "مشرفة قسم محليات صحيفة البلد",
      },
    ],
  },
  // ========================================
  // القسم الثالث: الدورات الصحفية
  // ========================================
  {
    id: "khabria-courses",
    title: "الدورات الصحفية",
    items: [
      {
        id: "cert-10",
        type: "image",
        src: "/Certificates/دورات صحفية/cert_en_174277_page_1.webp",
        title: "شهادة إنجليزية - 174277",
      },
      {
        id: "cert-11",
        type: "image",
        src: "/Certificates/دورات صحفية/Introduction to Digital Journalism_page_1.webp",
        title: "Introduction to Digital Journalism",
      },
      {
        id: "cert-12",
        type: "image",
        src: "/Certificates/دورات صحفية/شهادة فن الخبر الصحفي_page_1.webp",
        title: "شهادة فن الخبر الصحفي",
      },
    ],
  },
  // ========================================
  // القسم الرابع: شهادات الإدارة والتطوير الذاتي
  // ========================================
  {
    id: "management-certificates",
    title: "شهادات الإدارة والتطوير الذاتي",
    items: [
      {
        id: "cert-13",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/أساسيات تدقيق المعلومات_page_1.webp",
        title: "أساسيات تدقيق المعلومات",
      },
      {
        id: "cert-14",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/دبلوم بروتوكول العلاقات العامة_page_1.webp",
        title: "دبلوم بروتوكول العلاقات العامة",
      },
      {
        id: "cert-15",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/دورة كيفية التخطيط لأهدافك-ar_page_1.webp",
        title: "دورة كيفية التخطيط لأهدافك - عربي",
      },
      {
        id: "cert-16",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/دورة كيفية التخطيط لأهدافك-en_page_1.webp",
        title: "دورة كيفية التخطيط لأهدافك - إنجليزي",
      },
      {
        id: "cert-17",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/شهادة سلوكيات الاتصال الفعال_page_1.webp",
        title: "شهادة سلوكيات الاتصال الفعال",
      },
      {
        id: "cert-18",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/شهادة ما يجب فعله أثناء الحوار_page_1.webp",
        title: "شهادة ما يجب فعله أثناء الحوار",
      },
      {
        id: "cert-19",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/ليلى عبدالله أحمد سعيد باعطية العرض_page_1.webp",
        title: "ليلى باعطية - العرض التقديمي",
      },
      {
        id: "cert-20",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/ليلى عبدالله أحمد سعيد باعطية علاقات_page_1.webp",
        title: "ليلى باعطية - العلاقات العامة",
      },
      {
        id: "cert-21",
        type: "image",
        src: "/Certificates/شهادات ادارة وتطوير ذات/ليلى_page_1.webp",
        title: "ليلى باعطية",
      },
    ],
  },
];

// ============ END: CERTIFICATES DATA ============

// Color theme
const theme = {
  bgGradient: "from-amber-600/20 to-amber-700/10",
  border: "border-amber-400/50 dark:border-amber-500/50",
  iconBg: "bg-amber-500",
  textColor: "text-amber-700 dark:text-amber-300",
  shadowColor: "shadow-amber-500/20",
  hoverBg: "hover:bg-amber-500/10",
};

const CertificateItem = ({
  section,
  isOpen,
  onToggle,
  hoveredItem,
  onMouseEnter,
  onMouseLeave,
}: {
  section: CertificateSectionData;
  isOpen: boolean;
  onToggle: () => void;
  hoveredItem: string | null;
  onMouseEnter: (id: string) => void;
  onMouseLeave: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => onMouseEnter(section.id)}
      onMouseLeave={onMouseLeave}
      className="mb-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isOpen ? theme.bgGradient : 'bg-card'} ${theme.border} border shadow-lg ${theme.shadowColor} ${hoveredItem === section.id ? 'ring-2 ring-amber-500/30' : ''}`}
      >
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between p-5 ${theme.hoverBg} transition-all duration-300 relative z-10`}
          aria-expanded={isOpen}
        >
          <div className={`absolute inset-0 opacity-0 ${isOpen ? '' : 'hover:opacity-100'} transition-opacity duration-300 bg-gradient-to-r ${theme.bgGradient} ${theme.hoverBg} pointer-events-none`} />

          <div className="flex items-center gap-4 relative z-10">
            <motion.div 
              animate={{ rotate: isOpen ? 180 : 0, scale: hoveredItem === section.id ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
              className={`relative w-14 h-14 rounded-xl flex items-center justify-center ${theme.iconBg} shadow-lg ${theme.shadowColor}`}
            >
              <Award size={26} className="text-white" />
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs font-bold text-amber-600"
              >
                {section.items.length}
              </motion.div>
            </motion.div>
            <div className="text-right">
              <h2 className={`text-xl font-bold ${theme.textColor}`}>{section.title}</h2>
              <p className={`text-sm ${theme.textColor} opacity-70 mt-1`}>
                {section.items.length} شهادة{section.items.length > 1 ? 'ات' : ''}
              </p>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
            className={`p-3 rounded-full ${theme.iconBg}/20 ${theme.textColor} relative z-10`}
          >
            <ChevronDown size={24} />
          </motion.div>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-5 pb-5">
                <div className="pt-4 border-t border-amber-200/30 dark:border-amber-700/30">
                  <MediaGallery items={section.items as MediaItem[]} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const CertificatesSection = () => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleSection = (id: string) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleMouseEnter = (id: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setHoveredItem(id);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setHoveredItem(null), 150);
  };

  // Calculate stats
  const totalSections = certificatesData.length;
  const totalCertificates = certificatesData.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-400 bg-clip-text text-transparent">
            الشهادات
          </h2>
          <div className="relative mb-12">
  {/* تاق علوي صغير - يعطي تنظيم وشكل رسمي */}
  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/20 text-[10px] font-black text-amber-600 uppercase tracking-widest mb-4 border border-amber-100 dark:border-amber-800">
    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
    Professional Credentials
  </div>

  <div className="grid md:grid-cols-5 gap-6 items-start">
    {/* العنوان والوصف - الجزء الأكبر */}
    <div className="md:col-span-3">
      <h2 className="text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 leading-tight">
        السجل المهني <br /> 
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-600">والاعتمادات الدولية</span>
      </h2>
      
      <p className="text-lg text-slate-600 dark:text-slate-400 font-medium leading-relaxed border-r-4 border-amber-500/20 pr-4">
        مجموعة من <span className="text-amber-700 dark:text-amber-400 font-bold">الشهادات المهنية</span>، الدورات التدريبية المتقدمة، والخبرات الصحفية الموثقة التي تشكل مساري المهني.
      </p>
    </div>

    {/* إحصائية سريعة - تملأ الفراغ وتعطي ثقة (اختياري) */}
    <div className="md:col-span-2 flex justify-end">
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
           <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
           </svg>
        </div>
        <div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100">21+</div>
          <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">شهادة معتمدة</div>
        </div>
      </div>
    </div>
  </div>
</div>
        </div>
      </div>

      {/* Stats bar */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-amber-600/5 border border-amber-200/30 dark:border-amber-700/30 overflow-x-auto"
      >
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Award className="text-amber-600" size={20} />
          <span className="font-medium text-sm">{totalSections} أقسام</span>
        </div>
        <div className="w-px h-8 bg-amber-200/50 dark:bg-amber-700/50" />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <ImageIcon className="text-amber-600" size={20} />
          <span className="font-medium text-sm">{totalCertificates} شهادة</span>
        </div>
      </motion.div>

      <div className="space-y-4">
        {certificatesData.map((section) => (
          <CertificateItem
            key={section.id}
            section={section}
            isOpen={openSections[section.id] || false}
            onToggle={() => toggleSection(section.id)}
            hoveredItem={hoveredItem}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        ))}
      </div>

      {/* Empty state */}
      <AnimatePresence>
        {certificatesData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <div className="w-24 h-24 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center mb-4">
              <Award size={48} className="text-amber-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">لا توجد شهادات</h3>
            <p className="text-muted-foreground max-w-md">
              لم يتم العثور على أي شهادات. يرجى إضافة بعض الشهادات.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CertificatesSection;
