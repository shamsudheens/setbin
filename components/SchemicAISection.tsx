"use client";

import { motion } from "framer-motion";
import { Cpu } from "lucide-react";

export default function SchemicAISection() {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      
      {/* Gentle Glass Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-20 -translate-y-1/2 -translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-16">
        
        {/* Visual Concept: Glass schematic paths */}
        <div className="flex-1 w-full max-w-lg aspect-square relative group perspective-1000">
          <motion.div 
            className="absolute inset-0 rounded-[3rem] border border-white/10 bg-[#02060D]/80 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(47,128,237,0.1)] group-hover:shadow-[0_0_60px_rgba(47,128,237,0.2)] transition-shadow duration-700"
            style={{ transformStyle: 'preserve-3d' }}
          >
            
            {/* Inner Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(47,128,237,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(47,128,237,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />
            
            {/* Central Chip */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-[#050B14] border border-[var(--color-glow-blue)]/50 flex items-center justify-center z-10 shadow-[0_0_30px_rgba(47,128,237,0.4)]"
            >
              <Cpu className="w-16 h-16 text-[var(--color-glow-cyan)] drop-shadow-[0_0_10px_var(--color-glow-cyan)]" />
              {/* Pulsing ring out from chip */}
              <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-2xl border border-[var(--color-glow-cyan)]"
              />
            </motion.div>

            {/* Glowing Circuit Paths (SVG) */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 400 400" fill="none" preserveAspectRatio="xMidYMid meet">
              <defs>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              <motion.path 
                d="M200 200 L100 200 L100 100" 
                stroke="var(--color-glow-blue)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
              />
              <motion.path 
                d="M200 200 L300 200 L300 300" 
                stroke="var(--color-glow-cyan)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1, ease: "easeInOut" }}
              />
              <motion.path 
                d="M200 200 L200 100 L300 100" 
                stroke="var(--color-glow-purple)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
              />
               <motion.path 
                d="M200 200 L200 300 L100 300" 
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#glow)"
                style={{ opacity: 0.5 }}
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: 2, ease: "easeInOut" }}
              />
              
              {/* Flashing Nodes */}
              {[
                { cx: 100, cy: 100, fill: "var(--color-glow-blue)" },
                { cx: 300, cy: 300, fill: "var(--color-glow-cyan)" },
                { cx: 300, cy: 100, fill: "var(--color-glow-purple)" },
                { cx: 100, cy: 300, fill: "white" },
              ].map((node, i) => (
                <motion.circle
                  key={i}
                  cx={node.cx}
                  cy={node.cy}
                  r="4"
                  fill={node.fill}
                  filter="url(#glow)"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.5 + i * 0.5 }}
                  className="animate-pulse"
                />
              ))}
            </svg>
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="flex-1 relative">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel p-10 rounded-[2rem] relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-6 tracking-wide">
              MODULE 03
            </div>
            
            <h3 className="text-5xl md:text-7xl font-heading tracking-tight text-white mb-6">
              Schemic<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-[var(--color-glow-blue)]">AI</span>
            </h3>
            <p className="text-2xl font-light text-[var(--color-glow-cyan)] mb-6 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]">
              AI-powered schematic-based diagnostics
            </p>
            <p className="text-lg font-light text-white/60 leading-relaxed max-w-lg mb-8">
              Transforming trial-and-error repair. Schemic AI instantly analyzes motherboard fault symptoms and generates precise tracing paths, turning hours of guesswork into minutes of targeted execution.
            </p>
            
            {/* Fault Trace Animated Log in Glass Terminal */}
            <div className="bg-black/60 rounded-xl border border-white/10 shadow-inner p-5 font-mono text-xs md:text-sm overflow-hidden backdrop-blur-sm relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-glow-blue)] via-[var(--color-glow-cyan)] to-[var(--color-glow-purple)] opacity-50" />
              <div className="flex gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
                <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-white/60 mb-2 truncate"
              >
                <span className="text-[var(--color-glow-blue)]">~</span>$ analyzing_vcc_main_power_fault...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5 }}
                className="text-white/80 mb-2 truncate"
              >
                <span className="text-[var(--color-glow-blue)]">~</span>$ tracing_short_to_GND_on_line_12...
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5 }}
                className="text-[#00F0FF] drop-shadow-[0_0_5px_#00F0FF] truncate"
              >
                <span className="text-[var(--color-glow-blue)]">~</span>$ defect_isolated: Replace_Capacitor_C2301
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
