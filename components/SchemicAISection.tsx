"use client";

import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Cpu, Terminal, Activity, ShieldCheck, Zap as ZapIcon, Database, Crosshair, Map, FileCode2, Search, Camera, Wrench, Brain } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect, useRef } from "react";

export default function SchemicAISection() {
  const { t } = useLanguage();
  
  // The AI logs that type out
  const logs = [
    { level: "info", time: "00:00:01", msg: "Init SCHEMIC_CORE v4.2.1" },
    { level: "info", time: "00:00:02", msg: "Scanning board architecture: iPhone 14 Pro Max" },
    { level: "warn", time: "00:00:03", msg: "Irregularity detected on VCC_MAIN power rail" },
    { level: "error", time: "00:00:04", msg: "FAULT Sensed: High current draw (2.4A)" },
    { level: "info", time: "00:00:06", msg: "Isolating short to GND..." },
    { level: "info", time: "00:00:07", msg: "Cross-referencing schematic database..." },
    { level: "success", time: "00:00:08", msg: t('ai.diagnosis.complete') },
    { level: "info", time: "00:00:09", msg: t('ai.diagnosis.sub') }
  ];

  const [activeLog, setActiveLog] = useState(0);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { margin: "-20%", once: false });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });
  const scannerY = useTransform(smoothProgress, [0.3, 0.7], ["0%", "100%"]);
  
  useEffect(() => {
    if (!isInView) return;
    let interval = setInterval(() => {
      setActiveLog(prev => (prev < logs.length ? prev + 1 : prev));
    }, 1200); 
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section id="schemic-ai" className="pt-16 md:pt-32 pb-8 relative overflow-hidden bg-transparent scroll-mt-20" ref={containerRef}>
      
      {/* Cinematic Grid & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.08)_0%,transparent_60%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-screen" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Title Area */}
        <div className="text-center w-full max-w-4xl mx-auto mb-16 space-y-6">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/20 text-[#00F0FF] text-xs font-bold tracking-[0.2em] uppercase"
           >
             <Cpu size={14} className="animate-pulse" />
             {t('ai.chip')}
           </motion.div>
           
           <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-4xl md:text-6xl lg:text-7xl font-heading tracking-tight text-white/90" 
             dangerouslySetInnerHTML={{ __html: t('ai.title') }} 
           />
           
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-lg md:text-xl font-light text-white/50 leading-relaxed max-w-2xl mx-auto"
           >
             {t('ai.desc')}
           </motion.p>
        </div>

         {/* The Hologram Terminal */}
         <div className="w-full relative rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-[#060B14]/80 backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col md:flex-row h-[700px] md:h-[600px]">
           
           {/* macOS-style Window Header (Absolute top) */}
           <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-between px-6 border-b border-white/5 bg-white/[0.02] z-20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400/50 border border-red-500/30" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/50 border border-yellow-500/30" />
                <div className="w-3 h-3 rounded-full bg-green-400/50 border border-green-500/30" />
              </div>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#00F0FF]/80 tracking-widest uppercase bg-black/40 px-4 py-1.5 rounded-full border border-white/5 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                 <Terminal size={10} className="text-[#00F0FF]" /> SCHEMIC.AI
              </div>
           </div>

           {/* Left Pane: Holographic Motherboard Tracker */}
            <div className="flex-1 min-h-[280px] md:min-h-0 w-full relative border-b md:border-b-0 md:border-r border-white/5 overflow-hidden flex items-center justify-center pt-12 md:pt-0">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,240,255,0.05)_0%,transparent_100%)]" />
              
              {/* Complex SVG Motherboard Base */}
               <div className="relative w-[140px] h-[175px] md:w-[400px] md:h-[450px] mt-4 md:mt-8">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500">
                  {/* Outer Frame */}
                  <rect x="50" y="50" width="300" height="400" rx="20" fill="none" stroke="rgba(0,240,255,0.1)" strokeWidth="1" />
                  
                  {/* Traces */}
                  <path d="M 100 100 L 150 100 L 150 200 L 250 200" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="2" />
                  <path d="M 300 100 L 250 100 L 250 300 L 100 300" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="2" />
                  <path d="M 50 250 L 150 250 L 150 400" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="2" />
                  <path d="M 350 250 L 300 250 L 300 400" fill="none" stroke="rgba(0,240,255,0.15)" strokeWidth="2" />
                  
                  {/* Highlighted Fault Trace */}
                  <motion.path 
                     d="M 300 400 L 250 400 L 250 200 L 150 200" 
                     fill="none" 
                     stroke={activeLog > 6 ? "#4ADE80" : "#F87171"} 
                     strokeWidth="3" 
                     filter="drop-shadow(0 0 8px rgba(248,113,113,0.5))"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: activeLog >= 3 ? 1 : 0 }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Chips */}
                  <rect x="90" y="90" width="20" height="20" rx="4" fill="#0A101D" stroke="rgba(0,240,255,0.3)" />
                  <rect x="290" y="90" width="20" height="20" rx="4" fill="#0A101D" stroke="rgba(0,240,255,0.3)" />
                  <rect x="90" y="290" width="20" height="20" rx="4" fill="#0A101D" stroke="rgba(0,240,255,0.3)" />
                  
                  {/* Central CPU */}
                  <rect x="160" y="210" width="80" height="80" rx="10" fill="#050810" stroke="#00F0FF" strokeWidth="2" filter="drop-shadow(0 0 15px rgba(0,240,255,0.2))" />
                  <circle cx="200" cy="250" r="15" fill="none" stroke="#00F0FF" strokeWidth="2" strokeDasharray="4 4" className="animate-spin-slow" />
                  
                  {/* Fault Capacitor (C2301) */}
                  <motion.circle 
                     cx="250" cy="400" r="8" 
                     fill={activeLog > 6 ? "#4ADE80" : "#F87171"}
                     filter={`drop-shadow(0 0 15px ${activeLog > 6 ? "rgba(74,222,128,1)" : "rgba(248,113,113,1)"})`}
                     initial={{ scale: 0 }}
                     animate={{ scale: activeLog >= 3 ? [1, 1.5, 1] : 0 }}
                     transition={{ duration: 1, repeat: activeLog > 6 ? 0 : Infinity }}
                  />
                  <motion.text 
                    x="270" y="405" 
                    fill={activeLog > 6 ? "#4ADE80" : "#F87171"} 
                    fontSize="12" 
                    fontFamily="monospace" 
                    fontWeight="bold"
                    animate={{ opacity: activeLog >= 3 ? 1 : 0 }}
                  >
                     C2301
                  </motion.text>
                </svg>

                  {/* Vertical Scanning Laser tied to scroll */}
                  <motion.div 
                     className="absolute left-[15px] right-[15px] h-0.5 bg-white shadow-[0_0_20px_4px_#00F0FF] z-20"
                     style={{ top: scannerY, filter: "drop-shadow(0 0-10px #00F0FF)" }} 
                  />
              </div>

              {/* Status Badges Overlay */}
              <div className="absolute top-[80px] right-[20px] md:right-[40px] flex flex-col gap-3">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md font-mono text-[10px] text-white/50">
                    <Activity size={12} className="text-[#00F0FF]" /> TEMP_24°C
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 backdrop-blur-md font-mono text-[10px] text-white/50">
                    <ZapIcon size={12} className={activeLog >= 3 && activeLog < 7 ? "text-red-400" : "text-[#00F0FF]"} /> D_RAW_{activeLog >= 3 && activeLog < 7 ? "2.4A" : "0.1A"}
                 </div>
              </div>
           </div>

           {/* Right Pane: Diagnostic Output Log */}
            <div className="flex-1 w-full bg-[#03060C] pt-12 relative flex flex-col">
               <div className="px-4 py-4 md:px-6 md:py-6 flex flex-col gap-2 md:gap-3 overflow-y-auto font-mono text-[10px] md:text-sm h-[calc(100%-80px)]">
                 {logs.map((log, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: 20 }}
                       animate={{ opacity: activeLog > i ? 1 : 0, x: activeLog > i ? 0 : 20 }}
                       transition={{ duration: 0.3 }}
                        className={`flex flex-col md:flex-row gap-2 md:gap-4 px-3 py-2 md:px-4 md:py-3 rounded-lg border 
                          ${log.level === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_rgba(248,113,113,0.1)]' : 
                            log.level === 'warn' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' : 
                            log.level === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)]' : 
                            'text-white/70 hover:bg-white/5 border-transparent'}`
                        }
                    >
                       <span className="opacity-40 shrink-0">[{log.time}]</span>
                       <div className="flex gap-2 w-full">
                         <span className="shrink-0 flex w-[60px]">
                           {log.level === 'info' && <span className="text-[#00F0FF]">[SYS]</span>}
                           {log.level === 'warn' && <span className="text-yellow-400">[WARN]</span>}
                           {log.level === 'error' && <span className="text-red-400 font-bold">[FAULT]</span>}
                           {log.level === 'success' && <span className="text-green-400 font-bold">[RPR]</span>}
                         </span>
                         <span className="leading-relaxed tracking-wide text-white/90">{log.msg}</span>
                       </div>
                    </motion.div>
                 ))}
                 
                 {/* Blinking Cursor */}
                 <div className="px-4 py-3 text-[#00F0FF] flex items-center gap-2 mt-4">
                    <span>schemic_node ~$</span>
                    <motion.div 
                      animate={{ opacity: [1, 0, 1] }} 
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-2.5 h-4 md:h-5 bg-[#00F0FF] shadow-[0_0_8px_#00F0FF]"
                    />
                 </div>
              </div>
              
              {/* Output Footer */}
              <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 bg-gradient-to-t from-[#03060C] via-[#03060C] to-transparent">
                 <motion.div 
                   className="w-full rounded-2xl bg-white/[0.03] border border-white/10 p-4 md:p-5 flex items-center gap-4 backdrop-blur-xl shadow-lg"
                   animate={{ opacity: activeLog >= logs.length - 1 ? 1 : 0, y: activeLog >= logs.length - 1 ? 0 : 20 }}
                 >
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-[#00F0FF]/10 flex items-center justify-center border border-[#00F0FF]/30 shrink-0 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                       <ShieldCheck className="w-5 h-5 md:w-6 md:h-6 text-[#00F0FF]" />
                    </div>
                    <div>
                      <div className="text-xs md:text-sm font-bold text-white uppercase tracking-wider mb-1">Diagnosis Complete</div>
                      <div className="text-[10px] md:text-xs text-[#00F0FF] font-mono">Schematic mapped. Solution ready to print.</div>
                    </div>
                 </motion.div>
              </div>
           </div>
           
        </div>

        {/* Features Flower Layout */}
        <div 
          className="w-full mt-12 md:mt-16 mb-0 relative h-[380px] hidden lg:flex justify-center items-center perspective-1000"
        >
           {[
             { title: t('ai.card1.title'), desc: t('ai.card1.desc'), icon: Search, color: "from-[#2F80ED]/30 to-transparent", glow: "text-[#2F80ED]", colorCode: "#2F80ED" },
             { title: t('ai.card2.title'), desc: t('ai.card2.desc'), icon: Camera, color: "from-[#8A2BE2]/30 to-transparent", glow: "text-[#8A2BE2]", colorCode: "#8A2BE2" },
             { title: t('ai.card3.title'), desc: t('ai.card3.desc'), icon: Wrench, color: "from-[#4ADE80]/30 to-transparent", glow: "text-[#4ADE80]", colorCode: "#4ADE80" },
             { title: t('ai.card4.title'), desc: t('ai.card4.desc'), icon: ZapIcon, color: "from-[#F2994A]/30 to-transparent", glow: "text-[#F2994A]", colorCode: "#F2994A" },
             { title: t('ai.card5.title'), desc: t('ai.card5.desc'), icon: Brain, color: "from-[#00F0FF]/30 to-transparent", glow: "text-[#00F0FF]", colorCode: "#00F0FF" }
           ].map((feature, i) => {
             const Icon = feature.icon;
             
             // Tight, beautiful fan initially (off-screen / scroll out state)
             const tightOffsets = [
               { x: "-40%", y: "15%", rotate: -10, z: 10 },
               { x: "-20%", y: "5%", rotate: -5, z: 20 },
               { x: "0%", y: "0%", rotate: 0, z: 30 },
               { x: "20%", y: "5%", rotate: 5, z: 20 },
               { x: "40%", y: "15%", rotate: 10, z: 10 }
             ];
             
             // Expanded straight line with gaps when SCROLLED INTO VIEW
             const expandedOffsets = [
               { x: "-210%", y: "0%", rotate: 0, z: 30 },
               { x: "-105%", y: "0%", rotate: 0, z: 30 },
               { x: "0%", y: "0%", rotate: 0, z: 30 },
               { x: "105%", y: "0%", rotate: 0, z: 30 },
               { x: "210%", y: "0%", rotate: 0, z: 30 }
             ];

             return (
                <motion.div
                  key={i}
                  initial={{ 
                    opacity: 0, 
                    x: tightOffsets[i].x, 
                    y: tightOffsets[i].y, 
                    rotate: tightOffsets[i].rotate, 
                    scale: 0.8 
                  }}
                  whileInView={{ 
                    opacity: 1, 
                    x: expandedOffsets[i].x, 
                    y: expandedOffsets[i].y, 
                    rotate: expandedOffsets[i].rotate, 
                    scale: 1,
                    zIndex: expandedOffsets[i].z
                  }}
                  viewport={{ once: false, amount: 0.4 }}
                  transition={{ 
                    duration: 0.8, 
                    type: "spring", 
                    bounce: 0.3, 
                    delay: i * 0.05 
                  }}
                  whileHover={{ 
                     scale: 1.05, 
                     y: "-20px", 
                     zIndex: 50,
                     transition: { duration: 0.3 } 
                  }}
                  className="absolute w-[200px] xl:w-[230px] 2xl:w-[250px] h-[340px] rounded-[2rem] p-5 xl:p-6 bg-[#060B14] border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.8)] cursor-pointer group"
                >
                   {/* UNIVERSAL PREMIUM BORDER (Connect Style) */}
                   <div className="absolute inset-0 pointer-events-none z-10 rounded-[2rem] overflow-hidden">
                      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px" style={{ background: `radial-gradient(circle, ${feature.colorCode} 0%, transparent 100%)` }} />
                   </div>

                   {/* Card Ambient Glow Top */}
                   <div 
                     className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[150px] pointer-events-none opacity-[0.1]"
                     style={{ background: `radial-gradient(ellipse at top, ${feature.colorCode} 0%, transparent 70%)` }}
                   />
                   
                   {/* Bottom Neon Splash */}
                   <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${feature.color} opacity-20 blur-[30px] rounded-full pointer-events-none group-hover:opacity-40 transition-opacity duration-500`} />
                   
                   <div className="relative z-20 flex flex-col h-full">
                     <div className={`w-10 h-10 xl:w-12 xl:h-12 rounded-[1rem] bg-white/5 flex items-center justify-center border border-white/10 mb-5 group-hover:scale-110 transition-transform duration-300 shadow-[2px_2px_10px_rgba(0,0,0,0.5)]`}>
                        <Icon strokeWidth={1.5} className={`w-5 h-5 xl:w-6 xl:h-6 ${feature.glow}`} />
                     </div>
                     <h3 className="text-base xl:text-lg font-bold text-white mb-2 xl:mb-3 tracking-wide leading-tight">{feature.title}</h3>
                     <p className="text-[11px] xl:text-xs text-white/50 leading-relaxed font-light flex-1">
                       {feature.desc}
                     </p>
                   </div>
                </motion.div>
             )
           })}
        </div>

        {/* Mobile View for Features (Vertical Stack) */}
        <div className="w-full mt-12 flex flex-col lg:hidden gap-6">
           {[
             { title: t('ai.card1.title'), desc: t('ai.card1.desc'), icon: Search, glow: "text-[#2F80ED]" },
             { title: t('ai.card2.title'), desc: t('ai.card2.desc'), icon: Camera, glow: "text-[#8A2BE2]" },
             { title: t('ai.card3.title'), desc: t('ai.card3.desc'), icon: Wrench, glow: "text-[#4ADE80]" },
             { title: t('ai.card4.title'), desc: t('ai.card4.desc'), icon: ZapIcon, glow: "text-[#F2994A]" },
             { title: t('ai.card5.title'), desc: t('ai.card5.desc'), icon: Brain, glow: "text-[#00F0FF]" }
           ].map((feature, i) => {
             const Icon = feature.icon;
             return (
               <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-[2rem] p-8 border border-white/10 bg-[#060B14]"
                >
                   <div className="w-12 h-12 rounded-[1rem] bg-white/5 flex items-center justify-center border border-white/10 mb-4">
                      <Icon strokeWidth={1.5} className={`w-6 h-6 ${feature.glow}`} />
                   </div>
                   <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                   <p className="text-sm text-white/50">{feature.desc}</p>
                </motion.div>
             )
           })}
        </div>

      </div>
    </section>
  );
}
