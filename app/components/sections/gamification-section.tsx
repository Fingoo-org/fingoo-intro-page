"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

// Feature Item with Hover Animation
const FeatureItem = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!itemRef.current) return;

    gsap.from(itemRef.current, {
      opacity: 0,
      x: -50,
      duration: 0.6,
      delay: index * 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: itemRef.current,
        start: "top 85%",
      },
    });
  }, [index]);

  return (
    <div
      ref={itemRef}
      className="flex items-start gap-4 group cursor-pointer"
    >
      <div className="w-14 h-14 rounded-2xl bg-fingoo-main/10 flex items-center justify-center flex-shrink-0 group-hover:bg-fingoo-main/20 transition-all duration-300">
        <span className="text-fingoo-main">
          {icon}
        </span>
      </div>
      <div>
        <h4 className="text-xl font-bold text-white mb-2 group-hover:text-fingoo-main transition-colors">
          {title}
        </h4>
        <p className="text-neutral-400">{description}</p>
      </div>
    </div>
  );
};



export function GamificationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imagesRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "챕터별 단계 학습",
      description: "주식 기초부터 심화까지, 체계적인 챕터로 구성된 커리큘럼을 따라가세요.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "퀴즈와 문제 풀이",
      description: "배운 내용을 바로 확인하세요. PERFECT! 배지를 달성하는 성취감을 느껴보세요.",
    },
    {
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      title: "레벨 & 성취 시스템",
      description: "Lv.1부터 시작해서 점점 레벨업! 학습 기록이 쌓이고 다음 챕터가 해금됩니다.",
    },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      const elements = sectionRef.current?.querySelectorAll("h3, span, p");
      if (elements) {
        gsap.from(elements, {
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

      // Animate images
      const images = imagesRef.current?.querySelectorAll("img");
      if (images) {
        gsap.from(images, {
          opacity: 0,
          scale: 0.8,
          rotation: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imagesRef.current,
            start: "top 80%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gamification"
      ref={sectionRef}
      className="min-h-screen bg-neutral-900 relative overflow-hidden scroll-mt-5 flex flex-col"
    >
      <div className="container mx-auto px-4 lg:px-8 relative z-10 flex-1 flex flex-col py-24 lg:py-32">
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-semibold text-fingoo-main tracking-wider uppercase px-4 py-2 rounded-full bg-fingoo-main/10 mb-6">
            Gamified Learning
          </span>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-4 mb-4">
            FINGOO와 함께 즐겁게!
          </h3>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
            게임형 교육으로 투자 공부를 더 재미있게
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto flex-1">
          {/* 왼쪽: 게임화 요소 설명 */}
          <div className="flex-1 space-y-6 lg:space-y-8">
            {features.map((feature, index) => (
              <FeatureItem key={index} {...feature} index={index} />
            ))}
          </div>

          {/* 오른쪽: 실제 앱 이미지 */}
          <div ref={imagesRef} className="flex-1 relative flex items-center justify-center">
            <div className="relative z-10 w-full max-w-sm">
              <div className="absolute -inset-4 bg-fingoo-main/20 rounded-3xl blur-2xl" />
              <div className="relative grid grid-cols-2 gap-3 lg:gap-4">
                {/* 게임화 학습 화면 */}
                <div className="shadow-xl rounded-2xl group cursor-pointer overflow-visible">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/mock-home.png"
                      alt="메인 홈 화면"
                      width={260}
                      height={450}
                      className="w-full h-auto rounded-2xl"
                    />
                  </div>
                </div>
                {/* 랭킹 화면 */}
                <div className="shadow-xl rounded-2xl translate-y-4 lg:translate-y-8 group cursor-pointer overflow-visible">
                  <div className="transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/mock-rank.png"
                      alt="랭킹 화면"
                      width={260}
                      height={450}
                      className="w-full h-auto rounded-2xl"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

