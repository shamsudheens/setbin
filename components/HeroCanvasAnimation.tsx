"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroCanvasAnimation() {
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
    <div ref={containerRef} className="relative h-[500vh]">
      
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
