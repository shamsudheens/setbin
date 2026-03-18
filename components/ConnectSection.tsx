"use client";

import { useRef, ReactNode, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ShieldCheck, Package, Activity, ShieldAlert, Network, TrendingDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

function NetworkIcon({ entryProgress }: { entryProgress: MotionValue<number> }) {
  const scale = useTransform(entryProgress, [0.5, 1], [0.5, 1]);
  return (
    <motion.div 
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#030816] border border-[#00F0FF]/50 shadow-[0_0_30px_rgba(0,240,255,0.3)] flex items-center justify-center z-10"
      style={{ scale }}
    >
      <Network className="w-6 h-6 md:w-8 md:h-8 text-white" />
    </motion.div>
  );
}

function StockBar({ item, i, entryProgress }: { item: string, i: number, entryProgress: MotionValue<number> }) {
  const width = useTransform(
    entryProgress, 
    [i * 0.2, Math.min(1, 0.4 + i * 0.2)], 
    ["0%", ['40%', '80%', '60%'][i]]
  );

  return (
    <div className="bg-white/5 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between border border-white/5 gap-2 w-full">
      <div className="font-mono text-xs md:text-sm text-white/80 shrink-0">{item}</div>
      <div className="flex items-center gap-3 w-full sm:w-auto overflow-hidden">
        <div className="flex-1 sm:w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-[#8A2BE2] to-[#00F0FF]"
            style={{ width }}
          />
        </div>
        <span className="text-[10px] md:text-xs text-[#00F0FF] font-mono shrink-0">In Stock</span>
      </div>
    </div>
  );
}

function PriceGraph({ entryProgress }: { entryProgress: MotionValue<number> }) {
  const height = useTransform(entryProgress, [0, 1], ["0%", "45%"]);
  return (
    <motion.div 
      className="w-full bg-gradient-to-t from-[#00F0FF]/20 to-[#2F80ED]/50 border-t border-[#00F0FF] rounded-t-lg shadow-[0_0_30px_rgba(0,240,255,0.2)]"
      style={{ height }}
    />
  );
}

function ShieldIcon({ entryProgress }: { entryProgress: MotionValue<number> }) {
  const pathLength1 = useTransform(entryProgress, [0.5, 1], [0, 1]);
  const opacity1 = useTransform(entryProgress, [0.5, 0.6], [0, 1]);
  return (
    <svg viewBox="0 0 24 24" className="w-32 h-32 md:w-40 md:h-40 text-green-400 relative z-10 drop-shadow-[0_0_20px_rgba(74,222,128,0.5)]">
      <motion.path 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="1" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
        style={{ pathLength: entryProgress }}
      />
      <motion.path 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9 12l2 2 4-4"
        style={{ 
          pathLength: pathLength1,
          opacity: opacity1
        }}
      />
    </svg>
  );
}

interface StoryCardProps {
  children: (entryProgress: MotionValue<number>) => ReactNode;
  index: number;
  total: number;
  accentColor: string;
}

function StoryCard({ children, index, total, accentColor }: StoryCardProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  // Calculate relative top spacing for each stacked card
  // Navbar is ~80px. We start at 100px. Each card adds 16px to create the physical stack step effect.
  const stickTopNum = 100 + index * 16; 
  
  // Scroll tracking using an invisible anchor instead of the sticky card avoids infinite layout feedback loops causing scroll lag!
  // We ONLY want this card to shrink/dim when the NEXT card is sliding up to cover it.
  // The next card arrives from 100vh -> 15vh when this anchor moves from -50vh -> -140vh.
  const { scrollYProgress: shrinkRaw } = useScroll({
    target: anchorRef,
    offset: ["start -50vh", "start -140vh"] 
  });
  
  // Spring engine for buttery smooth scroll
  const shrinkProgress = useSpring(shrinkRaw, { stiffness: 60, damping: 20 });
  
  const { scrollYProgress: entryRaw } = useScroll({
    target: anchorRef,
    offset: ["start 95%", `start ${stickTopNum}px`]
  });
  const entryProgress = useSpring(entryRaw, { stiffness: 60, damping: 20 });

  // Shrink, dim, and blur the card backward as it gets pushed into the background stack.
  const scale = useTransform(shrinkProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(shrinkProgress, [0, 1], [1, 0.4]);
  const cardBlur = useTransform(shrinkProgress, [0, 1], ["blur(0px)", "blur(8px)"]);

  const isLast = index === total - 1;

  return (
    <>
      <div ref={anchorRef} className="w-full h-px -mt-px opacity-0 pointer-events-none" aria-hidden="true" />
      <div
        className={`w-full flex justify-center sticky`}
        style={{
          top: `${stickTopNum}px`,
          // Mobile cards are slightly shorter to fit content better
          height: isMobile ? '80vh' : '85vh', 
          // Generous margin gives the user a long "pause" to read the card before the next card covers it
          marginBottom: isLast ? '0' : '70vh', 
          zIndex: index + 10,
        }}
      >
      <motion.div 
        style={{ 
          scale, 
          opacity,
          filter: cardBlur,
          boxShadow: `0 -20px 40px -10px rgba(0,0,0,0.8), 0 -10px 30px -10px ${accentColor}33`
        }}
        className="w-full max-w-6xl h-full relative p-8 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] origin-top group bg-[#060B14] border border-white/10"
      >
        {/* Cinematic Ambient Glow (Optimized for Safari GPU) */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[300px] pointer-events-none opacity-[0.15]"
          style={{ background: `radial-gradient(ellipse at top, ${accentColor} 0%, transparent 70%)` }}
        />

        {/* --- UNIVERSAL PREMIUM BORDER (Hardware Optimised) --- */}
        <div className="absolute inset-0 rounded-[2rem] md:rounded-[3rem] overflow-hidden pointer-events-none z-10">
           {/* Apple-style precise glass reflection on top edge */}
           <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px" style={{ background: `radial-gradient(circle, ${accentColor} 0%, transparent 100%)` }} />
        </div>
        
        {/* Content Container */}
        <div className="w-full h-full flex flex-col md:flex-row items-center gap-12 relative z-20">
          {children(entryProgress)}
        </div>
      </motion.div>
    </div>
    </>
  );
}

// --- MAIN COMPONENT ---
export default function ConnectSection() {
  const { t } = useLanguage();
  const totalCards = 8;

  return (
    <div id="connect" className="relative bg-transparent text-white scroll-mt-20 pb-0 pt-10">
      
      {/* Background Ambience (Sticky to follow scroll beautifully) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="sticky top-0 w-full h-screen overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
          
          {/* Soft Background Side Glow */}
          <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] -translate-y-1/2 -translate-x-1/4" />
          
          {/* Center Soft Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(47,128,237,0.12)_0%,transparent_70%)]" />
        </div>
      </div>

      <div className="relative z-10 w-full px-4 md:px-8 flex flex-col items-center">
        
        {/* SECTION 1: INTRO */}
        <StoryCard index={0} total={totalCards} accentColor="#2F80ED">
          {() => (
            <div className="text-center w-full max-w-4xl mx-auto flex flex-col justify-center h-full">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-[#2F80ED] uppercase mb-8 self-center">
                {t('connect.story.chip')}
              </span>
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-8 leading-[1.1]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F80ED] to-[#00F0FF]">
                  {t('connect.story.s1.title')}
                </span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto">
                {t('connect.story.s1.desc')}
              </p>
            </div>
          )}
        </StoryCard>

        {/* SECTION 2: PROBLEM (CHAOS) */}
        <StoryCard index={1} total={totalCards} accentColor="#F2994A">
          {() => (
            <>
              <div className="flex-1 space-y-6 md:space-y-8 w-full">
                <span className="text-[#F2994A] font-medium tracking-widest uppercase text-xs md:text-sm flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F2994A] animate-pulse" /> {t('connect.story.s2.tag')}
                </span>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-heading leading-tight">
                  <span className="text-white/40 italic">{t('connect.story.s2.title')}</span>
                </h3>
                <ul className="space-y-3 md:space-y-4 text-base md:text-lg text-white/70 font-light">
                  <li className="flex items-center gap-3"><span className="text-[#F2994A]">✕</span> {t('connect.story.s2.p1')}</li>
                  <li className="flex items-center gap-3"><span className="text-[#F2994A]">✕</span> {t('connect.story.s2.p2')}</li>
                  <li className="flex items-center gap-3"><span className="text-[#F2994A]">✕</span> {t('connect.story.s2.p3')}</li>
                  <li className="flex items-center gap-3"><span className="text-[#F2994A]">✕</span> {t('connect.story.s2.p4')}</li>
                </ul>
              </div>
              
              <div className="flex-1 relative h-[300px] md:h-full w-full glass-panel rounded-3xl overflow-hidden border border-red-500/10">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,153,74,0.1)_0%,transparent_70%)]" />
                 {[
                   { left: '35.2%', top: '69.3%', yParams: [-20, 0], xParams: [5, -5, 5], rotateParams: [10, -10, 10], dur: 4.2 },
                   { left: '13.3%', top: '50.2%', yParams: [-15, 0], xParams: [-10, 10, -10], rotateParams: [-15, 15, -15], dur: 3.8 },
                   { left: '30.2%', top: '16.2%', yParams: [-35, 0], xParams: [15, -15, 15], rotateParams: [20, -20, 20], dur: 4.5 },
                   { left: '73.5%', top: '16.5%', yParams: [-25, 0], xParams: [-8, 8, -8], rotateParams: [-25, 25, -25], dur: 3.2 },
                   { left: '57.1%', top: '20.3%', yParams: [-12, 0], xParams: [12, -12, 12], rotateParams: [12, -12, 12], dur: 4.8 },
                   { left: '21.1%', top: '13.5%', yParams: [-22, 0], xParams: [-15, 15, -15], rotateParams: [-5, 5, -5], dur: 3.5 },
                   { left: '53.7%', top: '19.5%', yParams: [-18, 0], xParams: [8, -8, 8], rotateParams: [8, -8, 8], dur: 4.1 },
                   { left: '55.3%', top: '17.6%', yParams: [-30, 0], xParams: [-12, 12, -12], rotateParams: [-18, 18, -18], dur: 3.9 },
                 ].map((node, i) => (
                   <motion.div
                     key={i}
                     className="absolute w-10 h-10 md:w-12 md:h-12 bg-[#1A2130] border border-white/10 rounded-xl flex items-center justify-center"
                     style={{ left: node.left, top: node.top }}
                     animate={{ y: [0, node.yParams[0], 0], x: [0, node.xParams[0], 0], rotate: [0, node.rotateParams[0], 0] }}
                     transition={{ duration: node.dur, repeat: Infinity, ease: "easeInOut" }}
                   >
                     <ShieldAlert className="w-4 h-4 md:w-5 md:h-5 text-white/30" />
                   </motion.div>
                 ))}
                 
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#1A141A] border border-red-500/30 flex items-center justify-center">
                    <Activity className="w-8 h-8 md:w-10 md:h-10 text-[#F2994A]" />
                 </div>
              </div>
            </>
          )}
        </StoryCard>

        {/* SECTION 3: SOLUTION (STRUCTURE) */}
        <StoryCard index={2} total={totalCards} accentColor="#00F0FF">
          {(entryProgress) => (
            <div className="w-full flex justify-center items-center h-full">
              <div className="text-center w-full max-w-4xl flex flex-col items-center">
                <span className="text-[#00F0FF] font-medium tracking-widest uppercase text-xs md:text-sm mb-4 md:mb-6 block">{t('connect.story.s3.tag')}</span>
                <h3 className="text-4xl md:text-6xl lg:text-7xl font-heading mb-6 md:mb-8">
                  {t('connect.story.s3.title').split(' to ').length === 2 ? (
                    <>{t('connect.story.s3.title').split(' to ')[0]} to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-[#2F80ED]">{t('connect.story.s3.title').split(' to ')[1]}</span></>
                  ) : t('connect.story.s3.title')}
                </h3>
                <p className="text-lg md:text-xl text-white/60 font-light max-w-2xl mx-auto mb-10 md:mb-16">
                  {t('connect.story.s3.desc')}
                </p>
                
                <div className="relative h-[200px] md:h-[300px] w-full max-w-2xl glass-panel rounded-3xl overflow-hidden flex items-center justify-center">
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 600 300">
                     <defs>
                        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#2F80ED" stopOpacity="0.8" />
                          <stop offset="100%" stopColor="#00F0FF" stopOpacity="0.8" />
                        </linearGradient>
                     </defs>
                     <motion.path 
                       d="M100 150 L300 150 L500 150 M300 50 L300 150 M300 250 L300 150" 
                       stroke="url(#lineGrad)" 
                       strokeWidth="2" 
                       fill="none" 
                       style={{ pathLength: entryProgress }}
                     />
                   </svg>
                   <div className="absolute left-[calc(16.6%-12px)] top-[calc(50%-12px)] w-6 h-6 rounded-full bg-[#2F80ED] shadow-[0_0_20px_#2F80ED]" />
                   <div className="absolute right-[calc(16.6%-12px)] top-[calc(50%-12px)] w-6 h-6 rounded-full bg-[#00F0FF] shadow-[0_0_20px_#00F0FF]" />
                   <div className="absolute left-[calc(50%-16px)] top-[calc(16.6%-16px)] w-8 h-8 rounded-full bg-[#8A2BE2] shadow-[0_0_20px_#8A2BE2]" />
                   <div className="absolute left-[calc(50%-16px)] bottom-[calc(16.6%-16px)] w-8 h-8 rounded-full bg-[#8A2BE2] shadow-[0_0_20px_#8A2BE2]" />
                   
                   <NetworkIcon entryProgress={entryProgress} />
                </div>
              </div>
            </div>
          )}
        </StoryCard>

        {/* SECTION 4: FEATURE 1 (DIRECT SUPPLIER ACCESS) */}
        <StoryCard index={3} total={totalCards} accentColor="#2F80ED">
          {() => (
            <>
              <div className="flex-1 space-y-4 md:space-y-6 w-full order-2 md:order-1 relative z-10 w-full">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#2F80ED]/10 border border-[#2F80ED]/30 flex items-center justify-center mb-4 md:mb-6">
                    <Network className="w-5 h-5 md:w-6 md:h-6 text-[#2F80ED]" />
                 </div>
                <h3 className="text-3xl md:text-5xl font-heading">{t('connect.story.s4.title')}</h3>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  {t('connect.story.s4.desc')}
                </p>
              </div>
              
              <div className="flex-1 w-full max-w-sm md:max-w-md aspect-square glass-panel rounded-[2rem] relative flex items-center justify-center overflow-hidden order-1 md:order-2 w-full">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(47,128,237,0.1)_0%,transparent_60%)]" />
                <div className="relative w-full h-full p-8">
                   <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <motion.path 
                        d="M20 80 L50 40 L80 60 M50 40 L60 20" 
                        stroke="rgba(47,128,237,0.3)" 
                        strokeWidth="1" 
                        fill="none" 
                        strokeDasharray="2 2"
                        animate={{ strokeDashoffset: [20, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                   </svg>
                   {[
                     {top:'80%', left:'20%'}, {top:'40%', left:'50%'}, 
                     {top:'60%', left:'80%'}, {top:'20%', left:'60%'}
                   ].map((pos, i) => (
                      <div key={i} className="absolute w-2 h-2 md:w-3 md:h-3 bg-[#2F80ED] rounded-full shadow-[0_0_15px_#2F80ED]" style={pos} />
                   ))}
                </div>
              </div>
            </>
          )}
        </StoryCard>

        {/* SECTION 5: FEATURE 2 (REAL-TIME INVENTORY) */}
        <StoryCard index={4} total={totalCards} accentColor="#8A2BE2">
          {(entryProgress) => (
            <>
              <div className="flex-1 space-y-4 md:space-y-6 w-full">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#8A2BE2]/10 border border-[#8A2BE2]/30 flex items-center justify-center mb-4 md:mb-6">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-[#8A2BE2]" />
                 </div>
                <h3 className="text-3xl md:text-5xl font-heading">{t('connect.story.s5.title')}</h3>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  {t('connect.story.s5.desc')}
                </p>
              </div>
              
              <div className="flex-1 w-full glass-panel rounded-[2rem] p-6 md:p-8 border border-white/10 relative overflow-hidden h-[300px] md:h-auto flex flex-col justify-center w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A2BE2]/20 blur-[50px] rounded-full" />
                <div className="space-y-3 md:space-y-4 relative z-10 w-full">
                  <div className="text-[10px] md:text-xs uppercase tracking-widest text-[#8A2BE2] font-semibold mb-4 md:mb-6">{t('connect.story.s5.feed')}</div>
                  
                  {[t('connect.story.s5.p1'), t('connect.story.s5.p2'), t('connect.story.s5.p3')].map((item, i) => (
                    <StockBar key={i} item={item} i={i} entryProgress={entryProgress} />
                  ))}
                </div>
              </div>
            </>
          )}
        </StoryCard>

        {/* SECTION 6: FEATURE 3 (WHOLESALE PRICING) */}
        <StoryCard index={5} total={totalCards} accentColor="#00F0FF">
          {(entryProgress) => (
            <>
              <div className="flex-1 space-y-4 md:space-y-6 w-full order-2 md:order-1 relative z-10 w-full">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center mb-4 md:mb-6">
                    <TrendingDown className="w-5 h-5 md:w-6 md:h-6 text-[#00F0FF]" />
                 </div>
                <h3 className="text-3xl md:text-5xl font-heading">{t('connect.story.s6.title')}</h3>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  {t('connect.story.s6.desc')}
                </p>
              </div>
              
              <div className="flex-1 w-full glass-panel rounded-[2rem] p-6 md:p-8 flex items-end gap-4 md:gap-6 h-[250px] md:h-[300px] border border-[#00F0FF]/20 relative overflow-hidden order-1 md:order-2 w-full">
                 <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/20" />
                 
                 <div className="flex-1 flex flex-col items-center justify-end h-full">
                    <span className="text-[10px] md:text-xs text-white/40 mb-3 font-mono">{t('connect.story.s6.retail')}</span>
                    <div className="w-full bg-red-500/20 rounded-t-lg border-t border-red-500/50 h-[80%]" />
                 </div>
                 
                 <div className="flex-1 flex flex-col items-center justify-end h-full relative group w-full">
                    <span className="text-[10px] md:text-xs text-[#00F0FF] font-bold tracking-widest uppercase mb-3 font-mono">SETBIN</span>
                    <PriceGraph entryProgress={entryProgress} />
                 </div>
              </div>
            </>
          )}
        </StoryCard>

        {/* SECTION 7: FEATURE 4 (VERIFIED GENUINE) */}
        <StoryCard index={6} total={totalCards} accentColor="#4ADE80">
          {(entryProgress) => (
            <>
              <div className="flex-1 space-y-4 md:space-y-6 w-full">
                 <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-4 md:mb-6">
                    <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                 </div>
                <h3 className="text-3xl md:text-5xl font-heading">{t('connect.story.s7.title')}</h3>
                <p className="text-base md:text-xl text-white/60 font-light leading-relaxed">
                  {t('connect.story.s7.desc')}
                </p>
              </div>
              
              <div className="flex-1 flex justify-center items-center h-[250px] md:h-full w-full relative">
                 <motion.div 
                   className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center"
                   animate={{ y: [-10, 10, -10] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 >
                    <div className="absolute inset-0 bg-green-500/20 blur-[50px] rounded-full" />
                    <ShieldIcon entryProgress={entryProgress} />
                 </motion.div>
              </div>
            </>
          )}
        </StoryCard>

        {/* SECTION 8: FINAL IMPACT */}
        <StoryCard index={7} total={totalCards} accentColor="#FFFFFF">
          {() => (
            <div className="text-center w-full max-w-4xl mx-auto flex flex-col justify-center items-center h-full">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight mb-6 md:mb-8">
                {t('connect.story.s8.title').includes('Minutes') ? (
                  <>{t('connect.story.s8.title').replace('Minutes', '')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] to-white">Minutes</span></>
                ) : t('connect.story.s8.title')}
              </h2>
              <p className="text-lg md:text-2xl text-white/60 font-light leading-relaxed mb-10 md:mb-12 max-w-2xl px-4">
                {t('connect.story.s8.desc')}
              </p>
              
              <button className="relatve group px-6 py-3 md:px-8 md:py-4 rounded-full overflow-hidden bg-white text-black font-bold tracking-wide transition-transform hover:scale-105 text-sm md:text-base">
                 <span className="relative z-10 flex items-center gap-2">{t('connect.story.s8.btn')} <motion.span animate={{ x: [0, 5, 0]}} transition={{ repeat: Infinity, duration: 1.5}}>→</motion.span></span>
              </button>
            </div>
          )}
        </StoryCard>

      </div>
    </div>
  );
}
