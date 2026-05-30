"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

export function PageFooter() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      const elements = footerRef.current?.querySelectorAll(".footer-animate");
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="py-20 bg-neutral-950 border-t border-white/10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-5xl mx-auto">
          {/* Logo */}
          <div className="footer-animate mb-12">
            <span className="text-2xl font-bold text-white">Fingoo</span>
          </div>

          {/* Links Grid */}
          <div className="footer-animate grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-semibold mb-4">서비스</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://play.google.com/store/apps/details?id=app.fingoo.main" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    Google Play
                  </a>
                </li>
                <li>
                  <a href="https://apps.apple.com/app/id6748242009" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    App Store
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">문의</h4>
              <ul className="space-y-2">
                <li>
                  <a href="https://pf.kakao.com/_XQSKn" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    카카오톡 상담
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/fingoo.official" target="_blank" rel="noopener noreferrer" className="text-neutral-500 hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-neutral-500">
                <li>상호: 핀구</li>
                <li>대표: 김도경</li>
                <li>사업자등록번호: 218-44-01152</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">주소</h4>
              <p className="text-neutral-500 text-sm leading-relaxed">
                경기도 화성시 효행로 1068, 6층 603-D64호
                <br />
                (병점동, 리더스프라자)
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-animate pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm text-neutral-500">
              <span>© 2025 Fingoo. All rights reserved.</span>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">
                개인정보처리방침
              </a>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline">
                이용약관
              </a>
            </div>
            <div className="flex items-center gap-6 text-sm text-neutral-500">
              <a href="https://pf.kakao.com/_XQSKn" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                카카오톡
              </a>
              <a href="https://www.instagram.com/fingoo.official" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
