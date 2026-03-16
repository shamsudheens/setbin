"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Laptop, Wrench, Search, CreditCard, Clock, Smartphone } from "lucide-react";

export default function ServiceProSection() {
  const steps = [
    { name: "Device Intake", icon: <Smartphone className="w-5 h-5" />, color: "var(--color-glow-blue)" },
    { name: "Diagnosis", icon: <Search className="w-5 h-5" />, color: "var(--color-glow-cyan)" },
    { name: "Parts Selection", icon: <CheckCircle2 className="w-5 h-5" />, color: "var(--color-glow-purple)" },
    { name: "Repair Process", icon: <Wrench className="w-5 h-5" />, color: "var(--color-glow-cyan)" },
    { name: "Billing", icon: <CreditCard className="w-5 h-5" />, color: "var(--color-glow-blue)" },
    { name: "History", icon: <Clock className="w-5 h-5" />, color: "var(--color-glow-purple)" },
  ];

  return (
    <section className="py-32 relative overflow-hidden bg-transparent">
      {/* Soft Glow Background */}
      <div className="absolute inset-0 pointer-events-none z-[-1] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-gradient-to-r from-[var(--color-glow-blue)]/5 via-[var(--color-glow-cyan)]/10 to-[var(--color-glow-purple)]/5 blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 font-medium text-sm mb-6 backdrop-blur-md"
          >
            <Laptop className="w-4 h-4 text-[var(--color-glow-cyan)]" /> MODULE 02
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-6"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-white">Service Pro</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-light text-white/70"
          >
            The comprehensive operating system designed specifically for modern smartphone service centers.
          </motion.p>
        </div>

        {/* Glass Dashboard Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-5xl mx-auto rounded-[2rem] border border-white/10 bg-[#050B14]/60 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5),auto_auto_auto_auto_rgba(47,128,237,0.1)_inset] overflow-hidden"
        >
          {/* Top Bar Mockup */}
          <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.02] border-b border-white/10 backdrop-blur-md">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-white/20 transition-colors hover:bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-white/20 transition-colors hover:bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-white/20 transition-colors hover:bg-green-400" />
            </div>
            <div className="ml-4 text-xs font-medium tracking-wider text-white/40 font-mono">Service Pro Workspace // Admin</div>
          </div>

          <div className="p-8 md:p-12 relative">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[var(--color-glow-blue)] opacity-10 blur-[100px] rounded-full pointer-events-none" />

            {/* Workflow Timeline */}
            <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-12 z-10">
              {/* Connecting Line (Desktop) */}
              <div className="hidden md:block absolute top-1/2 left-8 right-8 h-0.5 bg-white/10 -z-10 -translate-y-1/2 overflow-hidden shadow-[0_0_10px_rgba(47,128,237,0.2)]">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[var(--color-glow-blue)] via-[var(--color-glow-cyan)] to-[var(--color-glow-purple)] shadow-[0_0_10px_var(--color-glow-cyan)]"
                  initial={{ width: "0%" }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </div>

              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (i * 0.2) }}
                  className="relative flex flex-row md:flex-col items-center gap-4 group w-full md:w-auto"
                >
                  {/* Connecting Line (Mobile) */}
                  {i !== steps.length - 1 && (
                    <div className="md:hidden absolute left-[1.1rem] top-12 bottom-[-40px] w-0.5 bg-gradient-to-b from-[var(--color-glow-blue)] to-white/10 -z-10" />
                  )}

                  <div 
                    className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#050B14] border border-white/20 text-white shadow-lg group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                  >
                     <div 
                        className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity"
                        style={{ backgroundColor: step.color }}
                     />
                    <div className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]">
                      {step.icon}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-center mt-2 px-2">
                    <span className="text-xs font-medium text-white/80 uppercase tracking-wider group-hover:text-white transition-colors text-center">{step.name}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Dummy dashboard metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative z-10">
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-blue)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Active Repairs</div>
                <div className="text-5xl font-heading font-light text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">142</div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-glow-blue)] to-transparent opacity-50" />
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-cyan)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Avg. Diagnosis Time</div>
                <div className="text-5xl font-heading font-light text-white mt-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">12<span className="text-2xl text-white/60 ml-1">min</span></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-glow-cyan)] to-transparent opacity-50" />
              </div>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] backdrop-blur-md relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-purple)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Parts Status</div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="w-3 h-3 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF] animate-pulse" />
                  <div className="text-3xl font-heading font-light text-white tracking-wide">OPTIMAL</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--color-glow-purple)] to-transparent opacity-50" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
