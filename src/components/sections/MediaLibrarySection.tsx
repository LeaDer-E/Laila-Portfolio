import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FolderOpen, FileText, Image as ImageIcon, Video, Search, ZoomIn } from "lucide-react";
import MediaGallery from "../MediaGallery";
import { MediaItem } from "../MediaModal";

  /*
   * =============================================
   * MEDIA LIBRARY DATA
   * =============================================
   */

  interface MediaItemData {
    id: string;
    type: "image" | "video" | "pdf";
    src: string;
    thumbnail?: string;
    title: string;
  }

  interface MediaSubsection {
    id: string;
    title: string;
    items: MediaItemData[];
  }

  interface MediaSectionData {
    id: string;
    title: string;
    colorTheme: "teal" | "amber";
    subsections: MediaSubsection[];
  }

  // ============ START: MEDIA DATA ============

  const mediaData: MediaSectionData[] = [
    // ========================================
    // القسم الأول: أسماء محلات تجارية ومنتجات
    // ========================================
    {
      id: "asmaa-mahalat-tijarat",
      title: "أسماء محلات تجارية ومنتجات",
      colorTheme: "teal",
      subsections: [
        {
          id: "box-sabahy",
          title: "بوكس صبّاحي",
          items: [
            {
              id: "sabahy-1",
              type: "pdf",
              src: "/Media/اسماء محلات تجارية ومنتجات/بوكس صبّاحي/مشروع بوكس  صبّـاحي.pdf",
              thumbnail: "/pdf.png",
              title: "مشروع بوكس صبّاحي.pdf",
            },
          ],
        },
        {
          id: "box-taeemat",
          title: "بوكس طِعيمات",
          items: [
            {
              id: "taeemat-1",
              type: "pdf",
              src: "/Media/اسماء محلات تجارية ومنتجات/بوكس طِعيمات/بوكس طعيمات.pdf",
              thumbnail: "/pdf.png",
              title: "بوكس طعيمات.pdf",
            },
            {
              id: "taeemat-2",
              type: "image",
              src: "/Media/اسماء محلات تجارية ومنتجات/بوكس طِعيمات/صورة واتساب بتاريخ 1445-07-20 في 12.18.12_5fe3eb21.jpg",
              title: "صورة واتساب",
            },
          ],
        },
        {
          id: "matam-lazma",
          title: "مطعم لزمة",
          items: [
            {
              id: "lazma-1",
              type: "image",
              src: "/Media/اسماء محلات تجارية ومنتجات/مطعم لزمة/صورة واتساب بتاريخ 1447-06-16 في 00.14.50_c8b2201d.jpg",
              title: "صورة واتساب",
            },
            {
              id: "lazma-2",
              type: "pdf",
              src: "/Media/اسماء محلات تجارية ومنتجات/مطعم لزمة/مطعم لَزمة.pdf",
              thumbnail: "/pdf.png",
              title: "مطعم لزمة.pdf",
            },
          ],
        },
      ],
    },
    // ========================================
    // القسم الثاني: التنسيق الإعلامي
    // ========================================
    {
      id: "al-tansik-al-ilamy",
      title: "التنسيق الإعلامي",
      colorTheme: "teal",
      subsections: [
        {
          id: "sultan-al-subaie",
          title: "رجل الأعمال سلطان السبيعي",
          items: [
            { id: "sultan-1", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرجل الاعمال سلطان السبيعي/1.jpg", title: "صورة 1" },
            { id: "sultan-2", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرجل الاعمال سلطان السبيعي/2.jpg", title: "صورة 2" },
            { id: "sultan-3", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرجل الاعمال سلطان السبيعي/3.jpg", title: "صورة 3" },
          ],
        },
        {
          id: "novel-qatleni",
          title: "رواية قتلني بهدوء",
          items: [
            { id: "novel-1", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرواية  قتلني بهدوء للكاتب جمال الحسن/IMG-20250928-WA0064.jpg", title: "صورة 1" },
            { id: "novel-2", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرواية  قتلني بهدوء للكاتب جمال الحسن/IMG-20250928-WA0065.jpg", title: "صورة 2" },
            { id: "novel-3", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرواية  قتلني بهدوء للكاتب جمال الحسن/IMG-20250928-WA0066.jpg", title: "صورة 3" },
            { id: "novel-4", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرواية  قتلني بهدوء للكاتب جمال الحسن/IMG-20250928-WA0067.jpg", title: "صورة 4" },
            { id: "novel-5", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لرواية  قتلني بهدوء للكاتب جمال الحسن/IMG-20250928-WA0068.jpg", title: "صورة 5" },
          ],
        },
        {
          id: "fashion-show",
          title: "فاشن شو ديب أوشن",
          items: [
            { id: "fashion-1", type: "video", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لفاشن شو ديب اوشن/التنسيق الاعلامي لفاشن شو ديب اوشن.mp4", thumbnail: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لفاشن شو ديب اوشن/Vedio.png", title: "فيديو التنسيق الإعلامي" },
          ],
        },
        {
          id: "riadah-digitalia",
          title: "معسكر الريادة الرقمية",
          items: [
            { id: "riadah-1", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/33a2105aa511caaea79824789d058951f9d2203d.jpg", title: "صورة 1" },
            { id: "riadah-2", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/4324ab5624edb7496e807ad12c0d863b704bce45.jpg", title: "صورة 2" },
            { id: "riadah-3", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/7a2350b234ce9c48922b62c3e0887380417c8215.jpg", title: "صورة 3" },
            { id: "riadah-4", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/a54c0738425079c10d12eed34b8431422d67a492.jpg", title: "صورة 4" },
            { id: "riadah-5", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/ade3380429e18b47f8d58f3171e509981542da93.jpg", title: "صورة 5" },
            { id: "riadah-6", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/صورة واتساب بتاريخ 1445-12-13 في 19.05.58_767529d4.jpg", title: "صورة واتساب 1" },
            { id: "riadah-7", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/صورة واتساب بتاريخ 1445-12-13 في 19.08.17_a4c619e3.jpg", title: "صورة واتساب 2" },
            { id: "riadah-8", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/صورة واتساب بتاريخ 1445-12-13 في 19.11.48_810a3f67.jpg", title: "صورة واتساب 3" },
            { id: "riadah-9", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/صورة واتساب بتاريخ 1445-12-13 في 19.13.26_bbdd02c8.jpg", title: "صورة واتساب 4" },
            { id: "riadah-10", type: "image", src: "/Media/التنسيق الاعلامي/التنسيق الاعلامي لمعسكر الريادة الرقمية/صورة واتساب بتاريخ 1445-12-18 في 12.09.18_81825b22.jpg", title: "صورة واتساب 5" },
          ],
        },
        {
          id: "shoroq-lab",
          title: "مختبر شروق للمختبرات الطبية",
          items: [
            { id: "shoroq-1", type: "pdf", src: "/Media/التنسيق الاعلامي/تقديم خطة المركز الاعلامي لمختبر شروق للمختبرات الطبية/خطة حفل افتتاح شروق للمختبرات الطبية.pdf", thumbnail: "/pdf.png", title: "خطة حفل افتتاح شروق" },
          ],
        },
        {
          id: "sandal-fal",
          title: "خبر حصول منصة سندك على رخصة فال",
          items: [
            { id: "sandal-1", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/البلاد.png", title: "البلاد" },
            { id: "sandal-2", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/الحدث.png", title: "الحدث" },
            { id: "sandal-3", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/السياحة الخليجية.png", title: "السياحة الخليجية" },
            { id: "sandal-4", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/المنصة السابعة الرقمية.png", title: "المنصة السابعة" },
            { id: "sandal-5", type: "pdf", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/المواد.pdf", thumbnail: "/pdf.png", title: "المواد" },
            { id: "sandal-6", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/الحدث.png", title: "الحدث 2" },
            { id: "sandal-7", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/صحيفة غرب.png", title: "غرب" },
            { id: "sandal-8", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/لقطة شاشة 2023-12-10 192326.png", title: "لقطة شاشة 1" },
            { id: "sandal-9", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/لقطة شاشة 2023-12-10 192435.png", title: "لقطة شاشة 2" },
            { id: "sandal-10", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/لقطة شاشة 2023-12-10 192521.png", title: "لقطة شاشة 3" },
            { id: "sandal-11", type: "image", src: "/Media/التنسيق الاعلامي/خبر حصول منصة سندك على رخصة فال العقارية/لقطة شاشة 2023-12-10 192851.png", title: "لقطة شاشة 4" },
          ],
        },
        {
          id: "sandal-wahat",
          title: "خبر منصة سندك الوجهة الأولى",
          items: [
            { id: "sandal-wahat-1", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/6.jpg", title: "صورة 6" },
            { id: "sandal-wahat-2", type: "pdf", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/تقرير النشر لمنصة سندك العقارية.pdf", thumbnail: "/pdf.png", title: "تقرير النشر" },
            { id: "sandal-wahat-3", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/روافد.png", title: "روافد" },
            { id: "sandal-wahat-4", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/صحيفة السابعة.png", title: "السابعة" },
            { id: "sandal-wahat-5", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/صحيفة الشعلة.png", title: "الشعلة" },
            { id: "sandal-wahat-6", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/صحيفة الكفاح.png", title: "الكفاح" },
            { id: "sandal-wahat-7", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/روافد.png", title: "روافد 2" },
            { id: "sandal-wahat-8", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/صورة واتساب بتاريخ 1445-06-13 في 15.59.21_30bd790f.jpg", title: "صورة واتساب 1" },
            { id: "sandal-wahat-9", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/صورة واتساب بتاريخ 1445-06-13 في 16.00.52_70b5edd8.jpg", title: "صورة واتساب 2" },
            { id: "sandal-wahat-10", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/همسة سماء.png", title: "همسة سماء" },
            { id: "sandal-wahat-11", type: "image", src: "/Media/التنسيق الاعلامي/خبر منصة سندك هي الوجهة الأولى في العقار/همسة سماءء.png", title: "همسة سماءء" },
          ],
        },
        {
          id: "sandal-plan",
          title: "خطة إعلامية لتطبيق سندك",
          items: [
            { id: "sandal-plan-1", type: "pdf", src: "/Media/التنسيق الاعلامي/خطة اعلامية لتطبيق سندك/خطة اعلامية لتطبيق سندك.pdf", thumbnail: "/pdf.png", title: "الخطة الإعلامية" },
          ],
        },
        {
          id: "sun-top-media",
          title: "سن توب",
          items: [
            { id: "sun-1", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/1.jpg", title: "1" },
            { id: "sun-2", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/11.jpg", title: "11" },
            { id: "sun-3", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/2.jpg", title: "2" },
            { id: "sun-4", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/22.jpg", title: "22" },
            { id: "sun-5", type: "video", src: "/Media/التنسيق الاعلامي/سن توب/23.mp4", thumbnail: "/Media/التنسيق الاعلامي/سن توب/Video.png", title: "فيديو 23" },
            { id: "sun-6", type: "video", src: "/Media/التنسيق الاعلامي/سن توب/3.mp4", thumbnail: "/Media/التنسيق الاعلامي/سن توب/Video.png", title: "فيديو 3" },
            { id: "sun-7", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/3653f02265444003a3947b8b2efc6c71.jpg", title: "صورة 1" },
            { id: "sun-8", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/49fb126d3eea47969ee9385be60f67e9.jpg", title: "صورة 2" },
            { id: "sun-9", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/4fbcf8fe6fa344bdb96cd9d20118b7a4.jpg", title: "صورة 3" },
            { id: "sun-10", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/544a7057fe0a469ea551664f764b8531.jpg", title: "صورة 4" },
            { id: "sun-11", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/57af0ce947c24adcbcddd0d37572af60.jpg", title: "صورة 5" },
            { id: "sun-12", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/981aa9f04073472c977da4e0456baf18.jpg", title: "صورة 6" },
            { id: "sun-13", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/9bbcb289c4134924975b8ce68ca5b06f.jpg", title: "صورة 7" },
            { id: "sun-14", type: "pdf", src: "/Media/التنسيق الاعلامي/سن توب/الروابط.pdf", thumbnail: "/pdf.png", title: "الروابط" },
            { id: "sun-15", type: "image", src: "/Media/التنسيق الاعلامي/سن توب/صورة واتساب بتاريخ 1447-06-17 في 20.44.32_1a489732.jpg", title: "صورة واتساب" },
          ],
        },
        {
          id: "tala-sahas",
          title: "لسيدة الأعمال تالا الصحصاح",
          items: [
            { id: "tala-1", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/صحيفة السابعة.png", title: "السابعة" },
            { id: "tala-2", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/صحيفة اليوم.jpg", title: "اليوم" },
            { id: "tala-3", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/صحيفة روافد.jpg", title: "روافد" },
            { id: "tala-4", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/صحيفة سهم.jpg", title: "سهم" },
            { id: "tala-5", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/صحيفة واكب.jpg", title: "واكب" },
            { id: "tala-6", type: "image", src: "/Media/التنسيق الاعلامي/سيدة الأعمال تالا الصحصاح تٌحدث ثورة في تطبيقات التوصيل وتغيّر المشهد/ليدرز.jpg", title: "ليدرز" },
          ],
        },
      ],
    },
  ];

  // ============ END: MEDIA DATA ============

  // Color themes for sections
  const colorThemes = {
    teal: {
      bgGradient: "from-teal-600/20 to-teal-700/10",
      border: "border-teal-400/50 dark:border-teal-500/50",
      iconBg: "bg-teal-500",
      textColor: "text-teal-700 dark:text-teal-300",
      shadowColor: "shadow-teal-500/20",
      hoverBg: "hover:bg-teal-500/10",
    },
  };

  const SubsectionAccordion = ({
    subsection,
    isOpen,
    onToggle,
    colorTheme,
    hoveredItem,
    onMouseEnter,
    onMouseLeave,
  }: {
    subsection: MediaSubsection;
    isOpen: boolean;
    onToggle: () => void;
    colorTheme: "teal" | "amber";
    hoveredItem: string | null;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
  }) => {
    const theme = colorThemes[colorTheme];

    const imageCount = subsection.items.filter(i => i.type === "image").length;
    const videoCount = subsection.items.filter(i => i.type === "video").length;
    const pdfCount = subsection.items.filter(i => i.type === "pdf").length;

    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => onMouseEnter(subsection.id)}
        onMouseLeave={onMouseLeave}
        className={`relative overflow-hidden rounded-xl transition-all duration-300 ${theme.bgGradient} ${theme.border} border ${hoveredItem === subsection.id ? 'ring-1 ring-teal-500/20' : ''}`}
      >
        <button
          onClick={onToggle}
          className={`w-full flex items-center justify-between p-4 ${theme.hoverBg} transition-all duration-300 relative z-10`}
          aria-expanded={isOpen}
        >
          <div className="flex items-center gap-3">
            <motion.div 
              animate={{ scale: hoveredItem === subsection.id ? 1.1 : 1 }}
              transition={{ duration: 0.2 }}
              className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.iconBg}`}
            >
              <FolderOpen size={18} className="text-white" />
            </motion.div>
            <div className="text-right">
              <h4 className={`font-semibold ${theme.textColor}`}>{subsection.title}</h4>
              <div className="flex items-center gap-2 mt-1">
                {imageCount > 0 && (
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                    <ImageIcon size={12} /> {imageCount}
                  </span>
                )}
                {videoCount > 0 && (
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                    <Video size={12} /> {videoCount}
                  </span>
                )}
                {pdfCount > 0 && (
                  <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                    <FileText size={12} /> {pdfCount}
                  </span>
                )}
              </div>
            </div>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
            transition={{ duration: 0.2 }}
            className={`p-2 rounded-lg ${theme.iconBg}/20 ${theme.textColor} relative z-10`}
          >
            <ChevronDown size={18} />
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
              <div className="px-4 pb-4">
                <div className="pt-3 border-t border-teal-200/30 dark:border-teal-700/30">
                  {/* Gallery with quick preview hint */}
                  <div className="relative">
                    <MediaGallery items={subsection.items} />
                    
                    {/* Quick preview hint */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="absolute -top-10 left-0 right-0 flex items-center justify-center gap-2 text-xs text-muted-foreground bg-background/80 backdrop-blur-sm py-1 px-3 rounded-full mx-auto w-fit"
                    >
                      <ZoomIn size={14} />
                      <span>انقر على أي عنصر للمعاينة</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  };

  const MediaSection = ({
    section,
    isOpen,
    onToggle,
    openSubsections,
    onToggleSubsection,
    hoveredItem,
    onMouseEnter,
    onMouseLeave,
  }: {
    section: MediaSectionData;
    isOpen: boolean;
    onToggle: () => void;
    openSubsections: Record<string, boolean>;
    onToggleSubsection: (id: string) => void;
    hoveredItem: string | null;
    onMouseEnter: (id: string) => void;
    onMouseLeave: () => void;
  }) => {
    const theme = colorThemes[section.colorTheme];
    const totalItems = section.subsections.reduce((acc, sub) => acc + sub.items.length, 0);
    const imageCount = section.subsections.reduce((acc, sub) => acc + sub.items.filter(i => i.type === 'image').length, 0);
    const videoCount = section.subsections.reduce((acc, sub) => acc + sub.items.filter(i => i.type === 'video').length, 0);
    const pdfCount = section.subsections.reduce((acc, sub) => acc + sub.items.filter(i => i.type === 'pdf').length, 0);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: section.subsections.length * 0.05 }}
        onMouseEnter={() => onMouseEnter(section.id)}
        onMouseLeave={onMouseLeave}
        className="mb-6"
      >
        {/* Collapsible Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={`relative overflow-hidden rounded-xl transition-all duration-300 ${isOpen ? theme.bgGradient : 'bg-card'} ${theme.border} border shadow-lg ${theme.shadowColor} ${hoveredItem === section.id ? 'ring-2 ring-teal-500/30' : ''}`}
        >
          <button
            onClick={onToggle}
            className={`w-full flex items-center justify-between p-5 ${theme.hoverBg} transition-all duration-300 relative z-10`}
            aria-expanded={isOpen}
          >
            {/* Gradient overlay on hover */}
            <div className={`absolute inset-0 opacity-0 ${isOpen ? '' : 'hover:opacity-100'} transition-opacity duration-300 bg-gradient-to-r ${theme.bgGradient} ${theme.hoverBg} pointer-events-none`} />

            <div className="flex items-center gap-4 relative z-10">
              <motion.div 
                animate={{ rotate: isOpen ? 180 : 0, scale: hoveredItem === section.id ? 1.05 : 1 }}
                transition={{ duration: 0.3 }}
                className={`relative w-14 h-14 rounded-xl flex items-center justify-center ${theme.iconBg} shadow-lg ${theme.shadowColor}`}
              >
                <FolderOpen size={26} className="text-white" />
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-background flex items-center justify-center text-xs font-bold text-teal-600"
                >
                  {section.subsections.length}
                </motion.div>
              </motion.div>
              <div className="text-right">
                <h2 className={`text-xl font-bold ${theme.textColor}`}>{section.title}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`text-sm ${theme.textColor} opacity-70`}>
                    {section.subsections.length} مشاريع
                  </span>
                  {imageCount > 0 && (
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                      <ImageIcon size={12} /> {imageCount}
                    </span>
                  )}
                  {videoCount > 0 && (
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                      <Video size={12} /> {videoCount}
                    </span>
                  )}
                  {pdfCount > 0 && (
                    <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-white/50 dark:bg-black/30 ${theme.textColor}`}>
                      <FileText size={12} /> {pdfCount}
                    </span>
                  )}
                </div>
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
                  <div className="pt-4 border-t border-teal-200/30 dark:border-teal-700/30">
                    {/* Subsections with indentation */}
                    <div className="mr-4 pl-4 border-l-2 border-teal-200/50 dark:border-teal-700/50 space-y-3">
                      {section.subsections.map((subsection, idx) => (
                        <motion.div
                          key={subsection.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: idx * 0.1 }}
                        >
                          <SubsectionAccordion
                            subsection={subsection}
                            isOpen={openSubsections[subsection.id] || false}
                            onToggle={() => onToggleSubsection(subsection.id)}
                            colorTheme={section.colorTheme}
                            hoveredItem={hoveredItem}
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    );
  };

  const MediaLibrarySection = () => {
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
    const [openSubsections, setOpenSubsections] = useState<Record<string, boolean>>({});
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const toggleSection = (id: string) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setOpenSections(prev => ({ ...prev, [id]: !prev[id] }));
      setTimeout(() => setIsAnimating(false), 300);
    };

    const toggleSubsection = (id: string) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setOpenSubsections(prev => ({ ...prev, [id]: !prev[id] }));
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
    const totalSections = mediaData.length;
    const totalImages = mediaData.reduce((acc, s) => acc + s.subsections.reduce((a, sub) => a + sub.items.filter(i => i.type === 'image').length, 0), 0);
    const totalVideos = mediaData.reduce((acc, s) => acc + s.subsections.reduce((a, sub) => a + sub.items.filter(i => i.type === 'video').length, 0), 0);
    const totalPDFs = mediaData.reduce((acc, s) => acc + s.subsections.reduce((a, sub) => a + sub.items.filter(i => i.type === 'pdf').length, 0), 0);

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <div className="relative mb-10 overflow-hidden">
              {/* عنوان القسم الأساسي لإعطاء سياق للجملة */}
              <h2 className=" text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent text-3xl md:text-4xl font-black text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-3">
                نماذج اعمالي
                <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
              </h2>

              {/* النص المطلوب مع تنسيق محسن */}
              <div className="relative pr-5 border-r-2 border-teal-500/30">
                <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                  مجموعة مختارة من <span className="text-teal-600 dark:text-teal-400 font-bold underline decoration-teal-500/20 underline-offset-8">الأعمال الإبداعية</span> والمشاريع الإعلامية التي تجسد رؤيتي.
                </p>
                
                {/* لمسة جمالية: إحصائيات سريعة بجانب النص إذا أردت */}
                <div className="flex gap-4 mt-4 text-[10px] font-black text-teal-600/60 uppercase tracking-widest">
                  <span>Curated Content</span>
                  <span>•</span>
                  <span>High Quality</span>
                  <span>•</span>
                  <span>Media Assets</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/10 to-teal-600/5 border border-teal-200/30 dark:border-teal-700/30 overflow-x-auto"
        >
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FolderOpen className="text-teal-600" size={20} />
            <span className="font-medium text-sm">{totalSections} أقسام</span>
          </div>
          <div className="w-px h-8 bg-teal-200/50 dark:bg-teal-700/50" />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <ImageIcon className="text-teal-600" size={20} />
            <span className="font-medium text-sm">{totalImages} صور</span>
          </div>
          <div className="w-px h-8 bg-teal-200/50 dark:bg-teal-700/50" />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <Video className="text-teal-600" size={20} />
            <span className="font-medium text-sm">{totalVideos} فيديوهات</span>
          </div>
          <div className="w-px h-8 bg-teal-200/50 dark:bg-teal-700/50" />
          <div className="flex items-center gap-2 whitespace-nowrap">
            <FileText className="text-teal-600" size={20} />
            <span className="font-medium text-sm">{totalPDFs} PDFs</span>
          </div>
        </motion.div>

        <div className="space-y-4">
          {mediaData.map((section) => (
            <MediaSection
              key={section.id}
              section={section}
              isOpen={openSections[section.id] || false}
              onToggle={() => toggleSection(section.id)}
              openSubsections={openSubsections}
              onToggleSubsection={toggleSubsection}
              hoveredItem={hoveredItem}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        {/* Empty state */}
        <AnimatePresence>
          {mediaData.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="w-24 h-24 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center mb-4">
                <FolderOpen size={48} className="text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">لا توجد عناصر</h3>
              <p className="text-muted-foreground max-w-md">
                لم يتم العثور على أي عناصر في مكتبة الميديا. يرجى إضافة بعض المحتوى.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  export default MediaLibrarySection;
