"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

export function CareerSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const positions = [
    {
      title: "미래전략실 RA",
      link: "https://forms.gle/SsvPbkDsT9T3tP6d9",
    },
    // {
    //   title: "백엔드 개발자",
    //   link: "https://forms.gle/SsvPbkDsT9T3tP6d9",
    // },
    // {
    //   title: "AI 개발자",
    //   link: "https://forms.gle/SsvPbkDsT9T3tP6d9",
    // },
  ];

  useGSAP(() => {
    const ctx = gsap.context(() => {
      if (!sectionRef.current) return;

      const elements = sectionRef.current.querySelectorAll("h3, p, .position-card");
      if (elements) {
        gsap.fromTo(
          elements,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 lg:py-28 bg-neutral-100 relative"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
            FINGOO 팀과 함께 성장하세요
          </h3>
          <p className="text-neutral-600 mb-12 max-w-2xl mx-auto">
            핑구는 투자 교육을 더 쉽고 재미있게 만들 기술과 콘텐츠를 만드는 혁신가들을 찾습니다
          </p>

          {/* Positions */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {positions.map((position, index) => (
              <a
                key={index}
                href={position.link}
                target="_blank"
                rel="noopener noreferrer"
                className="position-card px-8 py-4 bg-fingoo-main !text-white !hover:text-white rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {position.title}
              </a>
            ))}
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <a
              href="https://coherent-beak-abf.notion.site/_-FINGOO-_-IR-1911d4287d7480299754e4c8af0fc913?source=copy_link"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-fingoo-main transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              IR 자료 보기
            </a>
            <span className="text-neutral-300">|</span>
            <a
              href="https://linkareer.com/channel/핀구-31113"
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-fingoo-main transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              링커리어
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
