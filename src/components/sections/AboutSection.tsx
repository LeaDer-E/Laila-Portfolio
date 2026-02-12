import { motion } from "framer-motion";
import { Linkedin, Mail, Award, Briefcase, GraduationCap, Target, Quote } from "lucide-react";

const AboutSection = () => {
  const name = "ليلى باعطية";
  const headline = "مدير محتوى وخبير تواصل إعلامي — 5 سنوات خبرة";
  const bio = [
    "أخصائية تواصل اجتماعي وتنسيق إعلامي متخصصة في بناء الجسور بين الجمهور والرسائل الاستراتيجية. أعتقد أن الإعلام ليس مجرد محتوى، بل هو صناعة تأثير حقيقي.",
    "أتخصص في تحويل الرؤى والأفكار إلى محتوى مرئي جذاب يحقق الأهداف التسويقية ويبني حضوراً رقمياً مؤثراً. أجمع بين الإبداع والتحليل لتقديم حلول إعلامية متكاملة.",
  ];

  const skills = [
    { icon: Target, label: "استراتيجية المحتوى", description: "تخطيط وتنفيذ استراتيجيات محتوى فعالة" },
    { icon: Briefcase, label: "إدارة المشاريع", description: "قيادة فرق العمل وإدارة المشاريع الإعلامية" },
    { icon: GraduationCap, label: "التدريب والتطوير", description: "تدريب الفرق على أفضل الممارسات" },
    { icon: Award, label: "الإنتاج الإبداعي", description: "إنتاج محتوى مرئي عالي الجودة" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Main Content Grid */}
      <div className="grid md:grid-cols-5 gap-10 lg:gap-16 items-start">
        {/* Image Section - Right on desktop (40%) */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="md:col-span-2 relative"
        >
          {/* Decorative elements */}
          <motion.div 
            className="absolute -bottom-6 -left-6 w-32 h-32 rounded-2xl -z-10"
            style={{ background: 'hsl(var(--primary) / 0.1)' }}
            animate={{ rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div 
            className="absolute -top-4 -right-4 w-20 h-20 rounded-xl -z-10"
            style={{ background: 'hsl(var(--primary) / 0.15)' }}
            animate={{ rotate: [0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          {/* Glow effect */}
          <div 
            className="absolute inset-0 -z-20 blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, hsl(var(--primary)), transparent 70%)' }}
          />

          {/* Image Container */}
          <motion.div
            whileHover={{ scale: 1.02, rotate: 0 }}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden rotate-2"
            style={{
              boxShadow: '0 25px 60px hsl(var(--primary) / 0.2)',
            }}
          >
            {/* Border gradient */}
            <div 
              className="absolute inset-0 rounded-3xl p-[2px]"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), transparent, hsl(var(--primary) / 0.3))',
              }}
            >
              <div className="w-full h-full rounded-3xl overflow-hidden bg-card">
                <img
                  src="https://media.licdn.com/dms/image/v2/D4D03AQGgmA40R30jsw/profile-displayphoto-scale_200_200/B4DZrKNuQgJcAY-/0/1764329193678?e=2147483647&v=beta&t=x6irEvcRvf6NeRKd5MYAmN-o69EvD_kfVzhhrgkhQ4M"
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            </div>

            {/* Overlay gradient */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, hsl(var(--background) / 0.5), transparent 50%)',
              }}
            />
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-4 right-4 px-5 py-3 rounded-2xl glass"
            style={{
              boxShadow: '0 10px 30px hsl(var(--primary) / 0.2)',
            }}
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(38 90% 45%))' }}
              >
                <Award className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-foreground">+5 سنوات</div>
                <div className="text-xs text-muted-foreground">خبرة مهنية</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Content Section - Left on desktop (60%) */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:col-span-3 flex flex-col justify-start"
        >
          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mb-6 relative"
          >
            <Quote className="w-10 h-10 text-primary/30 absolute -top-2 -right-2" />
            <p className="text-lg italic text-muted-foreground pr-8">
              "الإعلام ليس مجرد محتوى، بل هو صناعة تأثير حقيقي"
            </p>
          </motion.div>

          {/* Name */}
          <h1 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            <span className="text-gradient-gold">{name}</span>
          </h1>

          {/* Headline */}
          <p className="text-xl font-semibold text-primary mb-8">
            {headline}
          </p>

          {/* Bio paragraphs */}
          <div className="space-y-5 mb-10">
            {bio.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="text-lg text-muted-foreground leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* LinkedIn Button */}
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="https://www.linkedin.com/in/layla-baatyah"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(38 90% 45%))',
                color: 'hsl(var(--primary-foreground))',
                boxShadow: '0 8px 30px hsl(var(--primary) / 0.4)',
              }}
            >
              <Linkedin size={22} />
              <span>LinkedIn</span>
            </motion.a>

            {/* Contact Button */}
            <motion.a
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              href="mailto:layla.aabs@gmail.com"
              className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-500"
              style={{
                background: 'hsl(var(--secondary))',
                border: '1px solid hsl(var(--primary) / 0.3)',
                color: 'hsl(var(--foreground))',
              }}
            >
              <Mail size={22} />
              <span>تواصل معي</span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Skills Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="p-6 rounded-2xl text-center relative overflow-hidden group"
            style={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
            }}
          >
            {/* Top accent line */}
            <div 
              className="absolute top-0 left-0 right-0 h-1 transition-all duration-500 group-hover:h-1.5"
              style={{
                background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(38 90% 70%))',
              }}
            />
            
            <motion.div
              className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center"
              style={{ background: 'hsl(var(--primary) / 0.1)' }}
              whileHover={{ rotate: 10 }}
            >
              <skill.icon className="w-7 h-7 text-primary" />
            </motion.div>
            <h3 className="font-bold text-foreground mb-2">{skill.label}</h3>
            <p className="text-sm text-muted-foreground">{skill.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
