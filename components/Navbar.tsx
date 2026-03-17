"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage, Language } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    };
    if (isLangOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isLangOpen]);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 80; // Navbar height
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? "bg-[#030816]/70 backdrop-blur-lg border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)] py-4 pr-3 lg:pr-4" 
          : "bg-transparent py-6 pr-3 lg:pr-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Glowing Logo Container */}
          <div className="relative group cursor-pointer">
            <div className="absolute -inset-2 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] rounded-xl blur-lg opacity-20 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-9 flex items-center">
              {/* Colored Icon Part (Left 22%) */}
              <img 
                src="/setbin-logo-new.webp" 
                alt="SETBIN" 
                className="h-9 w-auto object-contain object-left relative z-10"
                style={{ clipPath: 'inset(0 69% 0 0)' }}
              />
              {/* White Text Part (Right 78%) */}
              <img 
                src="/setbin-logo-new.webp" 
                alt="" 
                className="h-9 w-auto object-contain object-left absolute top-0 left-0 z-10 brightness-0 invert"
                style={{ clipPath: 'inset(0 0 0 31%)' }}
              />
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/80">
          {[
            { name: t('nav.connect'), id: 'nav-connect', href: '#connect' },
            { name: t('nav.repair'), id: 'nav-repair', href: '#service-pro' },
            { name: t('nav.schemic'), id: 'nav-schemic-ai', href: '#schemic-ai' }
          ].map((item) => (
            <a 
              key={item.name} 
              id={item.id}
              href={item.href}
              onClick={(e) => handleScroll(e, item.href)}
              className="relative group px-1 py-2 hover:text-white transition-colors cursor-pointer block"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="#contact"
            id="nav-connect-us"
            onClick={(e) => handleScroll(e, '#contact')}
            className="relative group px-4 py-2 md:px-6 md:py-2.5 rounded-full overflow-hidden cursor-pointer block whitespace-nowrap"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] opacity-70 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-[1px] bg-[#030816] rounded-full" />
            <span className="relative z-10 text-white font-medium text-xs md:text-sm tracking-wide text-glow">
              <span className="hidden md:inline">{t('nav.connectBtn')}</span>
              <span className="md:hidden">{t('nav.connectBtnMobile')}</span>
            </span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-sm" />
          </a>

          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-white/20 bg-[#030816]/50 hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.2)]"
            >
              <Globe className="w-5 h-5 text-white" />
            </button>
            
            {isLangOpen && (
              <div 
                className="absolute right-0 mt-3 w-36 rounded-2xl border border-white/10 bg-[#030816]/95 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden py-2" 
                style={{ transformOrigin: "top right" }}
              >
                {[
                  { code: 'en', label: 'English (EN)' },
                  { code: 'hi', label: 'Hindi (HI)' },
                  { code: 'ml', label: 'Malayalam (ML)' },
                  { code: 'ta', label: 'Tamil (TA)' },
                  { code: 'te', label: 'Telugu (TE)' },
                  { code: 'kn', label: 'Kannada (KN)' }
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code as Language);
                      setIsLangOpen(false);
                    }}
                    className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-white/10 flex items-center justify-between group ${language === lang.code ? 'text-[var(--color-glow-cyan)] font-medium' : 'text-white/80 hover:text-white'}`}
                  >
                    {lang.label}
                    {language === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-glow-cyan)] shadow-[0_0_8px_var(--color-glow-cyan)]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
