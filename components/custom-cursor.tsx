"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface CustomCursorProps {
  isMobile: boolean;
}

export function CustomCursor({ isMobile }: CustomCursorProps) {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isMobile) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    // 커서 초기 위치 설정 (화면 중앙)
    const initialX = window.innerWidth / 2 - 10;
    const initialY = window.innerHeight / 2 - 10;
    cursor.style.transform = `translate(${initialX}px, ${initialY}px)`;

    // 마우스 따라다니는 효과
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX - 10,
        y: e.clientY - 10,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    // 버튼, 링크, 카드에 호버 효과
    const handleMouseEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      // 버튼 또는 magnetic-card: 테두리, 나머지(a 태그 등): 텍스트 스타일
      const useOutline = target.tagName === "BUTTON" || target.classList.contains("magnetic-card");

      if (useOutline) {
        // 버튼/카드 요소: 테두리 추가
        gsap.to(target, {
          outline: "2px solid #5BA89F",
          outlineOffset: "4px",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // 텍스트 링크 요소: 색상 변경 + 크기 확대
        gsap.to(target, {
          color: "#5BA89F",
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // 커서 숨김
      gsap.to(cursor, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const useOutline = target.tagName === "BUTTON" || target.classList.contains("magnetic-card");

      if (useOutline) {
        // 버튼/카드 요소: 테두리 제거
        gsap.to(target, {
          outline: "none",
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        // 텍스트 링크 요소: 원래 상태로
        gsap.to(target, {
          color: "",
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      }

      // 커서 다시 보이기
      gsap.to(cursor, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });

      // 요소 원위치로
      if ((target as any)._moveMagnetic) {
        target.removeEventListener("mousemove", (target as any)._moveMagnetic);
      }

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseEnterDoc = () => setIsVisible(true);
    const handleMouseLeaveDoc = () => setIsVisible(false);

    // 이벤트 리스너 등록
    document.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseenter", handleMouseEnterDoc);
    document.addEventListener("mouseleave", handleMouseLeaveDoc);

    // 인터랙티브 요소들에 이벤트 추가
    const addListenersToElements = () => {
      // 더 광범위한 선택자 사용
      const selector = [
        "a:not([data-cursor-listener])",
        "button:not([data-cursor-listener])",
        "[role='button']:not([data-cursor-listener])",
        ".magnetic-card:not([data-cursor-listener])",
        '[data-interactable="true"]:not([data-cursor-listener])',
      ].join(", ");

      const interactiveElements = document.querySelectorAll(selector);

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
        el.setAttribute("data-cursor-listener", "true");
      });

      // 디버깅: 찾은 요소 수 출력 (개발용)
      if (process.env.NODE_ENV === "development" && interactiveElements.length > 0) {
        console.log(`[CustomCursor] ${interactiveElements.length}개의 인터랙티브 요소에 리스너 추가됨`);
      }
    };

    // DOM이 완전히 로드된 후 실행 (hydration 후 대기)
    const timer = setTimeout(() => {
      addListenersToElements();
      // 추가: 한 번 더 실행해서 누락된 요소 확인
      setTimeout(() => addListenersToElements(), 500);
    }, 300);

    // 동적으로 추가되는 요소들을 위한 MutationObserver
    const observer = new MutationObserver(addListenersToElements);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // 클린업 함수
    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseenter", handleMouseEnterDoc);
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      observer.disconnect();

      const allElements = document.querySelectorAll("[data-cursor-listener]");
      allElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
        .custom-cursor {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #5BA89F;
          pointer-events: none;
          z-index: 9999;
        }
        .custom-cursor.is-visible {
          opacity: 1;
        }
        @media (hover: none) {
          .custom-cursor {
            display: none;
          }
          * {
            cursor: auto !important;
          }
        }
      `}</style>
      <div
        ref={cursorRef}
        className={`custom-cursor ${isVisible ? "is-visible" : "opacity-0"}`}
      />
    </>
  );
}
