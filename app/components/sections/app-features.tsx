"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

// Interactive Feature Card
const FeatureCard = ({
  badge,
  title,
  description,
  index,
}: {
  badge: string;
  title: string;
  description: string;
  index: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    // Staggered entry animation
    gsap.from(cardRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0.6,
      delay: index * 0.1,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: cardRef.current,
        start: "top 85%",
      },
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative h-[180px] md:h-[220px] lg:h-[280px] border-2 border-neutral-200 rounded-2xl p-6 hover:border-fingoo-main/50 transition-all duration-300 bg-white shadow-sm overflow-hidden"
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-fingoo-main/5 via-transparent to-fingoo-main/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        <span className="inline-block text-xs font-bold text-fingoo-main tracking-wider uppercase mb-6">
          {badge}
        </span>

        <h4 className="text-lg font-bold text-neutral-900 mb-5">
          {title}
        </h4>

        <p className="text-sm text-neutral-600 flex-1">{description}</p>
      </div>
    </div>
  );
};

export function AppFeatures() {
  const sectionRef = useRef<HTMLElement>(null);

  const features = [
    {
      badge: "AI TUTOR",
      title: "LLM AI 투자 상담",
      description: "투자 궁금한 건 AI에게 24시간 언제든 물어보세요. 친절하게 답변해드려요.",
    },
    {
      badge: "FLASH CARDS",
      title: "투자 개념 카드 학습",
      description: "핵심 투자 개념을 카드 형식으로 쉽게 배우고 기억하세요.",
    },
    {
      badge: "QUIZ GAME",
      title: "주식 용어 맞추기 게임",
      description: "객관식 퀴즈와 단어 완성 게임으로 배운 개념을 재미있게 복습해요.",
    },
    {
      badge: "RANKING",
      title: "출석 & 랭킹 보상",
      description: "출석, 학습, 게임으로 경험치를 모아 랭킹을 경쟁하세요. 시즌별 보상이 기다립니다.",
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      const titles = sectionRef.current?.querySelectorAll("h3, span, p");
      if (titles) {
        gsap.from(titles, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="app-features"
      ref={sectionRef}
      className="min-h-screen bg-white relative scroll-mt-5 flex flex-col py-24 lg:py-32"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-fingoo-main tracking-wider uppercase px-4 py-2 rounded-full bg-fingoo-main/10 mb-6">
            Features
          </span>
          <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4">
            FINGOO가 제공하는 핵심 기능
          </h3>
          <p className="text-base text-neutral-600 max-w-2xl mx-auto">
            복잡한 투자 분석을 AI가 쉽게 만들어드려요
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index}>
              <FeatureCard {...feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
