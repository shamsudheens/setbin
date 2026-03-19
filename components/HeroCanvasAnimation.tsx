"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function HeroCanvasAnimation() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesArray, setImagesArray] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 240;

  // Preload images
  useEffect(() => {
    const urls = Array.from({ length: totalFrames }, (_, i) => {
      const index = (i + 1).toString().padStart(3, '0');
      return `/frames/ezgif-frame-${index}.webp`;
    });

    let loaded = 0;
    const images: HTMLImageElement[] = [];

    urls.forEach((url, i) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === totalFrames) {
          // Once all are loaded, set them
          setImagesArray(images);
        }
      };
      images[i] = img;
    });
  }, []);

  // Framer motion scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  // Render to canvas
  useEffect(() => {
    if (imagesArray.length < totalFrames) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas resolution strictly once for crisp rendering
    canvas.width = 1920;
    canvas.height = 1080;

    let animationFrameId: number;

    const render = () => {
      const currentFrame = Math.round(frameIndex.get());
      const image = imagesArray[currentFrame];

      if (image) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Calculate Aspect Ratio Fit
        const hRatio = canvas.width / image.width;
        const vRatio = canvas.height / image.height;
        const ratio = Math.max(hRatio, vRatio); // Use max to fill ("cover")
        const centerShiftX = (canvas.width - image.width * ratio) / 2;
        const centerShiftY = (canvas.height - image.height * ratio) / 2;

        ctx.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          centerShiftX,
          centerShiftY,
          image.width * ratio,
          image.height * ratio
        );
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [imagesArray, frameIndex]);


  return (
    <div ref={containerRef} className="relative h-[700vh]">
      
      {/* Background Ambience — Now Dynamic Neon */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <motion.div 
          className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
        />
        <motion.div 
          className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-20"
        />
      </div>

      {/* Sticky Fullscreen Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {loadedCount < totalFrames ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#030816]">
            <div className="text-white/70 font-sans tracking-widest text-sm mb-6 uppercase flex items-center gap-3">
              Initializing Core
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-blue)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-cyan)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-purple)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] transition-all duration-300 shadow-[0_0_10px_rgba(47,128,237,0.5)]"
                style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
              />
            </div>
          </div>
        ) : null}
        
        {/* Cinematic Storytelling Stages */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6 overflow-hidden">
           
           {/* STAGE 1 — Ecosystem */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [30, 0, 0, -30]),
               scale: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [0.95, 1, 1, 1.05]),
               filter: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
             }}
           >
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-glow-blue)]/30 bg-[var(--color-glow-blue)]/10 backdrop-blur-md shadow-[0_0_20px_rgba(47,128,237,0.2)] mb-2">
               <span className="w-2 h-2 rounded-full bg-[var(--color-glow-cyan)] shadow-[0_0_10px_var(--color-glow-cyan)] animate-pulse" />
               <span className="text-[12px] text-white/90 tracking-[0.25em] uppercase font-bold">{t('hero.stage1.tag')}</span>
             </div>

             <h2 
               className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] text-white break-words hyphens-auto text-center px-4"
               style={{ filter: 'drop-shadow(0 0 40px rgba(47,128,237,0.4))' }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage1.title') }}
             />

             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center">
               <p className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4">
                 {t('hero.stage1.subtitle')}
               </p>
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage1.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
           </motion.div>

           {/* STAGE 2 — Problem */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-7 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [30, 0, 0, -30]),
               scale: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [0.96, 1, 1, 1.04]),
               filter: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
             }}
           >
             {/* Stage tag */}
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-glow-blue)]/30 bg-[var(--color-glow-blue)]/10 backdrop-blur-md shadow-[0_0_20px_rgba(47,128,237,0.2)]">
               <span className="w-2 h-2 rounded-full bg-[var(--color-glow-cyan)] shadow-[0_0_10px_#00F0FF] animate-pulse" />
               <span className="text-[12px] text-white/90 tracking-[0.2em] uppercase font-bold">{t('hero.stage2.tag')}</span>
             </div>
             <h2 
               className="text-3xl md:text-5xl lg:text-7xl font-heading font-bold tracking-tight leading-[1.1] text-white break-words hyphens-auto text-center px-4"
               style={{ filter: 'drop-shadow(0 0 40px rgba(47,128,237,0.4))' }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage2.title') }}
             />
             <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-glow-blue)] to-transparent rounded-full shadow-[0_0_20px_var(--color-glow-blue)]" />
             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center">
               <p 
                 className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                 style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                 dangerouslySetInnerHTML={{ __html: t('hero.stage2.subtext') }}
               />
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage2.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
           </motion.div>

           {/* STAGE 3 — Transition */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-7 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [30, 0, 0, -30]),
               scale: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [0.96, 1, 1, 1.04]),
               filter: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
             }}
           >
             {/* Stage tag */}
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[var(--color-glow-blue)]/30 bg-[var(--color-glow-blue)]/10 backdrop-blur-md shadow-[0_0_20px_rgba(47,128,237,0.2)]">
               <span className="text-[12px] text-white/80 tracking-[0.2em] uppercase font-bold">{t('hero.stage3.tag')}</span>
             </div>
             <h2 
               className="text-4xl md:text-6xl lg:text-[6rem] font-heading font-bold tracking-tight leading-[1.05] break-words hyphens-auto text-center"
               style={{
                 filter: 'drop-shadow(0 0 50px rgba(47,128,237,0.5))'
               }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage3.title') }}
             />
             <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-glow-blue)] to-transparent rounded-full shadow-[0_0_20px_var(--color-glow-blue)]" />
             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center">
               <p 
                 className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                 style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                 dangerouslySetInnerHTML={{ __html: t('hero.stage3.subtext') }}
               />
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage3.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
           </motion.div>

            {/* STAGE 4 — Solution */}
            <motion.div 
              className="absolute flex flex-col items-center pointer-events-none gap-0 w-full max-w-5xl px-4 overflow-hidden"
              style={{ 
                opacity: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [0, 1, 1, 0]),
                y: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [30, 0, 0, -30]),
                scale: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [0.96, 1, 1, 1.04]),
                filter: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
              }}
            >
              {/* Stage tag */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse" />
                <span className="text-[12px] text-[#00F0FF] tracking-[0.2em] uppercase font-bold">{t('hero.stage4.tag')}</span>
              </div>
              <h2 
                className="text-4xl md:text-6xl lg:text-[6.5rem] font-heading font-bold tracking-tight leading-[1.05] break-words hyphens-auto text-center text-white mb-4"
                style={{
                  filter: 'drop-shadow(0 0 50px rgba(0,240,255,0.7))'
                }}
                dangerouslySetInnerHTML={{ __html: t('hero.stage4.title') }}
              />
              <div className="flex flex-col items-center gap-0 px-10 py-7 rounded-3xl border border-[#00F0FF]/30 bg-black/50 backdrop-blur-xl max-w-2xl w-full relative overflow-hidden">
                <div className="absolute top-0 left-[20%] right-[20%] h-1 bg-gradient-to-r from-transparent via-[#00F0FF]/70 to-transparent shadow-[0_0_20px_#00F0FF]" />
                <p 
                  className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                  style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                  dangerouslySetInnerHTML={{ __html: t('hero.stage4.subtext') }}
                />
                <div className="w-full h-px bg-white/5 mb-4" />
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                  {t('hero.stage4.points').split(' • ').map((point, idx) => (
                    <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

           {/* STAGE 5 — Capabilities */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-7 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [30, 0, 0, -30]),
               scale: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [0.96, 1, 1, 1.04]),
               filter: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
             }}
           >
             {/* Stage tag */}
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.3)]">
               <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse" />
               <span className="text-[12px] text-[#00F0FF] tracking-[0.2em] uppercase font-bold">{t('hero.stage5.tag')}</span>
             </div>
             <h2 
               className="text-5xl md:text-7xl lg:text-[7.5rem] font-heading font-bold tracking-tighter leading-[1] text-white break-words hyphens-auto text-center"
               style={{ filter: 'drop-shadow(0 0 50px rgba(0,240,255,0.5))' }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage5.title') }}
             />
             <div className="w-16 h-1 bg-gradient-to-r from-[var(--color-glow-blue)] to-transparent rounded-full shadow-[0_0_20px_var(--color-glow-blue)]" />
             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center">
               <p 
                 className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                 style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                 dangerouslySetInnerHTML={{ __html: t('hero.stage5.subtext') }}
               />
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage5.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
           </motion.div>

           {/* STAGE 6 — Connect */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-0 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [30, 0, 0, -30]),
               scale: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [0.95, 1, 1, 1.05]),
               filter: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], ["blur(8px)", "blur(0px)", "blur(0px)", "blur(8px)"])
             }}
           >
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#00F0FF]/40 bg-[#00F0FF]/10 backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.3)] mb-4">
               <span className="w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse" />
               <span className="text-[12px] text-[#00F0FF] tracking-[0.2em] uppercase font-bold">{t('hero.stage6.tag')}</span>
             </div>
             <h2 
               className="text-5xl md:text-7xl lg:text-[6.5rem] font-heading font-bold tracking-tighter leading-[1] text-white break-words hyphens-auto text-center mb-6"
               style={{ filter: 'drop-shadow(0 0 50px rgba(0,240,255,0.5))' }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage6.title') }}
             />
             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center">
               <p 
                 className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                 style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                 dangerouslySetInnerHTML={{ __html: t('hero.stage6.subtext') }}
               />
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage6.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-[var(--color-glow-cyan)]" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
           </motion.div>

           {/* STAGE 7 — CTA */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-auto gap-9 w-full max-w-4xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.96, 0.98, 1.0], [0, 1, 1]),
               y: useTransform(smoothProgress, [0.96, 0.98, 1.0], [30, 0, 0]),
               scale: useTransform(smoothProgress, [0.96, 0.98, 1.0], [0.95, 1, 1]),
               filter: useTransform(smoothProgress, [0.96, 0.98, 1.0], ["blur(8px)", "blur(0px)", "blur(0px)"])
             }}
           >
             {/* Stage tag */}
             <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(255,255,255,0.2)]">
               <span className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_white] animate-pulse" />
               <span className="text-[12px] text-white tracking-[0.25em] uppercase font-bold">{t('hero.stage7.tag')}</span>
             </div>
             <h2 
               className="text-5xl md:text-7xl lg:text-[7rem] font-heading font-bold tracking-tighter leading-[1] text-white break-words hyphens-auto text-center"
               style={{ filter: 'drop-shadow(0 0 50px rgba(255,255,255,0.4))' }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage7.title') }}
             />
             <div className="px-8 py-6 rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl max-w-2xl w-full flex flex-col items-center mb-6">
               <p 
                 className="text-sm md:text-base lg:text-xl text-white/90 font-medium uppercase tracking-[0.12em] leading-relaxed break-words text-center mb-4"
                 style={{ textShadow: '0 0 10px rgba(47,128,237,0.2)' }}
                 dangerouslySetInnerHTML={{ __html: t('hero.stage7.subtext') }}
               />
               <div className="w-full h-px bg-white/5 mb-4" />
               <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
                 {t('hero.stage7.points').split(' • ').map((point, idx) => (
                   <span key={idx} className="text-[10px] md:text-xs text-white/60 tracking-widest uppercase flex items-center gap-2">
                     <span className="w-1 h-1 rounded-full bg-white" />
                     {point}
                   </span>
                 ))}
               </div>
             </div>
             <a 
               href="#connect"
               className="group relative px-12 py-5 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(200,220,255,1) 100%)',
                 color: '#0B1624',
                 boxShadow: '0 0 50px rgba(255,255,255,0.4), 0 0 80px rgba(47,128,237,0.3)'
               }}
             >
               <span className="relative z-10 flex items-center gap-3">{t('hero.stage7.btn')} <span className="text-2xl group-hover:translate-y-1 transition-transform">↓</span></span>
             </a>
           </motion.div>
           
        </div>

         {/* Cinematic Overlays */}
         <div className="absolute inset-0 z-[1] pointer-events-none">
           {/* Base darkening for contrast */}
           <div className="absolute inset-0 bg-black/25" />
           {/* Vignette */}
           <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,8,22,0.9)_100%)]" />
         </div>

         {/* Canvas Background */}
         <canvas
           ref={canvasRef}
           className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-screen scale-[1.02]"
         />
      </div>
    </div>
  );
}
