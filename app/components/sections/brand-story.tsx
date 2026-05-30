"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

// Animated Card
const AnimatedCard = ({
  id,
  title,
  description,
  isActive,
}: {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(card, {
      rotationY: x * 0.03,
      rotationX: -y * 0.03,
      scale: 1.02,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={`group relative p-6 rounded-3xl overflow-hidden flex-shrink-0 w-[280px] h-[360px] transition-all duration-500 ${
        isActive ? "bg-neutral-800 shadow-xl" : "bg-white shadow-lg"
      }`}
      style={{
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient background for active card */}
      {isActive && (
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-gradient-to-br from-fingoo-main/20 via-transparent to-fingoo-main/10" />
        </div>
      )}

      {/* Shine effect */}
      <div className={`absolute inset-0 transition-transform duration-1000 ease-in-out pointer-events-none ${isActive ? "translate-x-full" : "-translate-x-full"}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex flex-col h-full">
          {/* Number badge */}
          <div className={`font-bold transition-all duration-500 ${
            isActive ? "text-6xl text-fingoo-main scale-110" : "text-4xl text-neutral-300"
          }`}>
            {id}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex items-end">
          <div className="w-full">
            <h4 className={`font-bold mb-3 transition-all duration-700 ease-out ${
              isActive ? "text-2xl text-white" : "text-xl text-neutral-900"
            }`}>
              {title}
            </h4>
            {description && (
              <div className={`h-px bg-gradient-to-r from-fingoo-main/50 to-transparent mb-3 transition-all duration-700 ease-out ${
                isActive ? "w-full opacity-100" : "w-1/2 opacity-0"
              }`} />
            )}
            {description && (
              <p className={`leading-relaxed whitespace-pre-line transition-all duration-700 ease-out ${
                isActive ? "text-sm text-neutral-300 opacity-100" : "text-xs text-neutral-600 opacity-0"
              }`}>
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const cards = [
    {
      id: "01",
      title: "철학",
      description: "모두에게 평등한\n투자 기회를 제공합니다",
    },
    {
      id: "02",
      title: "미래",
      description: "AI와 함께하는\n스마트 투자의 시대",
    },
    {
      id: "03",
      title: "비전",
      description: "2030, 누구나 쉽고 빠르게\n똑똑하게 투자하는 세상",
    },
    {
      id: "04",
      title: "미션",
      description: "어려운 금융 개념을\n누구나 쉽게 이해하고\n사용할 수 있도록 만듭니다",
    },
  ];

  // 드래그 핸들링
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    // 드래그 중 슬라이더 이동 효과 (선택 사항)
  }, [isDragging]);

  const handleMouseUp = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (diff < 0 && currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    }
    setIsDragging(false);
  }, [isDragging, startX, currentIndex, cards.length]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1);
      } else if (e.key === "ArrowRight" && currentIndex < cards.length - 1) {
        setCurrentIndex(prev => prev + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, cards.length]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current || !sliderRef.current) return;

      // Title animation
      const titleElements = sectionRef.current.querySelectorAll(".title-animate");
      gsap.from(titleElements, {
        opacity: 0,
        y: 60,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Cards staggered fade in
      const cardWrappers = sliderRef.current.children;
      gsap.from(cardWrappers, {
        opacity: 0,
        y: 80,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="brand"
      ref={sectionRef}
      className="min-h-screen bg-white relative overflow-hidden scroll-mt-5 py-24 lg:py-32"
    >
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-fingoo-main/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-blue/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-fingoo-main tracking-wider uppercase px-4 py-2 rounded-full bg-fingoo-main/10 mb-4 title-animate">
            Brand Story
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 title-animate">
            Fingoo의 이야기
          </h3>
        </div>

        {/* Card Slider */}
        <div
          ref={sliderRef}
          className="relative flex items-center justify-center"
          style={{ height: "400px" }}
          onMouseDown={handleMouseDown}
        >
          {cards.map((card, index) => {
            const offset = index - currentIndex;
            const isCenter = index === currentIndex;

            return (
              <div
                key={card.id}
                className="absolute transition-all duration-500 ease-out"
                style={{
                  transform: `translateX(${offset * 300}px) scale(${isCenter ? 1 : 0.85})`,
                  opacity: isCenter ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.3),
                  zIndex: 10 - Math.abs(offset),
                }}
              >
                <AnimatedCard
                  {...card}
                  isActive={isCenter}
                />
              </div>
            );
          })}
        </div>

        {/* Navigation */}
        <div className="relative flex items-center justify-center gap-8 pt-8" style={{ zIndex: 100 }}>
        {/* Previous button */}
        <button
          onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-out group shadow-md hover:shadow-xl hover:scale-105 hover:bg-fingoo-main"
        >
          <svg className="w-6 h-6 transition-colors duration-300 text-neutral-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Counter */}
        <div className="flex items-center gap-2">
          {cards.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                currentIndex === index ? "w-12 bg-fingoo-main" : "w-6 bg-neutral-300"
              }`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={() => setCurrentIndex(prev => Math.min(cards.length - 1, prev + 1))}
          disabled={currentIndex === cards.length - 1}
          className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-neutral-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300 ease-out group shadow-md hover:shadow-xl hover:scale-105 hover:bg-fingoo-main"
        >
          <svg className="w-6 h-6 transition-colors duration-300 text-neutral-700 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      </div>
    </section>
  );
}
