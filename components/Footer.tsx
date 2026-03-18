"use client";

import { Instagram, Linkedin, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#030816] text-white pt-24 pb-12 border-t border-white/5 relative overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[var(--color-glow-blue)] to-transparent opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[var(--color-glow-blue)] rounded-full filter blur-[120px] opacity-5 -translate-y-1/2" />

      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">

          {/* LEFT: Brand + description + contact */}
          <div className="lg:col-span-4 flex flex-col items-start space-y-8">
            {/* Logo */}
            <div className="relative group cursor-pointer">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] rounded-2xl blur-2xl opacity-10 group-hover:opacity-25 transition duration-700" />
              <div className="relative h-10 md:h-12 flex items-center justify-center">
                <img
                  src="/setbin-logo-new.webp"
                  alt="SETBIN"
                  className="h-full w-auto object-contain relative z-10"
                  style={{ clipPath: 'inset(0 69% 0 0)' }}
                />
                <img
                  src="/setbin-logo-new.webp"
                  alt=""
                  className="h-full w-auto object-contain absolute top-0 left-0 z-10 brightness-0 invert opacity-90"
                  style={{ clipPath: 'inset(0 0 0 31%)' }}
                />
              </div>
            </div>

            <p className="text-[12px] text-white/50 leading-loose max-w-[280px]">
              India's first integrated platform for electronics repair shops — connecting technicians, 
              parts suppliers, and AI diagnostics in one ecosystem.
            </p>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={13} className="text-[var(--color-glow-cyan)] mt-0.5 shrink-0" />
                <span className="text-[11px] text-white/40 leading-relaxed">
                  SETBIN Connect Pvt Ltd<br />
                  Kochi, Ernakulam, Kerala — India
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={13} className="text-[var(--color-glow-cyan)] shrink-0" />
                <a href="mailto:official@setbin.com" className="text-[11px] text-white/50 hover:text-[var(--color-glow-cyan)] transition-colors">
                  official@setbin.com
                </a>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
                { icon: Twitter, href: "#", label: "X (Twitter)" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* CENTER + RIGHT: Nav columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10">

            {/* Products */}
            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-5">Platform</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "SETBIN Connect", href: "#connect" },
                  { label: "SETBIN Repair", href: "#setbin-repair" },
                  { label: "Schemic AI", href: "#schemic-ai" },
                  { label: "Global Network", href: "#connect" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>

              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-8 mb-5">Hardware</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "Motherboard Diagnostics", href: "#" },
                  { label: "IC Level Repairs", href: "#" },
                  { label: "Parts Sourcing", href: "#connect" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* SETBIN Repair */}
            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-5">Workshop Software</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "Service Center ERP", href: "#setbin-repair" },
                  { label: "Job Management", href: "#setbin-repair" },
                  { label: "Customer Management", href: "#setbin-repair" },
                  { label: "Inventory Sync", href: "#setbin-repair" },
                  { label: "Billing & Invoicing", href: "#setbin-repair" },
                  { label: "Staff & Roles", href: "#setbin-repair" },
                  { label: "Vendor Accounts", href: "#setbin-repair" },
                  { label: "Reports & Analytics", href: "#setbin-repair" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* Connect Network */}
            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-5">Connect Network</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "Verified Suppliers", href: "#connect" },
                  { label: "Global Distributors", href: "#connect" },
                  { label: "Logistics Partners", href: "#connect" },
                  { label: "Drop-Shipping", href: "#connect" },
                  { label: "Technician Hub", href: "#connect" },
                  { label: "B2B Marketplace", href: "#connect" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>

              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-8 mb-5">Experience</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "Customer Portal", href: "#" },
                  { label: "Technician Dashboard", href: "#" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mb-5">Solutions</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "For Freelance Techs", href: "#" },
                  { label: "For Service Centers", href: "#" },
                  { label: "For Enterprise Chains", href: "#" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>

              <h4 className="text-[10px] text-white/50 uppercase tracking-widest font-bold mt-8 mb-5">Company</h4>
              <div className="space-y-3 flex flex-col items-start">
                {[
                  { label: "About SETBIN", href: "#" },
                  { label: "Careers", href: "#" },
                  { label: "Partner Program", href: "#" },
                  { label: "Privacy Policy", href: "#" },
                  { label: "Terms of Service", href: "#" },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-xs text-white/60 hover:text-[var(--color-glow-cyan)] transition-colors">{label}</a>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-white/25 font-mono">
            © {new Date().getFullYear()} SETBIN Connect Pvt Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms", "Disclaimer"].map(item => (
              <a key={item} href="#" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest">
                {item}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
