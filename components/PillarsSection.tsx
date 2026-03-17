"use client";

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const pillars = [
  {
    id: "connect",
    titleKey: "platform.pillar1.title",
    subtitleKey: "pillars.connect.subtitle",
    descKey: "platform.pillar1.subtitle",
    hoverKey: "platform.pillar1.body",
    ctaKey: "platform.viewMore",
    href: "#connect",
    accentColor: "#2F80ED",
    svg: (index: number, hoveredIndex: number | null) => (
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
        <motion.circle 
          cx="200" cy="200" r="100" 
          stroke="#2F80ED" strokeWidth="1" fill="none" 
          strokeDasharray="5 5"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        {[0, 60, 120, 180, 240, 300].map((angle, i) => {
          const cx = 200 + 100 * Math.cos((angle * Math.PI) / 180);
          const cy = 200 + 100 * Math.sin((angle * Math.PI) / 180);
          return (
            <motion.circle
              key={i}
              cx={Number(cx.toFixed(3))}
              cy={Number(cy.toFixed(3))}
              r="4"
              fill="#2F80ED"
              animate={{ 
                scale: hoveredIndex === index ? [1, 1.5, 1] : 1,
                opacity: hoveredIndex === index ? [0.5, 1, 0.5] : 0.5
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          );
        })}
      </svg>
    )
  },
  {
    id: "repair",
    titleKey: "platform.pillar2.title",
    subtitleKey: "pillars.repair.subtitle",
    descKey: "platform.pillar2.subtitle",
    hoverKey: "platform.pillar2.body",
    ctaKey: "platform.viewMore",
    href: "#service-pro",
    accentColor: "#F2994A",
    svg: (index: number, hoveredIndex: number | null) => (
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
        <motion.path 
          d="M100 200 L300 200 M200 100 L200 300" 
          stroke="#F2994A" strokeWidth="1"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.rect 
          x="150" y="150" width="100" height="100" 
          stroke="#F2994A" strokeWidth="1" fill="none"
          animate={{ rotate: hoveredIndex === index ? 90 : 0 }}
          transition={{ duration: 1 }}
        />
        <circle cx="200" cy="200" r="2" fill="#F2994A" className="animate-pulse" />
      </svg>
    )
  },
  {
    id: "schemic",
    titleKey: "platform.pillar3.title",
    subtitleKey: "pillars.schemic.subtitle",
    descKey: "platform.pillar3.subtitle",
    hoverKey: "platform.pillar3.body",
    ctaKey: "platform.viewMore",
    href: "#schemic-ai",
    accentColor: "#00F0FF",
    svg: (index: number, hoveredIndex: number | null) => (
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
        <motion.path 
          d="M150 150 Q200 100 250 150 T350 150" 
          stroke="#00F0FF" strokeWidth="1" fill="none"
          animate={{ d: hoveredIndex === index ? "M50 200 Q200 50 350 200" : "M150 150 Q200 100 250 150 T350 150" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path 
          d="M150 250 Q200 300 250 250 T350 250" 
          stroke="#00F0FF" strokeWidth="1" fill="none"
          animate={{ d: hoveredIndex === index ? "M50 200 Q200 350 350 200" : "M150 250 Q200 300 250 250 T350 250" }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        />
      </svg>
    )
  }
];

function TiltCard({ pillar, index, hoveredIndex, setHoveredIndex, isMobile }: any) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
  // For spotlight effect
  const spotlightX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const spotlightY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / rect.width - 0.5;
      const yPct = mouseY / rect.height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    x.set(0);
    y.set(0);
  };


  const handleScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = pillar.href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', pillar.href);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX: isMobile ? 0 : rotateX,
        rotateY: isMobile ? 0 : rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-[400px] md:h-[500px] w-full group cursor-pointer"
    >
      <a 
        href={pillar.href} 
        onClick={handleScroll}
        className="block h-full w-full"
      >
        <div 
          className="relative h-full w-full rounded-[32px] border border-white/10 bg-[#0A121E]/60 backdrop-blur-3xl p-10 overflow-hidden transition-all duration-500 group-hover:border-white/30 group-hover:bg-[#0D1826]/80 flex flex-col justify-end"
          style={{
            boxShadow: hoveredIndex === index ? `0 20px 80px -20px ${pillar.accentColor}44` : 'none',
          }}
        >
          {/* SVG Background Layer */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            {pillar.svg(index, hoveredIndex)}
          </div>

          {/* Fixed Light Leak / Spotlight Effect */}
          <motion.div 
            className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
            style={{
              background: useTransform(
                [spotlightX, spotlightY],
                ([latestX, latestY]) => `radial-gradient(circle at ${latestX}% ${latestY}%, ${pillar.accentColor}55 0%, transparent 70%)`
              )
            }}
          />

          <div className="relative z-10 space-y-4">
            <motion.div
              animate={{ y: hoveredIndex === index ? -10 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <span className="text-[10px] font-bold tracking-[0.4em] text-white/30 uppercase mb-2 block">
                {t(pillar.subtitleKey)}
              </span>
              <h3 className="text-3xl md:text-4xl font-heading font-medium tracking-tight text-white mb-2 leading-none uppercase">
                {pillar.id === "schemic" ? (
                   <>SCHEMIC <span style={{ color: pillar.accentColor }}>AI</span></>
                ) : t(pillar.titleKey)}
              </h3>
            </motion.div>

            <div className="h-[2px] w-12 bg-white/10 group-hover:w-24 group-hover:bg-white/40 transition-all duration-500" />

            <AnimatePresence>
              {(hoveredIndex === index || isMobile) && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: 10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: 10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="space-y-4 overflow-hidden"
                >
                  <p className="text-[#A8B3C7] text-lg font-light leading-snug">
                    {t(pillar.descKey)}
                  </p>
                  <p className="text-[#A8B3C7]/50 text-xs font-light leading-relaxed max-w-[240px]">
                    {t(pillar.hoverKey)}
                  </p>
                  <div className="pt-2">
                    <span 
                      className="inline-flex items-center gap-2 text-white text-xs font-bold tracking-[0.2em] uppercase transition-all hover:gap-4"
                      style={{ color: pillar.accentColor }}
                    >
                      {t(pillar.ctaKey)}
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Edge Highlight Glow */}
          <motion.div
            animate={{ 
              opacity: (hoveredIndex === index) ? 1 : 0,
            }}
            className="absolute inset-0 rounded-[32px] border-2 border-transparent transition-opacity duration-500 pointer-events-none"
            style={{
              background: `linear-gradient(135deg, ${pillar.accentColor}66 0%, transparent 40%, transparent 60%, ${pillar.accentColor}66 100%) border-box`,
              WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",
            }}
          />
          
          {/* Internal Top Light Reflection */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </div>
      </a>
    </motion.div>
  );
}

export default function PillarsSection() {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden bg-transparent">
      
      {/* Global Standard Glass Grid Background - Matched to other sections (64px) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Intensified Background Ambience */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Background Side Glow - Matching "others" style */}
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] -translate-y-1/2 -translate-x-1/4" />
        
        {/* Center Soft Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.12)_0%,transparent_70%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="mb-32 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-8"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#2F80ED] shadow-[0_0_10px_#2F80ED] animate-pulse" />
            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">{t("pillars.chip")}</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-heading tracking-tighter text-white mb-10 leading-[0.95]"
          >
            {t("pillars.title").split("<br/>")[0]} <br />
            <span className="text-white/20">
              {t("pillars.title").includes("FUTURE") ? (
                <>
                  <span className="bg-gradient-to-r from-[#2F80ED] to-[#00F0FF] bg-clip-text text-transparent opacity-100 drop-shadow-[0_0_30px_rgba(47,128,237,0.5)]">FUTURE</span> {t("pillars.title").split("FUTURE")[1]}
                </>
              ) : t("pillars.title").split("<br/>")[1]}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/40 font-light leading-relaxed max-w-2xl"
          >
            {t("pillars.desc")}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-8 perspective-2000">
          {pillars.map((pillar, index) => (
            <TiltCard 
              key={pillar.id} 
              pillar={pillar} 
              index={index} 
              hoveredIndex={hoveredIndex} 
              setHoveredIndex={setHoveredIndex}
              isMobile={isMobile}
            />
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           transition={{ delay: 0.5 }}
           className="mt-40 text-center"
        >
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent mb-12" />
          <p className="text-white/20 text-sm font-light tracking-[0.2em] uppercase">{t("pillars.footer")}</p>
        </motion.div>
      </div>
    </section>
  );
}
