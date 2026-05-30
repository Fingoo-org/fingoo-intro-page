"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

// 타이핑 효과를 위한 텍스트 분할
const splitTextForTyping = (text: string) => text.split("");

export function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const textRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);

  const features = [
    {
      title: "수준별 학습 & 퀴즈",
      description: "초보부터 고수까지, 레벨에 맞는 커리큘럼과 퀴즈로 투자를 쉽게 배워보세요.",
    },
    {
      title: "AI 맞춤 종목 추천",
      description: "AI가 데이터를 분석해서 투자 성향에 맞는 미국 주식을 추천해드려요.",
    },
    {
      title: "나만의 금융 AI",
      description: "금융 투자에 특화된 AI가 24시간 언제든 투자 상담을 도와드려요.",
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !contentRef.current) return;

      const titleChars = textRefs.current.filter(Boolean);
      const descChars = descRefs.current.filter(Boolean);

      // 모든 문자 초기에 안 보이게 설정
      gsap.set(titleChars, { opacity: 0 });
      gsap.set(descChars, { opacity: 0 });

      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: "power3.out",
        });
      }

      // 각 feature의 시작 인덱스 계산
      const titleOffsets = [0];
      const descOffsets = [0];
      for (let i = 1; i < features.length; i++) {
        titleOffsets.push(titleOffsets[i-1] + features[i-1].title.length);
        descOffsets.push(descOffsets[i-1] + features[i-1].description.length);
      }

      // Create timeline for scroll-based animations
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=900%",
          scrub: 1,
          pin: true,
        },
      });

      // 각 feature에 대해 애니메이션 추가
      let currentTime = 0.8; // 시작 딜레이
      const titleTypingTime = 1; // title 타이핑 시간
      const descTypingTime = 1; // description 타이핑 시간
      const holdTime = 0.5; // hold 시간
      const fadeOutTime = 0.5; // fade out 시간

      features.forEach((feature, idx) => {
        const titleStart = titleOffsets[idx];
        const descStart = descOffsets[idx];
        const titleLen = feature.title.length;
        const descLen = feature.description.length;
        const progressEl = progressRefs.current[idx];

        const phaseStart = currentTime;
        const titleEnd = phaseStart + titleTypingTime;
        const descEnd = titleEnd + descTypingTime;
        const holdEnd = descEnd + holdTime;
        const nextStart = holdEnd + fadeOutTime;

        // Title 타이핑 효과
        for (let i = 0; i < titleLen; i++) {
          const char = titleChars[titleStart + i];
          if (char) {
            const time = phaseStart + (i / titleLen) * titleTypingTime;
            tl.to(char, { opacity: 1 }, time);
          }
        }

        // Description 타이핑 효과
        for (let i = 0; i < descLen; i++) {
          const char = descChars[descStart + i];
          if (char) {
            const time = titleEnd + (i / descLen) * descTypingTime;
            tl.to(char, { opacity: 1 }, time);
          }
        }

        // Progress bar 애니메이션 (feature 전체 기간 동안 자연스럽게 채워지기)
        if (progressEl) {
          tl.fromTo(
            progressEl,
            { width: "0%" },
            { width: "100%", ease: "none", duration: descEnd - phaseStart },
            phaseStart
          );
        }

        // Fade out (마지막 feature는 제외)
        if (idx < features.length - 1) {
          for (let i = 0; i < titleLen; i++) {
            const char = titleChars[titleStart + i];
            if (char) tl.to(char, { opacity: 0 }, holdEnd);
          }
          for (let i = 0; i < descLen; i++) {
            const char = descChars[descStart + i];
            if (char) tl.to(char, { opacity: 0 }, holdEnd);
          }
        }

        currentTime = nextStart;
      });

      // 마지막 hold
      tl.to({}, { duration: 0.3 }, currentTime);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="h-screen bg-neutral-900 relative overflow-hidden flex items-center justify-center scroll-mt-5"
    >
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-fingoo-main/5 via-neutral-900 to-accent-blue/5" />
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-fingoo-main/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-6 lg:px-12">
        {/* Title */}
        <h2
          ref={titleRef}
          className="text-2xl md:text-3xl font-semibold mb-16 tracking-wide"
        >
          <span className="text-neutral-500">왜</span>{" "}
          <span className="text-fingoo-main font-bold">FINGOO</span>
          <span className="text-neutral-500">인가요?</span>
        </h2>

        {/* Dynamic Content */}
        <div ref={contentRef} className="min-h-[300px] relative">
          {features.map((feature, featureIndex) => {
            const titleOffset = features.slice(0, featureIndex).reduce((acc, f) => acc + f.title.length, 0);
            const descOffset = features.slice(0, featureIndex).reduce((acc, f) => acc + f.description.length, 0);

            return (
              <div key={featureIndex} className="absolute inset-0 space-y-8">
                {/* Title Characters */}
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-0.5">
                    {splitTextForTyping(feature.title).map((char, i) => (
                      <span
                        key={`title-${featureIndex}-${i}`}
                        ref={(el) => { textRefs.current[titleOffset + i] = el; }}
                        className="text-4xl md:text-6xl lg:text-7xl font-bold text-white inline-block will-change-transform"
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description Characters */}
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-0.5">
                    {splitTextForTyping(feature.description).map((char, i) => (
                      <span
                        key={`desc-${featureIndex}-${i}`}
                        ref={(el) => { descRefs.current[descOffset + i] = el; }}
                        className="text-lg md:text-xl text-neutral-400 inline-block will-change-transform"
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="absolute bottom-12 left-6 lg:left-12">
          <div className="flex gap-2">
            <div className="w-12 h-1 bg-neutral-700 rounded-full overflow-hidden">
              <div
                ref={(el) => { progressRefs.current[0] = el; }}
                className="h-full bg-fingoo-main w-0 will-change-transform"
              />
            </div>
            <div className="w-12 h-1 bg-neutral-700 rounded-full overflow-hidden">
              <div
                ref={(el) => { progressRefs.current[1] = el; }}
                className="h-full bg-fingoo-main w-0 will-change-transform"
              />
            </div>
            <div className="w-12 h-1 bg-neutral-700 rounded-full overflow-hidden">
              <div
                ref={(el) => { progressRefs.current[2] = el; }}
                className="h-full bg-fingoo-main w-0 will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
