"use client";

import { motion } from "framer-motion";
import { Info, Target, Eye } from "lucide-react";

export default function PlatformSection() {
  return (
    <section id="about" className="relative py-40 overflow-hidden bg-transparent">
      {/* Subtle Ambient Glows */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] bg-[var(--color-glow-blue)]" />
        <div className="absolute bottom-[20%] right-[30%] w-[400px] h-[400px] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.05] bg-[var(--color-glow-cyan)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-8"
          >
            <Info className="w-3.5 h-3.5 text-[var(--color-glow-cyan)]" />
            <span className="text-[10px] font-medium text-white/40 uppercase tracking-[0.3em]">About Us</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-10 leading-[1.15]"
          >
            Building the Digital Backbone for the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-[var(--color-glow-blue)]">Smartphone Service Ecosystem</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-3xl mx-auto"
          >
            SETBIN connects technicians, service centers, and spare parts suppliers through a structured, trusted, and intelligent platform.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
             <div className="flex items-center gap-3 mb-4">
              <Eye className="w-5 h-5 text-[var(--color-glow-blue)]" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-[0.2em]">Our Vision</h3>
            </div>
            <p className="text-lg text-white/50 font-light leading-relaxed">
              To become the most trusted digital infrastructure platform for the global smartphone servicing industry — a structured, transparent, and data-driven ecosystem.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-[var(--color-glow-cyan)]" />
              <h3 className="text-sm font-semibold text-white uppercase tracking-[0.2em]">Our Mission</h3>
            </div>
            <p className="text-lg text-white/50 font-light leading-relaxed">
              To empower the global repair community with the tools they need to operate efficiently, source genuine parts reliably, and diagnose complex device faults.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-32"
        >
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent mx-auto mb-10" />
          <p className="text-lg md:text-xl font-light text-white/30 leading-relaxed italic max-w-3xl mx-auto">
            &quot;SETBIN is building an ecosystem where operational infrastructure and <span className="text-white/50 font-normal">technical intelligence</span> come together to transform how repairs are performed worldwide.&quot;
          </p>
        </motion.div>
      </div>
    </section>
  );
}
