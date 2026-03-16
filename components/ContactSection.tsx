"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-32 relative overflow-hidden bg-transparent" id="contact">
      
      {/* Background Decor */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: "linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff), linear-gradient(45deg, #fff 25%, transparent 25%, transparent 75%, #fff 75%, #fff)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }} />
      <div className="absolute top-[30%] right-0 w-[600px] h-[600px] bg-[var(--color-glow-cyan)] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.15] -translate-y-1/2 translate-x-1/4" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/70 font-medium text-sm mb-6 backdrop-blur-md"
          >
            <MapPin className="w-4 h-4 text-[var(--color-glow-blue)]" /> Global Presence
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-heading tracking-tight text-white mb-6"
          >
            Connect With<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-glow-cyan)] to-[var(--color-glow-blue)]">SETBIN</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl font-light text-white/70"
          >
            Visit our operational headquarters or reach out for enterprise infrastructure inquiries.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-0 rounded-[2rem] border border-white/10 bg-[#050B14]/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
          
          <div className="flex-1 flex flex-col justify-center space-y-10 p-10 lg:p-14 border-b lg:border-b-0 lg:border-r border-white/10 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-glow-blue)]/5 to-transparent pointer-events-none" />

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-start gap-6 relative z-10"
            >
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[var(--color-glow-cyan)] shadow-[0_0_15px_rgba(0,240,255,0.15)] mt-1">
                  <MapPin className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-xl font-heading font-medium text-white mb-2">Office Location</h4>
                  <p className="text-white/60 font-light text-base leading-relaxed">
                    SETTINGS Service Center Ernakulam<br/>
                    Kerala, India
                  </p>
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-start gap-6 relative z-10"
            >
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[var(--color-glow-blue)] shadow-[0_0_15px_rgba(47,128,237,0.15)] mt-1">
                  <Phone className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-xl font-heading font-medium text-white mb-2">Direct Contact</h4>
                  <p className="text-white/60 font-light text-base hover:text-white transition-colors cursor-pointer inline-block">Support: +91 (XXX) XXX-XXXX</p>
               </div>
            </motion.div>

             <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-start gap-6 relative z-10"
            >
               <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 text-[var(--color-glow-purple)] shadow-[0_0_15px_rgba(157,78,221,0.15)] mt-1">
                  <Mail className="w-6 h-6" />
               </div>
               <div>
                  <h4 className="text-xl font-heading font-medium text-white mb-2">Enterprise Email</h4>
                  <p className="text-[var(--color-glow-blue)] font-light text-base hover:text-white transition-colors cursor-pointer inline-block drop-shadow-[0_0_5px_rgba(47,128,237,0.5)]">hello@setbin.com</p>
               </div>
            </motion.div>
          </div>

          <div className="flex-1 w-full min-h-[400px] lg:min-h-full p-2 relative bg-white/[0.02]">
             {/* Map Container Border */}
             <div className="absolute inset-0 m-2 rounded-3xl border border-white/10 bg-black/20 pointer-events-none" />
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.6186597659757!2d76.29095427535252!3d9.965650973624177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b087349edc10d73%3A0xd0b917f0c060480f!2sSETTINGS%20Service%20Center%20Ernakulam!5e0!3m2!1sen!2sin!4v1773643755937!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) opacity(0.8)' }} 
              className="relative z-10 p-2 rounded-[1.8rem]"
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
