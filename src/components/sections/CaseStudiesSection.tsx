import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
  
  /*
   * =============================================
   * CASE STUDIES DATA
   * =============================================
   * 
   * HOW TO EDIT:
   * Simply modify the caseStudies array below.
   * Each case study needs: id, client, projectTitle, image, challenge, solution, result
   */

  interface CaseStudy {
    id: string;
    client: string;
    projectTitle: string;
    image: string;
    challenge: string;
    solution: string;
    result: string;
  }

  // ============ START: CASE STUDIES DATA ============

  const caseStudies: CaseStudy[] = [
    {
      id: "case-1",
      client: "شركة الاتصالات السعودية",
      projectTitle: "حملة التفاعل الرقمي",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      challenge:
        "انخفاض التفاعل على منصات التواصل الاجتماعي وضعف الوصول للفئة الشبابية بنسبة 40%",
      solution:
        "تطوير استراتيجية محتوى جديدة تركز على الفيديوهات القصيرة والمحتوى التفاعلي مع إطلاق حملة مؤثرين محترفين",
      result:
        "نجحنا في زيادة التفاعل بنسبة 150% وتحسين الوصول للفئة العمرية 18-35 عاماً بنسبة 200%",
    },
    {
      id: "case-2",
      client: "مؤسسة خيرية",
      projectTitle: "حملة رمضان الإنسانية",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800",
      challenge:
        "صعوبة في جمع التبرعات وإيصال رسالة المؤسسة للمتبرعين المحتملين بشكل فعال",
      solution:
        "إنشاء محتوى قصصي مؤثر وحملة توعوية رقمية متكاملة مع التركيز على شهادات المستفيدين الحقيقية",
      result:
        "تضاعفت التبرعات في رمضان بنسبة 200% وزاد الوعي بالمؤسسة بشكل ملحوظ",
    },
    {
      id: "case-3",
      client: "مطعم فاخر",
      projectTitle: "إطلاق مطعم جديد",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800",
      challenge:
        "افتتاح جديد مع حاجة لبناء قاعدة عملاء وخلق ضجة إعلامية وتسويقية",
      solution:
        "تصوير احترافي للأطباق والديكور، تغطية حدث الافتتاح، وإدارة حملة إعلانية مستهدفة",
      result:
        "حققنا حجوزات كاملة خلال الشهر الأول وترند على تويتر مع 25+ تغطية إعلامية",
    },
    {
      id: "case-4",
      client: "جامعة حكومية",
      projectTitle: "إعادة هيكلة الصورة الرقمية",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
      challenge:
        "تحسين صورة الجامعة الرقمية واستقطاب طلاب جدد من خلال المنصات الرقمية",
      solution:
        "إعادة هيكلة المحتوى الرقمي وإنتاج سلسلة وثائقية عن الحياة الجامعية والإنجازات الأكاديمية",
      result:
        "ارتفاع طلبات القبول بنسبة 35% وتحسن ترتيب الجامعة في التصنيفات العالمية",
    },
  ];

  // ============ END: CASE STUDIES DATA ============

  // ============ START: CASE STUDIES SECTION ============

const CaseStudiesSection = () => {
  return (
    <div className="relative space-y-12 py-10">
      {/* إضافة الخلفية الملونة الناعمة (Ambient Background) 
          هذه الطبقة ستعطي روحاً للألوان خلف الكروت دون تشتيت العين
      */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] left-[-5%] w-[30%] h-[30%] bg-red-500/5 blur-[120px] rounded-full" />
        <div className="absolute top-[40%] right-[-5%] w-[30%] h-[35%] bg-yellow-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[10%] w-[25%] h-[25%] bg-green-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="mb-16 relative">
      {/* الخط الملون الخلفي - لمسة فنية ناعمة */}
      <div className="absolute -top-4 right-0 w-24 h-1 bg-gradient-to-l from-red-500 via-yellow-400 to-green-500 rounded-full opacity-50" />

      <div className="grid md:grid-cols-2 gap-8 items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-[1.15]">
            مشاريع صنعت <br />
            <span className="relative">
              الفارق الحقيقي
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-green-500/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
              </svg>
            </span>
          </h2>
        </div>

        <div className="flex flex-wrap gap-6 border-r-2 border-slate-100 dark:border-slate-800 pr-6">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-red-500">4+</span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">مشروع مكتمل</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-yellow-500">100%</span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">تركيز على النتائج</span>
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-green-500">ROI</span>
            <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-bold">عائد ملموس</span>
          </div>
        </div>
      </div>

      <p className="mt-8 text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
        ليست مجرد تصميمات ، بل حلول إستراتيجية ساهمت في نمو الأعمال وتحقيق أرقام قياسية في التفاعل والوصل.
      </p>
    </div>

      {caseStudies.map((study, index) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`grid md:grid-cols-5 gap-8 items-stretch ${
            index % 2 === 0 ? '' : 'md:flex-row-reverse'
          }`}
        >
          {/* Image Section */}
          <div className={`md:col-span-2 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/20"
            >
              <img
                src={study.image}
                alt={study.projectTitle}
                className="w-full h-full object-cover rounded-2xl transition-transform duration-700 hover:scale-110"
              />
            </motion.div>
          </div>

          {/* Content Section */}
          <div className={`md:col-span-3 flex flex-col justify-between ${index % 2 === 1 ? 'md:order-1' : ''}`}>
            
            {/* Header Card - Modern Highlight */}
            <div className="group relative mb-6 p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-white dark:border-slate-800 shadow-sm transition-all duration-300 hover:shadow-xl overflow-hidden">
              
              {/* الشريط العلوي الملون - الهوية البصرية */}
              <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-red-500 via-yellow-400 to-green-500" />

              {/* تأثير التوهج عند التحويم */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-100 via-yellow-50 to-green-100 dark:from-red-900/10 dark:via-yellow-900/10 dark:to-green-900/10 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em]">
                    {study.client}
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  {study.projectTitle}
                </h3>
              </div>

              {/* الرقم المائي الخلفي */}
              <div className="absolute bottom-2 right-4 opacity-[0.04] dark:opacity-[0.08] pointer-events-none select-none">
                <span className="text-7xl font-black italic">0{index + 1}</span>
              </div>
            </div>

            {/* Details Sections */}
            <div className="space-y-4 mb-6 flex-grow">
              {/* Challenge - Red */}
              <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-900/10 border-r-4 border-red-400 transition-colors hover:bg-red-50/60">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-red-600 uppercase">التحدي</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mr-2">
                  {study.challenge}
                </p>
              </div>

              {/* Solution - Amber */}
              <div className="p-4 rounded-xl bg-amber-50/40 dark:bg-amber-900/10 border-r-4 border-amber-400 transition-colors hover:bg-amber-50/60">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-xs font-bold text-amber-600 uppercase">الحل</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mr-2">
                  {study.solution}
                </p>
              </div>

              {/* Result - Green */}
              <motion.div
                whileHover={{ x: -5 }}
                className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-900/10 border-r-4 border-emerald-400 transition-colors hover:bg-emerald-50/60"
              >
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={14} className="text-emerald-600" />
                  <span className="text-xs font-bold text-emerald-600 uppercase">النتيجة</span>
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed mr-2">
                  {study.result}
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

  export default CaseStudiesSection;
