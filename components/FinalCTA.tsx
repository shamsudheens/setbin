"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="relative h-screen min-h-[800px] overflow-hidden flex flex-col items-center justify-center bg-transparent">
      
      {/* Background Ambient Flows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[-1]">
        <motion.div 
          animate={{ rotate: 360, scale: [1, 1.1, 1] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[180px] opacity-20"
        />
        <motion.div 
          animate={{ rotate: -360, scale: [1, 1.2, 1] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="absolute w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-15 translate-x-1/4"
        />
         <motion.div 
          animate={{ rotate: 180, scale: [1, 1.05, 1] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute w-[500px] h-[500px] bg-[var(--color-glow-purple)] rounded-full mix-blend-screen filter blur-[150px] opacity-10 -translate-x-1/4"
        />
      </div>

      <div className="relative z-10 text-center px-6 mt-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-panel p-16 md:p-24 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.6)] max-w-5xl w-full mx-auto relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          
          <div className="absolute -top-12 -left-12 w-48 h-48 bg-[var(--color-glow-blue)] opacity-20 blur-[60px] rounded-full group-hover:opacity-40 transition-opacity duration-700" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-[var(--color-glow-cyan)] opacity-20 blur-[60px] rounded-full group-hover:opacity-40 transition-opacity duration-700" />

          <h2 className="text-6xl md:text-8xl lg:text-[8rem] font-heading tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/40 mb-8 leading-none drop-shadow-sm">
            SETBIN
          </h2>
          <p className="text-2xl md:text-4xl font-light text-white/80 mx-auto mb-16 py-6 relative">
            <span className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            Infrastructure for the Global<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-[var(--color-glow-blue)] font-medium">Smartphone Service Industry</span>
            <span className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </p>

          <button className="group/btn relative inline-flex items-center gap-3 px-12 py-5 rounded-full glass-panel glass-panel-hover overflow-hidden text-white font-medium text-xl shadow-[0_0_30px_rgba(47,128,237,0.2)] hover:shadow-[0_0_50px_rgba(47,128,237,0.4)] transition-all cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-glow-blue)]/20 to-[var(--color-glow-cyan)]/20 translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 flex items-center gap-4">
              Join the Network
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-white text-white group-hover/btn:text-black transition-colors ml-2">
                <ArrowRight className="w-5 h-5" />
              </div>
            </span>
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-6 w-full text-center z-10">
        <div className="inline-block px-6 py-2 rounded-full glass-panel text-white/40 font-light text-sm tracking-wide">
          © {new Date().getFullYear()} SETBIN Platforms. All rights reserved.
        </div>
      </div>
    </section>
  );
}
