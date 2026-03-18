"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Package, ShoppingCart, Activity } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ConnectSection() {
  const { t } = useLanguage();
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[var(--color-glow-cyan)]" />,
      title: t('connect.features.suppliers'),
      desc: "Connect with certified pros maintaining industry-leading repair standards.",
    },
    {
      icon: <Package className="w-6 h-6 text-[var(--color-glow-blue)]" />,
      title: t('connect.features.tools'),
      desc: "Source original equipment manufacturer (OEM) parts with guaranteed authenticity.",
    },
    {
      icon: <ShoppingCart className="w-6 h-6 text-white" />,
      title: t('connect.features.wholesale'),
      desc: "A streamlined B2B platform customized for bulk orders and reliable delivery.",
    },
    {
      icon: <Activity className="w-6 h-6 text-[var(--color-glow-purple)]" />,
      title: "Inventory Visibility", // Translating features that have explicitly been mapped, leaving desc for brevity 
      desc: "Real-time tracking of supplier stock to prevent repair delays.",
    },
  ];

  return (
    <section id="connect" className="py-32 relative overflow-hidden bg-transparent scroll-mt-20">
      
      {/* Global Standard Glass Grid Background matche to others (64px) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      
      {/* Edge glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          
          <div className="flex-1">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-10 md:p-14 rounded-[2rem] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-blue)]/10 to-transparent pointer-events-none" />
              

              
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-heading tracking-tight text-white mb-6 break-words leading-snug" dangerouslySetInnerHTML={{ __html: t('connect.title') }} />
              <p className="text-2xl font-light text-white/90 mb-6 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                {t('connect.chip')}
              </p>
              <p className="text-lg font-light text-white/60 leading-relaxed max-w-lg mb-8">
                {t('connect.desc')}
              </p>
            </motion.div>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl glass-panel glass-panel-hover overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors" />
                <div className="relative z-10">
                  <div className="mb-6 w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(47,128,237,0.2)] transition-all">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-heading text-white mb-2 font-medium">{feature.title}</h4>
                  <p className="text-sm font-light text-white/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
