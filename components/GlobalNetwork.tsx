"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function GlobalNetwork() {
  const { t } = useLanguage();
  const nodes = (t: any) => [
    { name: t('network.city.delhi'), top: "28%", left: "41%", color: "var(--color-glow-blue)" },
    { name: t('network.city.mumbai'), top: "56%", left: "32%", color: "var(--color-glow-cyan)" },
    { name: t('network.city.bangalore'), top: "74%", left: "42%", color: "var(--color-glow-purple)" },
    { name: t('network.city.hyderabad'), top: "67%", left: "44%", color: "var(--color-glow-blue)" },
    { name: t('network.city.chennai'), top: "78%", left: "47%", color: "var(--color-glow-cyan)" },
    { name: t('network.city.kolkata'), top: "50%", left: "61%", color: "var(--color-glow-purple)" },
    { name: t('network.city.ahmedabad'), top: "50%", left: "31%", color: "var(--color-glow-blue)" },
    { name: t('network.city.kochi'), top: "84%", left: "39%", color: "var(--color-glow-cyan)" },
  ];

  return (
    <section className="py-40 relative overflow-hidden bg-transparent">
      
      {/* Global Standard Glass Grid Background - Harmonized (64px) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Background Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-20 relative"
        >
          <h2 className="text-6xl md:text-8xl font-heading tracking-tight text-white mb-6" dangerouslySetInnerHTML={{ __html: t('network.title') }} />
          <div className="glass-panel px-8 py-4 rounded-2xl inline-block">
            <p className="text-xl text-white/80 font-light leading-relaxed">
              <span className="text-white font-medium mr-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{t('network.chip')}</span>
               {t('network.desc')}
            </p>
          </div>
        </motion.div>

        {/* Abstract Map Area */}
        <div className="relative w-full max-w-4xl mx-auto h-[500px] md:h-[700px] rounded-[3rem] border border-white/10 bg-[#030816]/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
          
          {/* Gentle Inner Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

          {/* Detailed Visual India Map */}
          <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
            <img 
              src="/india-map-visual.png" 
              alt="India Network Map" 
              className="w-full h-full object-contain opacity-40 mix-blend-screen scale-105"
            />
          </div>

          {/* Animated Glow Nodes */}
          {nodes(t).map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 + 0.5 }}
              style={{ top: node.top, left: node.left }}
              className="absolute z-10 flex items-center justify-center group cursor-pointer"
            >
              <div 
                className="absolute inset-0 w-12 h-12 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" 
                style={{ backgroundColor: node.color, filter: 'blur(12px)', transform: 'translate(-50%, -50%)' }}
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                className="absolute w-10 h-10 rounded-full border border-white/20"
                style={{ transform: 'translate(-50%, -50%)', borderColor: node.color }}
              />
              <div 
                className="w-3 h-3 rounded-full relative z-10" 
                style={{ backgroundColor: node.color, boxShadow: `0 0 15px 2px ${node.color}`, transform: 'translate(-50%, -50%)' }}
              />
              <div className="absolute top-5 left-0 whitespace-nowrap text-[10px] font-medium text-white/50 group-hover:text-white transition-colors uppercase tracking-[0.2em] hidden md:block drop-shadow-lg" style={{ textShadow: `0 0 10px ${node.color}` }}>
                {node.name}
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
