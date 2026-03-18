"use client";

import { Instagram, Linkedin, Twitter, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link 
    href={href} 
    className="text-xs text-white/40 hover:text-[#00F0FF] transition-colors font-light"
  >
    {children}
  </Link>
);

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

            <p className="text-white/40 text-sm leading-relaxed mb-6 font-light italic">
              {t('footer.desc')}
            </p>

            {/* Contact Details */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 group">
                <MapPin className="w-4 h-4 text-[#00F0FF] mt-1 group-hover:scale-110 transition-transform" />
                <address className="text-xs text-white/40 not-italic leading-relaxed">
                  <span dangerouslySetInnerHTML={{ __html: t('footer.address') }} />
                </address>
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
            <div className="col-span-1">
              <h4 className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.3em] mb-8">{t('footer.platform')}</h4>
              <ul className="space-y-4">
                <li><FooterLink href="#schemic-ai">{t('footer.links.diagnostics')}</FooterLink></li>
                <li><FooterLink href="#hardware">{t('footer.links.repairs')}</FooterLink></li>
                <li><FooterLink href="#connect">{t('footer.links.sourcing')}</FooterLink></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.3em] mb-8">{t('footer.software')}</h4>
              <ul className="space-y-4">
                <li><FooterLink href="#erp">{t('footer.links.erp')}</FooterLink></li>
                <li><FooterLink href="#inventory">{t('footer.links.inventory')}</FooterLink></li>
                <li><FooterLink href="#billing">{t('footer.links.billing')}</FooterLink></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.3em] mb-8">{t('footer.network')}</h4>
              <ul className="space-y-4">
                <li><FooterLink href="#suppliers">{t('footer.links.suppliers')}</FooterLink></li>
                <li><FooterLink href="#logistics">{t('footer.links.logistics')}</FooterLink></li>
                <li><FooterLink href="#marketplace">{t('footer.links.marketplace')}</FooterLink></li>
              </ul>
            </div>

            <div className="col-span-1">
              <h4 className="text-[10px] font-bold text-[#00F0FF] uppercase tracking-[0.3em] mb-8">{t('footer.company')}</h4>
              <ul className="space-y-4">
                <li><FooterLink href="/about">{t('footer.links.about')}</FooterLink></li>
                <li><FooterLink href="/privacy">{t('footer.links.privacy')}</FooterLink></li>
                <li><FooterLink href="/terms">{t('footer.links.terms')}</FooterLink></li>
              </ul>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-[10px] tracking-widest uppercase flex items-center gap-2">
            © {new Date().getFullYear()} SETBIN. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6">
            <FooterLink href="/privacy">{t('footer.links.privacy')}</FooterLink>
            <FooterLink href="/terms">{t('footer.links.terms')}</FooterLink>
            <FooterLink href="/disclaimer">{t('footer.links.disclaimer')}</FooterLink>
          </div>
        </div>

      </div>
    </footer>
  );
}
