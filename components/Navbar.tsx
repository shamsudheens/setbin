"use client";

import { useState, useEffect } from "react";


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          {[
            { name: 'About us', id: 'nav-about', href: '#about' },
            { name: 'Connect', id: 'nav-connect', href: '#connect' },
            { name: 'Service Pro', id: 'nav-service-pro', href: '#service-pro' },
            { name: 'Schemic AI', id: 'nav-schemic-ai', href: '#schemic-ai' }
          ].map((item) => (
            <a 
              key={item.name} 
              id={item.id}
              href={item.href}
              className="relative group px-1 py-2 hover:text-white transition-colors cursor-pointer block"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        <a 
          href="#contact"
          id="nav-connect-us"
          className="relative group px-6 py-2.5 rounded-full overflow-hidden cursor-pointer block"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-glow-blue)] to-[var(--color-glow-cyan)] opacity-70 group-hover:opacity-100 transition-opacity" />
          <div className="absolute inset-[1px] bg-[#030816] rounded-full" />
          <span className="relative z-10 text-white font-medium text-sm tracking-wide text-glow">
            Connect with us
          </span>
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-full blur-sm" />
        </a>
      </div>
    </nav>
  );
}
