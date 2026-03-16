"use client";

import { motion } from "framer-motion";
import { Cpu, Wrench, AlertTriangle } from "lucide-react";

export default function PlatformSection() {
  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-[var(--color-glow-cyan)]" />,
      title: "Fragmented Sourcing",
      desc: "Unreliable supply chains and counterfeit spare parts plague the market.",
      glowColor: "var(--color-glow-cyan)"
    },
    {
      icon: <Wrench className="w-8 h-8 text-[var(--color-glow-blue)]" />,
      title: "Manual Operations",
      desc: "Service centers run on outdated, disconnected, and inefficient systems.",
      glowColor: "var(--color-glow-blue)"
    },
    {
      icon: <Cpu className="w-8 h-8 text-[var(--color-glow-purple)]" />,
      title: "Lack of Intelligence",
      desc: "Trial-and-error motherboard diagnostics lead to wasted time and resources.",
      glowColor: "var(--color-glow-purple)"
    },
  ];

  return (
    <section className="relative py-32 overflow-hidden bg-transparent">
      {/* Ambient Glass Glows */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[300px] h-[300px] rounded-full mix-blend-screen filter blur-[100px] opacity-20 bg-[var(--color-glow-purple)]"
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[120px] opacity-15 bg-[var(--color-glow-cyan)]"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-6 text-glow"
          >
            An Industry Worth Billions <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-[var(--color-glow-blue)]">Running Without Infrastructure</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 font-light max-w-2xl mx-auto"
          >
            The global smartphone repair sector is massive, yet it operates on outdated principles. <span className="text-white font-medium drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">We are here to change that.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {problems.map((problem, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="glass-panel p-8 rounded-3xl relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
            >
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" 
                style={{ background: `radial-gradient(circle at center, ${problem.glowColor} 0%, transparent 70%)` }}
              />
              <div className="relative z-10">
                <div 
                  className="mb-8 w-16 h-16 rounded-2xl flex items-center justify-center bg-white/5 border border-white/10 group-hover:bg-white/10 transition-colors"
                  style={{ boxShadow: `0 0 20px -5px ${problem.glowColor}` }}
                >
                  {problem.icon}
                </div>
                <h3 className="text-2xl font-heading font-medium text-white mb-3 group-hover:text-glow transition-all">{problem.title}</h3>
                <p className="text-white/60 font-light leading-relaxed">{problem.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
