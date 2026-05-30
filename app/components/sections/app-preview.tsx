"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@/hooks/use-gsap";

interface AppPreviewProps {
  openLink: (url: string) => void;
}

const floatingTexts = [
  "연준 금리 인하 기대", "NVDA 52주 신고가", "TSLA 실적 발표",
  "반도체 업황 개선", "AI 섹터 강세", "원/달러 환율",
  "CPI 지표 발표", "테마주 뉴스", "경제 뉴스 속보",
  "종목 분석 리포트", "시장 동향", "투자 포트폴리오",
  "재무제표 분석", "PER/PBR 비율", "배당수익률",
];

export function AppPreview({ openLink }: AppPreviewProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textsRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }

      if (appRef.current) {
        gsap.set(appRef.current, { scale: 0.9, opacity: 0.6 });
      }

      const textElements = textsRef.current?.querySelectorAll(".ft");
      if (textElements) {
        textElements.forEach((el) => {
          gsap.set(el, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            opacity: 0.3 + Math.random() * 0.2,
          });
        });
      }

      if (textElements) {
        textElements.forEach((el) => {
          gsap.to(el, {
            x: (Math.random() - 0.5) * 60,
            y: (Math.random() - 0.5) * 60,
            duration: 3 + Math.random() * 2,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const textElements = textsRef.current?.querySelectorAll(".ft");
      if (textElements) {
        textElements.forEach((el) => {
          const elRect = el.getBoundingClientRect();
          const elCenterX = elRect.left + elRect.width / 2 - rect.left;
          const elCenterY = elRect.top + elRect.height / 2 - rect.top;

          const dx = elCenterX - x;
          const dy = elCenterY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const maxDistance = 180;
          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance;
            const angle = Math.atan2(dy, dx);
            const moveDistance = force * 100;

            gsap.to(el, {
              x: Math.cos(angle) * moveDistance,
              y: Math.sin(angle) * moveDistance,
              opacity: 1 - force * 0.9,
              duration: 0.2,
              ease: "power2.out",
            });
          }
        });
      }

      if (appRef.current) {
        gsap.to(appRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.2,
        });
      }
    };

    const handleMouseLeave = () => {
      const textElements = textsRef.current?.querySelectorAll(".ft");
      if (textElements) {
        textElements.forEach((el) => {
          gsap.to(el, {
            x: (Math.random() - 0.5) * 50,
            y: (Math.random() - 0.5) * 50,
            opacity: 0.3 + Math.random() * 0.2,
            duration: 0.8,
            ease: "power2.out",
          });
        });
      }

      if (appRef.current) {
        gsap.to(appRef.current, {
          scale: 0.9,
          opacity: 0.6,
          duration: 0.3,
        });
      }
    };

    const section = sectionRef.current;
    section?.addEventListener("mousemove", handleMouseMove);
    section?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      section?.removeEventListener("mousemove", handleMouseMove);
      section?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-gradient-to-br from-fingoo-main/10 via-accent-blue/10 to-accent-purple/10 relative overflow-hidden"
    >
      {/* 배경 텍스트 */}
      <div ref={textsRef} className="absolute inset-0 pointer-events-none">
        {floatingTexts.map((text, i) => (
          <span
            key={i}
            className="ft absolute text-xs md:text-sm font-medium text-fingoo-main/40 whitespace-nowrap"
            style={{
              left: `${10 + (i % 5) * 20}%`,
              top: `${10 + Math.floor(i / 5) * 18}%`,
            }}
          >
            {text}
          </span>
        ))}
      </div>

      {/* 앱 (중앙) */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div ref={appRef} className="relative w-52 md:w-64">
          <div className="relative bg-white rounded-[2rem] p-1 shadow-lg">
            <div className="aspect-[9/19] bg-white rounded-[1.8rem] overflow-hidden flex flex-col items-center justify-center p-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fingoo-main to-accent-blue flex items-center justify-center mb-3">
                <span className="text-2xl font-bold text-white">F</span>
              </div>
              <h3 className="text-base font-bold text-neutral-800 mb-1">Fingoo</h3>
              <p className="text-neutral-400 text-xs mb-3">AI 투자분석</p>
              <div className="w-full h-1 bg-fingoo-main/20 rounded-full overflow-hidden">
                <div className="h-full w-3/4 bg-fingoo-main rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            ref={titleRef}
            className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-800 leading-tight mb-3"
          >
            정보의 홍수 속에서 <span className="text-fingoo-main">핵심만</span>
          </h2>
          <p className="text-xs text-neutral-600 mb-6">마우스를 움직여보세요</p>

          <div className="flex justify-center gap-4 mb-6">
            {[
              { value: "30만+", label: "데이터" },
              { value: "10만+", label: "다운로드" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-lg font-bold text-fingoo-main">{stat.value}</div>
                <div className="text-xs text-neutral-500">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <Image
              src="/images/googlePlay_badge.png"
              alt="Google Play"
              width={120}
              height={36}
              className="h-8 w-auto opacity-70 hover:opacity-100 cursor-pointer"
              onClick={() => openLink("https://play.google.com/store/apps/details?id=app.fingoo.main")}
            />
            <Image
              src="/images/app_store_badge.svg"
              alt="App Store"
              width={108}
              height={36}
              className="h-8 w-auto opacity-70 hover:opacity-100 cursor-pointer"
              onClick={() => openLink("https://apps.apple.com/app/id6748242009")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
