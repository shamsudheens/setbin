"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowRight, MessageSquare, Zap, Navigation } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const contactCards = [
  {
    icon: MapPin,
    title: "Office Location",
    value: "SETTINGS Service Center Ernakulam",
    sub: "Kochi, Kerala — India",
    color: "text-[var(--color-glow-cyan)]",
    glow: "rgba(0,240,255,0.15)",
    border: "rgba(0,240,255,0.2)",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    value: "+91 (XXX) XXX-XXXX",
    sub: "Mon–Sat · 10AM – 7PM IST",
    color: "text-[var(--color-glow-blue)]",
    glow: "rgba(47,128,237,0.15)",
    border: "rgba(47,128,237,0.2)",
  },
  {
    icon: Mail,
    title: "Enterprise Email",
    value: "official@setbin.com",
    sub: "Response within 24 hours",
    color: "text-purple-400",
    glow: "rgba(157,78,221,0.15)",
    border: "rgba(157,78,221,0.2)",
  },
];

export default function ContactSection() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-transparent" id="contact">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[180px] opacity-[0.08] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[var(--color-glow-blue)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07] translate-y-1/4 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-glow-blue)]/20 bg-[var(--color-glow-blue)]/10 text-[var(--color-glow-cyan)] font-bold text-xs tracking-[0.2em] uppercase mb-2"
          >
            <MessageSquare size={13} className="animate-pulse" />
            {t('contact.chip')}
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading tracking-tight text-white/90 leading-[1.1]"
            dangerouslySetInnerHTML={{ __html: t('contact.title') }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base text-white/50 font-light max-w-xl mx-auto"
          >
            {t('contact.desc')}
          </motion.p>
        </div>

        {/* CONTACT CARDS + MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Left: Contact info cards */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {contactCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative p-6 rounded-[1.75rem] border bg-[#030816]/80 backdrop-blur-xl overflow-hidden hover:scale-[1.02] transition-all duration-500"
                  style={{ borderColor: card.border }}
                >
                  {/* Card glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 30% 50%, ${card.glow}, transparent 70%)` }}
                  />
                  <div
                    className="absolute inset-0 opacity-30 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 30% 50%, ${card.glow}, transparent 70%)` }}
                  />

                  <div className="relative z-10 flex items-center gap-5">
                    {/* Icon box */}
                    <div
                      className="w-14 h-14 rounded-[1.1rem] flex items-center justify-center shrink-0 border"
                      style={{
                        background: `${card.glow}`,
                        borderColor: card.border,
                        boxShadow: `0 0 20px ${card.glow}`,
                      }}
                    >
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1">{card.title}</div>
                      <div className={`text-base font-bold ${card.color} truncate`}>{card.value}</div>
                      <div className="text-[10px] text-white/30 mt-0.5">{card.sub}</div>
                    </div>

                    <ArrowRight size={16} className="text-white/20 group-hover:text-white/60 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>
                </motion.div>
              );
            })}

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mt-2"
            >
              <a
                href="mailto:official@setbin.com"
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] text-white rounded-[1.2rem] font-bold text-sm shadow-[0_10px_40px_rgba(47,128,237,0.3)] active:scale-95 transition-all"
              >
                <Zap size={15} /> Send a Message
              </a>
            </motion.div>
          </div>

          {/* Right: Map */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative rounded-[2rem] overflow-hidden border border-white/10 bg-[#030816]/60 backdrop-blur-xl shadow-[0_40px_80px_rgba(0,0,0,0.6)] min-h-[400px] lg:min-h-[520px]"
          >
            {/* Map header bar */}
            <div className="absolute top-0 left-0 right-0 z-20 px-5 py-3 flex items-center justify-between border-b border-white/5 bg-[#030816]/80 backdrop-blur-xl">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/30" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/30" />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-cyan)] animate-pulse" />
                <span className="text-[9px] font-mono text-white/40 tracking-[0.2em] uppercase">SETBIN // ERNAKULAM</span>
              </div>
            </div>

            {/* Map iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6186597659757!2d76.29095427535252!3d9.965650973624177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087349edc10d73%3A0xd0b917f0c060480f!2sSETTINGS%20Service%20Center%20Ernakulam!5e0!3m2!1sen!2sin!4v1773643755937!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ 
                border: 0, 
                filter: 'invert(90%) hue-rotate(180deg) saturate(0.8) brightness(0.85)', 
                position: 'absolute', 
                top: '44px',
                left: 0,
                right: 0,
                bottom: 0,
                height: 'calc(100% - 44px)'
              }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

            {/* Map overlay top fade */}
            <div className="absolute top-[44px] left-0 right-0 h-10 bg-gradient-to-b from-[#030816]/60 to-transparent z-10 pointer-events-none" />
            {/* Map overlay bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#030816]/80 to-transparent z-10 pointer-events-none" />

            {/* Get Directions button */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=SETTINGS+Service+Center+Ernakulam&destination_place_id=ChIJs9DB2TlzbzsRD0hgwPB3Cb0"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-5 right-5 z-30 flex items-center gap-2 px-4 py-2.5 bg-[#030816]/90 border border-white/20 rounded-[0.9rem] text-white text-xs font-bold backdrop-blur-xl hover:bg-white/10 hover:border-[var(--color-glow-cyan)]/50 hover:text-[var(--color-glow-cyan)] transition-all shadow-[0_8px_24px_rgba(0,0,0,0.5)] group"
            >
              <Navigation size={13} className="group-hover:text-[var(--color-glow-cyan)] transition-colors" />
              Get Directions
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
