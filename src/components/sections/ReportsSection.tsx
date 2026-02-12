 import { useState } from "react";
 import { motion } from "framer-motion";
 import { FileText, Download, Eye, Calendar } from "lucide-react";
 import MediaModal, { MediaItem } from "../MediaModal";

 /*
  * =============================================
  * REPORTS DATA
  * =============================================
  * 
  * HOW TO EDIT:
  * Add or modify reports in the reports array below.
  * Each report needs: id, title, description, platform, period, pdfUrl, previewImage
  */
  
 interface Report {
   id: string;
   title: string;
   description: string;
   platform: string;
   period: string;
   pdfUrl: string;
   previewImage: string;
 }
  
 // ============ START: REPORTS DATA ============
   
 const reports: Report[] = [
   {
     id: "tiktok-report",
     title: "تقرير تيك توك",
     description: "تحليل شامل لأداء المحتوى على تيك توك مع إحصائيات التفاعل والوصول",
     platform: "TikTok",
     period: "2025",
     pdfUrl: "/Reports/TIKTOK Report.pdf",
     previewImage: "/Reports/Tiktok.png",
   },
   {
     id: "instagram-report",
     title: "تقرير إنستغرام",
     description: "مراجعة أداء الحسابات المُدارة على إنستغرام مع تحليل أفضل المنشورات",
     platform: "Instagram",
     period: "2025",
     pdfUrl: "/Reports/Instagram_Report.pdf",
     previewImage: "/Reports/Instagram.jpg",
   },
 ];

 // Convert reports to MediaItem format for modal
 const reportItems: MediaItem[] = reports.map(report => ({
   id: report.id,
   type: "pdf" as const,
   src: report.pdfUrl,
   thumbnail: report.previewImage,
   title: report.title,
   description: report.description,
 }));

   
 // ============ END: REPORTS DATA ============
   
 const ReportsSection = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);

   const openReport = (index: number) => {
     setCurrentIndex(index);
     setIsModalOpen(true);
   };

   return (
     <div>
       <div className="mb-10 group">
          {/* العنوان الصغير الملون اللي شفناه في الصور */}
          <div className="flex items-center gap-2 mb-2">
            <div className="h-[2px] w-8 bg-teal-500 rounded-full transition-all group-hover:w-12" />
            <span className="text-[10px] font-black text-teal-600 uppercase tracking-widest">Analytics Insights</span>
          </div>

          {/* النص بتاعك بتنسيق "نظيف" جداً */}
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl border-r-2 border-teal-500/20 pr-4">
            تقارير الأداء الشاملة لمنصات <span className="text-slate-900 dark:text-white font-bold">التواصل الاجتماعي</span> المختلفة.
          </p>
        </div>
 
       <div className="grid md:grid-cols-2 gap-6">
         {reports.map((report, index) => (
           <motion.div
             key={report.id}
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.4, delay: index * 0.1 }}
             className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all hover:shadow-lg group cursor-pointer"
             onClick={() => openReport(index)}
           >
             {/* Preview Image */}
             <div className="relative aspect-[16/10] overflow-hidden bg-muted">
               <img
                 src={report.previewImage}
                 alt={report.title}
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
               <div className="absolute top-4 right-4">
                 <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
                   {report.platform}
                 </span>
               </div>
               <div className="absolute bottom-4 right-4 flex items-center gap-2 text-primary-foreground">
                 <FileText size={20} />
                 <span className="text-sm font-medium">PDF</span>
               </div>
               {/* Play icon overlay */}
               <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="p-4 rounded-full bg-white/90 backdrop-blur-sm">
                   <Eye size={32} className="text-foreground" />
                 </div>
               </div>
             </div>
 
             {/* Content */}
             <div className="p-5">
               <h3 className="font-semibold text-foreground mb-2">{report.title}</h3>
               <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                 {report.description}
               </p>
 
               <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                 <Calendar size={14} />
                 <span>{report.period}</span>
               </div>
 
               {/* Actions */}
               <div className="flex gap-3">
                 <motion.button
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={(e) => {
                     e.stopPropagation();
                     openReport(index);
                   }}
                   className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium transition-colors hover:bg-primary/90"
                 >
                   <Eye size={16} />
                   <span>معاينة</span>
                 </motion.button>
                 <motion.a
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                   href={report.pdfUrl}
                   download
                   className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
                   onClick={(e) => e.stopPropagation()}
                 >
                   <Download size={16} />
                 </motion.a>
               </div>
             </div>
           </motion.div>
         ))}
       </div>

       {/* PDF Modal */}
       <MediaModal
         isOpen={isModalOpen}
         onClose={() => setIsModalOpen(false)}
         items={reportItems}
         currentIndex={currentIndex}
         onNavigate={setCurrentIndex}
       />
     </div>
   );
 };
  
 export default ReportsSection;
