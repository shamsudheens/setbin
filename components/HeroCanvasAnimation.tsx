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
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
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
           
           {/* STAGE 1 — Brand Identity */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0, 0.05, 0.10, 0.14], [0.92, 1, 1, 1.04])
             }}
           >
             {/* <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-2">
               <span className="text-xs text-white/60 tracking-[0.3em] uppercase font-medium">Est. 2024</span>
             </div> */}
             <h1 className="text-7xl md:text-[9rem] lg:text-[11rem] font-heading tracking-tighter leading-none"
               style={{ 
                 backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #c8d8f0 40%, #5b9bd5 70%, #2f80ed 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0 0 40px rgba(47,128,237,0.5))'
               }}>
               SETBIN
             </h1>
             <div className="w-32 h-px bg-gradient-to-r from-transparent via-[var(--color-glow-cyan)] to-transparent" />
             <p className="text-lg md:text-xl lg:text-2xl text-white/70 font-light max-w-3xl leading-relaxed tracking-wide break-words hyphens-auto">
               {t('hero.stage1.subtitle')}
             </p>
           </motion.div>

           {/* STAGE 2 — Problem */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0.15, 0.20, 0.25, 0.29], [0.94, 1, 1, 1.03])
             }}
           >
             <h2 
               className="text-3xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.2] text-white break-words hyphens-auto"
               dangerouslySetInnerHTML={{ __html: t('hero.stage2.title') }}
             />
             <div className="w-16 h-px bg-[var(--color-glow-cyan)] opacity-60" />
             <div className="px-6 py-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md max-w-2xl w-full">
               <p 
                 className="text-sm md:text-base lg:text-lg text-[var(--color-glow-cyan)] font-medium uppercase tracking-[0.1em] leading-loose break-words"
                 dangerouslySetInnerHTML={{ __html: t('hero.stage2.subtext') }}
               />
             </div>
           </motion.div>

           {/* STAGE 3 — Transition */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0.30, 0.35, 0.43, 0.48], [0.94, 1, 1, 1.03])
             }}
           >
             <h2 
               className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight leading-[1.2] break-words hyphens-auto"
               style={{
                 backgroundImage: 'linear-gradient(135deg, #ffffff 30%, #a8c4e8 70%, #5b9bd5 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent'
               }}
               dangerouslySetInnerHTML={{ __html: t('hero.stage3.title') }}
             />
             <p className="text-xl md:text-2xl text-white/50 font-light max-w-2xl leading-relaxed italic tracking-wide break-words hyphens-auto">
               — {t('hero.stage3.subtext')}
             </p>
           </motion.div>

           {/* STAGE 4 — Solution */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0.49, 0.54, 0.62, 0.68], [0.94, 1, 1, 1.03])
             }}
           >
             <h2 
               className="text-3xl md:text-5xl lg:text-6xl font-heading tracking-tight leading-[1.2] break-words hyphens-auto"
               style={{
                 backgroundImage: 'linear-gradient(90deg, #56ccf2 0%, #2f80ed 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0 0 20px rgba(86,204,242,0.4))'
               }}
             >
               {t('hero.stage4.title')}
             </h2>
             <div className="flex flex-col items-center gap-2 px-8 py-4 rounded-2xl border border-[rgba(86,204,242,0.15)] bg-[rgba(47,128,237,0.08)] backdrop-blur-md max-w-2xl w-full">
               <p 
                 className="text-base md:text-xl text-white/80 font-light leading-loose break-words"
                 dangerouslySetInnerHTML={{ __html: t('hero.stage4.subtext') }}
               />
             </div>
           </motion.div>

           {/* STAGE 5 — Capabilities */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-6 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0.69, 0.74, 0.82, 0.85], [0.94, 1, 1, 1.03])
             }}
           >
             <h2 
               className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tighter leading-[1.2] text-white break-words hyphens-auto"
               style={{ filter: 'drop-shadow(0 0 25px rgba(255,255,255,0.2))' }}
             >
               {t('hero.stage5.title')}
             </h2>
             <div className="w-24 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
             <p 
               className="text-lg md:text-xl text-white/55 font-light max-w-2xl leading-relaxed tracking-wide break-words hyphens-auto"
               dangerouslySetInnerHTML={{ __html: t('hero.stage5.subtext') }}
             />
           </motion.div>

           {/* STAGE 6 — Logo Reveal */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-none gap-5 w-full max-w-5xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [0, 1, 1, 0]),
               y: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [40, 0, 0, -40]),
               scale: useTransform(smoothProgress, [0.86, 0.89, 0.93, 0.95], [0.92, 1, 1, 1.04])
             }}
           >
             <h2 
               className="text-7xl md:text-[9rem] lg:text-[11rem] font-heading tracking-tighter leading-none"
               style={{
                 backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #c8d8f0 40%, #5b9bd5 70%, #2f80ed 100%)',
                 WebkitBackgroundClip: 'text',
                 WebkitTextFillColor: 'transparent',
                 filter: 'drop-shadow(0 0 50px rgba(47,128,237,0.7))'
               }}
             >
               SETBIN
             </h2>
             <div className="w-48 h-px bg-gradient-to-r from-transparent via-[var(--color-glow-cyan)] to-transparent opacity-70" />
             <p className="text-sm md:text-base text-[var(--color-glow-cyan)] font-light tracking-[0.2em] uppercase break-words text-center max-w-xl">
               {t('hero.stage6.subtext')}
             </p>
           </motion.div>

           {/* STAGE 7 — CTA */}
           <motion.div 
             className="absolute flex flex-col items-center pointer-events-auto gap-10 w-full max-w-4xl px-4 overflow-hidden"
             style={{ 
               opacity: useTransform(smoothProgress, [0.96, 0.98, 1.0], [0, 1, 1]),
               y: useTransform(smoothProgress, [0.96, 0.98, 1.0], [40, 0, 0]),
               scale: useTransform(smoothProgress, [0.96, 0.98, 1.0], [0.94, 1, 1])
             }}
           >
             <h2 
               className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tighter leading-[1.15] text-white break-words hyphens-auto"
               style={{ filter: 'drop-shadow(0 0 30px rgba(255,255,255,0.15))' }}
             >
               {t('hero.stage7.title')}
             </h2>
             <a 
               href="#about" 
               className="group relative px-10 py-5 rounded-full font-semibold text-lg overflow-hidden transition-transform duration-300 hover:scale-105"
               style={{
                 background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(200,220,255,1) 100%)',
                 color: '#0B1624',
                 boxShadow: '0 0 50px rgba(255,255,255,0.35), 0 0 100px rgba(47,128,237,0.2)'
               }}
             >
               <span className="relative z-10">{t('hero.stage7.btn')} ↓</span>
             </a>
           </motion.div>
           
        </div>

        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-90 mix-blend-screen scale-[1.02]"
        />

        {/* Glass Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(3,8,22,0.8)_100%)] z-0 pointer-events-none" />
      </div>
    </div>
  );
}
