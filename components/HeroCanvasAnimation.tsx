"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

export default function HeroCanvasAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imagesArray, setImagesArray] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const totalFrames = 120;

  // Preload images
  useEffect(() => {
    const urls = Array.from({ length: totalFrames }, (_, i) => {
      return `/frames/frame_${i}.webp`;
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
    damping: 20,
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

  // Section Opacities
  const opacity1 = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const opacity2 = useTransform(smoothProgress, [0.2, 0.4, 0.5], [0, 1, 0]);
  const opacity3 = useTransform(smoothProgress, [0.45, 0.65, 0.75], [0, 1, 0]);
  const opacity4 = useTransform(smoothProgress, [0.7, 0.85, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className="relative h-[400vh] pt-32 pb-16">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 animate-pulse" />
        <div className="absolute bottom-[20%] right-[10%] w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-20" />
      </div>

      {/* Sticky Glass Container */}
      <div className="sticky top-28 h-[75vh] w-[95vw] lg:w-[90vw] mx-auto overflow-hidden flex items-center justify-center rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(47,128,237,0.15)] bg-black/40 backdrop-blur-sm">
        
        {loadedCount < totalFrames ? (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#050B14]/80 backdrop-blur-xl">
            <div className="text-white/70 font-sans tracking-widest text-sm mb-6 uppercase flex items-center gap-3">
              Initializing Core
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-blue)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-cyan)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-purple)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </span>
            </div>
            <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] transition-all duration-300 shadow-[0_0_10px_rgba(47,128,237,0.5)]"
                style={{ width: `${(loadedCount / totalFrames) * 100}%` }}
              />
            </div>
          </div>
        ) : null}

        {/* Canvas Background */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-80 mix-blend-screen"
        />

        {/* Glass Vignette Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,11,20,0.7)_100%)] z-0 pointer-events-none"></div>

        {/* Content Overlays */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 flex flex-col justify-center items-center text-center">
          
          {/* Section 1 */}
          <motion.div style={{ opacity: opacity1 }} className="absolute">
            <h1 className="text-6xl md:text-8xl font-heading tracking-tight mb-6 text-white text-glow">
              SETBIN
            </h1>
            <div className="glass-panel px-8 py-5 rounded-2xl mx-auto max-w-2xl">
              <p className="text-xl md:text-3xl font-light text-white/90">
                The Digital Backbone of<br/>
                <span className="text-gradient font-medium mt-2 block">Smartphone Servicing</span>
              </p>
            </div>
          </motion.div>

          {/* Section 2 */}
          <motion.div style={{ opacity: opacity2 }} className="absolute">
             <div className="glass-panel px-10 py-8 rounded-3xl backdrop-blur-2xl bg-white/5 border-white/20">
              <h2 className="text-5xl md:text-7xl font-heading tracking-tight mb-2 text-white text-glow">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)]">Infrastructure</span><br/>
                <span className="font-light text-white/80 text-4xl md:text-5xl">for the Repair Industry</span>
              </h2>
             </div>
          </motion.div>

          {/* Section 3 */}
          <motion.div style={{ opacity: opacity3 }} className="absolute">
            <div className="flex flex-col md:flex-row gap-6">
              {['Connect', 'Diagnose', 'Operate'].map((word, i) => (
                <div key={i} className="glass-panel px-10 py-5 rounded-2xl text-2xl md:text-4xl font-light text-white hover:bg-white/10 transition-colors border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] text-glow">
                  {word}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Section 4 */}
          <motion.div style={{ opacity: opacity4, pointerEvents: loadedCount === totalFrames ? "auto" : "none" }} className="absolute flex flex-col items-center">
            <div className="glass-panel px-12 py-10 rounded-3xl mb-8 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-glow-blue)]/10 to-[var(--color-glow-cyan)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h2 className="text-4xl md:text-6xl font-heading tracking-tight text-white relative z-10">
                Powering the Future of<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-white font-medium mt-2 block">
                  Mobile Service
                </span>
              </h2>
            </div>
            
            <button className="group relative flex items-center gap-3 px-8 py-4 rounded-full glass-panel glass-panel-hover text-white font-medium shadow-[0_0_20px_rgba(47,128,237,0.2)] hover:shadow-[0_0_30px_rgba(47,128,237,0.4)] transition-all cursor-pointer overflow-hidden text-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-glow-blue)]/20 to-[var(--color-glow-cyan)]/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10">Explore the Platform</span>
              <div className="relative z-10 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white text-white group-hover:text-black transition-colors">
                <ArrowDown className="w-4 h-4" />
              </div>
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
