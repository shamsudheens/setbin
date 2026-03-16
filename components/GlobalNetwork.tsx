"use client";

import { motion } from "framer-motion";

export default function GlobalNetwork() {
  const nodes = [
    { top: "25%", left: "20%", color: "var(--color-glow-blue)" }, // NA
    { top: "45%", left: "30%", color: "var(--color-glow-cyan)" }, // NA/SA
    { top: "60%", left: "35%", color: "var(--color-glow-purple)" }, // SA
    { top: "30%", left: "55%", color: "var(--color-glow-cyan)" }, // EU
    { top: "25%", left: "75%", color: "var(--color-glow-blue)" }, // ASIA
    { top: "45%", left: "80%", color: "var(--color-glow-cyan)" }, // ASIA/JP
    { top: "70%", left: "85%", color: "var(--color-glow-purple)" }, // AU
    { top: "50%", left: "60%", color: "var(--color-glow-blue)" }, // ME
    { top: "60%", left: "50%", color: "var(--color-glow-cyan)" }, // AF
  ];

  return (
    <section className="py-40 relative overflow-hidden bg-transparent">
      
      {/* Gentle Glass dotted background */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 2px, transparent 2px)", backgroundSize: "48px 48px" }}></div>
      
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/70 text-sm mb-6 tracking-wide backdrop-blur-md">
            MODULE 04
          </div>
          <h2 className="text-6xl md:text-8xl font-heading tracking-tight text-white mb-6">
            Global<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-[var(--color-glow-blue)]">Network</span>
          </h2>
          <div className="glass-panel px-8 py-4 rounded-2xl inline-block">
            <p className="text-xl text-white/80 font-light leading-relaxed">
              <span className="text-white font-medium mr-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">SETBIN</span>
               connects technicians, suppliers, and intelligence across the globe, creating a unified infrastructure for a fragmented industry.
            </p>
          </div>
        </motion.div>

        {/* Abstract Map Area */}
        <div className="relative w-full max-w-5xl mx-auto h-[400px] md:h-[600px] rounded-[3rem] border border-white/10 bg-[#050B14]/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
          
          {/* Gentle Inner Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px]" />

          {/* Abstract SVG Map Contours - Smooth paths */}
          <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 600" preserveAspectRatio="none">
             {/* North America */}
            <path d="M150 150 Q 175 100 200 50 Q 250 100 300 150 Q 275 200 250 250 Q 200 200 150 150 Z" fill="white" stroke="white" strokeWidth="2" />
             {/* South America */}
             <path d="M280 300 Q 300 350 320 400 Q 335 450 350 500 Q 315 475 280 450 Q 280 375 280 300 Z" fill="white" stroke="white" strokeWidth="2" />
             {/* Europe / Africa */}
             <path d="M450 150 Q 500 100 550 50 Q 575 125 600 200 Q 550 300 500 400 Q 475 275 450 150 Z" fill="white" stroke="white" strokeWidth="2" />
             {/* Asia */}
             <path d="M650 100 Q 725 75 800 50 Q 850 150 900 250 Q 825 300 750 350 Q 700 225 650 100 Z" fill="white" stroke="white" strokeWidth="2" />
             {/* Australia */}
             <path d="M800 450 Q 825 425 850 400 Q 875 425 900 450 Q 875 475 850 500 Q 825 475 800 450 Z" fill="white" stroke="white" strokeWidth="2" />
          </svg>

          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <motion.path 
              d="M20% 25% Q25% 35% 30% 45% Q42% 37% 55% 30% Q65% 27% 75% 25% Q67% 37% 60% 50% Q47% 55% 35% 60%"
              fill="none"
              stroke="var(--color-glow-blue)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#line-glow)"
              style={{ opacity: 0.6 }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
            />
            <motion.path 
              d="M55% 30% Q67% 37% 80% 45% Q82% 57% 85% 70%"
              fill="none"
              stroke="var(--color-glow-cyan)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#line-glow)"
              style={{ opacity: 0.6 }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, delay: 1.5, ease: "easeInOut" }}
            />
            <motion.path 
              d="M60% 50% Q55% 55% 50% 60%"
              fill="none"
              stroke="var(--color-glow-purple)"
              strokeWidth="2"
              strokeLinecap="round"
              filter="url(#line-glow)"
              style={{ opacity: 0.6 }}
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 2.5, ease: "easeInOut" }}
            />
          </svg>

          {/* Animated Glow Nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 + 0.5 }}
              style={{ top: node.top, left: node.left }}
              className="absolute w-6 h-6 -ml-3 -mt-3 z-10 flex items-center justify-center group cursor-pointer"
            >
              <div 
                className="absolute inset-0 rounded-full opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" 
                style={{ backgroundColor: node.color, filter: 'blur(8px)' }}
              />
              <div 
                className="w-2.5 h-2.5 rounded-full relative z-10" 
                style={{ backgroundColor: node.color, boxShadow: `0 0 10px ${node.color}` }}
              />
              <div 
                className="absolute inset-[-4px] rounded-full border border-white/30 animate-ping opacity-20 pointer-events-none" 
              />
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}
