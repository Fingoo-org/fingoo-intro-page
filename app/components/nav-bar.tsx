"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/images/logo.png";
import GooglePlay_Badge from "@/public/images/googlePlay_badge.png";
import App_Store_Badge from "@/public/images/app_store_badge.svg";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "./sheet";
import { Button } from "@/app/components/button";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { getLenis } from "@/hooks/use-gsap";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    let rafId: number;

    const updateScroll = () => {
      let progress = 0;
      let currentScroll = 0;

      if (lenis) {
        currentScroll = lenis.scroll || 0;
        const limit = lenis.limit || 0;
        progress = limit > 0 ? Math.min((currentScroll / limit) * 100, 100) : 0;
      } else {
        currentScroll = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        progress = Math.min((currentScroll / (docHeight - windowHeight)) * 100, 100);
      }

      setScrolled(currentScroll > 20);

      // 상태 업데이트 대신 직접 스타일 적용 (부드러움)
      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }

      rafId = requestAnimationFrame(updateScroll);
    };

    rafId = requestAnimationFrame(updateScroll);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  const navLinks = [
    { href: "#services", label: "서비스" },
    { href: "#brand", label: "브랜드" },
    { href: "#gamification", label: "게임화" },
    { href: "#app-features", label: "기능" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-neutral-950/80 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="#" className="relative z-10 flex items-center gap-2 group">
            <div className="relative overflow-hidden">
              <Image
                src={Logo}
                alt="FINGOO"
                className="h-8 lg:h-10 w-auto"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-fingoo-main group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href="http://pf.kakao.com/_XQSKn"
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white transition-colors duration-300 group"
            >
              고객센터
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-fingoo-main group-hover:w-full transition-all duration-300" />
            </a>
            <div className="flex items-center gap-3">
              <a
                href="https://play.google.com/store/apps/details?id=app.fingoo.main"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={GooglePlay_Badge}
                  alt="Google Play"
                  className="h-9 w-auto"
                />
              </a>
              <a
                href="https://apps.apple.com/app/id6748242009"
                target="_blank"
                rel="noopener noreferrer"
                className="transform hover:scale-105 transition-transform duration-300"
              >
                <Image
                  src={App_Store_Badge}
                  alt="App Store"
                  className="h-9 w-auto"
                />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${scrolled ? 'text-white' : 'text-neutral-900'} hover:text-fingoo-main hover:bg-white/10 transition-all duration-300`}
                  aria-label="메뉴 열기"
                >
                  <HamburgerMenuIcon className="w-6 h-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[280px] bg-neutral-900/95 backdrop-blur-xl border-l border-white/10"
              >
                <SheetHeader className="mb-8">
                  <div className="flex items-center gap-3">
                    <Image
                      src={Logo}
                      alt="FINGOO"
                      className="h-10 w-auto brightness-0 invert"
                    />
                  </div>
                </SheetHeader>

                <div className="flex flex-col gap-2 mb-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center justify-between px-4 py-3.5 rounded-xl text-neutral-300 hover:text-white hover:bg-white/10 transition-all duration-300 group"
                    >
                      <span className="font-medium">{link.label}</span>
                    </Link>
                  ))}
                </div>

                {/* App Download */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-xs font-semibold text-neutral-500 mb-4 px-4">앱 다운로드</p>
                  <div className="flex flex-col gap-3 px-4">
                    <a
                      href="https://play.google.com/store/apps/details?id=app.fingoo.main"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 py-3 rounded-xl transition-all duration-300"
                    >
                      <Image
                        src={GooglePlay_Badge}
                        alt="Google Play"
                        className="h-12 w-auto"
                      />
                    </a>
                    <a
                      href="https://apps.apple.com/app/id6748242009"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 py-3 rounded-xl transition-all duration-300"
                    >
                      <Image
                        src={App_Store_Badge}
                        alt="App Store"
                        className="h-[50px] w-auto"
                      />
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 px-4">
                  <a
                    href="http://pf.kakao.com/_XQSKn"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 bg-[#FFC000]/20 rounded-xl text-[#FFE066] hover:bg-[#FFC000]/30 hover:text-white transition-all duration-300"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 3C6.48 3 2 6.48 2 10.5c0 2.5 1.5 4.7 3.8 6.1L5 19l3.5-1.4c1.1.4 2.3.6 3.5.6 5.52 0 10-3.48 10-7.5S17.52 3 12 3z"/>
                    </svg>
                    <span className="font-medium">카카오톡 상담</span>
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full bg-gradient-to-r from-fingoo-main to-accent-blue"
          style={{ width: "0%" }}
        />
      </div>
    </header>
  );
}
