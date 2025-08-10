"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import App_Store_Badge from "@/public/images/app_store_badge.svg";
import { ChevronDoubleDownIcon } from "@heroicons/react/24/outline";
import DesktopLayout from "./components/desktop-layout";
import Footer from "./components/footer";
import GooglePlay_Badge from "@/public/images/googlePlay_badge.png";
import Image from "next/image";
import Mobile from "@/public/images/mobile.png";
import NavBar from "./components/nav-bar";
import SnsSection from "./components/sns-section";
import Web from "@/public/images/web.png";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 700;
const EXTENDED_HOLD_DISTANCE = 700;
const EXTRA_HOLD_DISTANCE = 400;
const OVERLAP_DISTANCE = 250;
const TOTAL_FIXED_DISTANCE = SCROLL_THRESHOLD + EXTENDED_HOLD_DISTANCE + EXTRA_HOLD_DISTANCE;

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const showScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);

  const isMobile = windowWidth < 768;

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth);
  }, []);

  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  // 총 고정 구간 길이
  const totalFixedDistance = SCROLL_THRESHOLD + EXTENDED_HOLD_DISTANCE + EXTRA_HOLD_DISTANCE;

  // placeholder 높이도 총 길이로 설정
  const placeholderHeight = isMobile ? TOTAL_FIXED_DISTANCE : 0;

  // containerFixed 조건도 총 길이까지 유지
  const containerFixed = isMobile && scrollY < TOTAL_FIXED_DISTANCE;

  // 스크롤 진행도 0~1
  const progress = isMobile ? Math.min(scrollY / SCROLL_THRESHOLD, 1) : 0;

  // afterThresholdProgress도 유지 구간 전까지만 계산
  const afterThresholdProgress =
    isMobile && scrollY > SCROLL_THRESHOLD
      ? Math.min((scrollY - SCROLL_THRESHOLD) / EXTENDED_HOLD_DISTANCE, 1)
      : 0;

  const textOpacity =
    scrollY < SCROLL_THRESHOLD
      ? 1 - progress * (1 - 0.3)
      : 0.3 * (1 - afterThresholdProgress);

  const imageBlur = isMobile
    ? scrollY < SCROLL_THRESHOLD
      ? (1 - progress) * 6
      : 0
    : 0;

  // 오버랩 효과를 위한 다음 섹션 표시 로직
  const overlapStartPoint = TOTAL_FIXED_DISTANCE - OVERLAP_DISTANCE;
  const showNextSections = isMobile ? scrollY > overlapStartPoint : true;

  // 다음 섹션의 transform 계산 함수 분리
  function getNextSectionTransform() {
    if (!isMobile) return 'translateY(0px)';
    if (showNextSections) return `translateY(${Math.max(0, (totalFixedDistance - scrollY) * 0.5)}px)`;
    return 'translateY(100px)';
  }
  const nextSectionTransform = getNextSectionTransform();

  // 다음 섹션의 opacity 계산 (더 부드러운 전환)
  const nextSectionOpacity = isMobile
    ? showNextSections
      ? Math.min((scrollY - overlapStartPoint) / OVERLAP_DISTANCE, 1)
      : 0
    : 1;

  // top 위치 계산 분리
  const topPosition = !containerFixed && isMobile
    ? placeholderHeight - totalFixedDistance
    : 0;

  // 동적 스타일 변수 분리
  const imageFilterStyle = { filter: `blur(${imageBlur}px)` };
  const textOpacityStyle = { opacity: textOpacity, transition: "opacity 0.3s ease-out" };

  
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (showScrollTimeout.current) clearTimeout(showScrollTimeout.current);
    };
  }, [handleResize, handleScroll]);

  useEffect(() => {
    if (scrollY < 50) {
      showScrollTimeout.current = setTimeout(() => setShowScrollIndicator(true), 3000);
    } else {
      setShowScrollIndicator(false);
      if (showScrollTimeout.current) {
        clearTimeout(showScrollTimeout.current);
      }
    }
  }, [scrollY]);

  return (
    <div className="w-max-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-[100vh] bg-[#f7f7f7] relative">
        <NavBar />
        <main className="flex flex-col items-center justify-center flex-1 px-4 w-dvw">
          <div className="container px-0 sm:px-8 mx-auto grid items-center md:grid-cols-[1fr_1fr_1fr] sm:grid-cols-1 gap-5">
            <div
              style={{ height: placeholderHeight }}
              className="relative w-full"
            >
              <div
                className={cn(
                  "flex justify-center items-center h-full w-full bg-[#f7f7f7]",
                  isMobile
                    ? containerFixed
                      ? "fixed top-0 right-0 z-40 pt-6 pb-6"
                      : "absolute right-0"
                    : "relative"
                )}
                style={{ top: topPosition }}
              >
                <Image
                  src={Mobile}
                  alt="Mobile"
                  className={cn(
                    "max-w-[75%] md:max-w-full h-auto object-contain transition-filter duration-300 ease-in-out",
                    isMobile ? "" : "blur-none"
                  )}
                  style={imageFilterStyle}
                  priority
                />

                {isMobile && (
                  <div
                    className="absolute inset-0 flex flex-col justify-center items-center bg-opacity-40 px-3 sm:px-6 pointer-events-none text-center select-none"
                    style={textOpacityStyle}
                  >
                    <h2 className="text-[25px] xxs:text-[35px] font-extrabold text-gray-500 mb-2">
                      검색의 시대는 끝
                    </h2>
                    <div className="relative mt-3">
                      <h1 className="text-[25px] xxs:text-[35px] text-[#333] font-extrabold z-10 relative">
                        이제 투자분석도 <span className="text-[#333]">AI로</span>
                      </h1>
                      <div className="absolute bottom-1 left-0 h-2 xxs:h-4 bg-[#6DD9CD] animate-underline" />
                    </div>
                    <div
                      className={cn(
                        "flex flex-col xs:flex-row gap-3 xs:justify-center xs:items-center mt-10",
                        progress === 0 ? "pointer-events-auto" : "pointer-events-none"
                      )}
                    >
                      <div className="w-full flex-col xxs:flex-row xs:w-auto flex justify-center items-center gap-3">
                        <Image
                          src={GooglePlay_Badge}
                          alt="Google Play Badge"
                          className="object-contain cursor-pointer w-auto h-9 md:h-10 lg:h-9"
                          onClick={() =>
                            window.open(
                              "https://play.google.com/store/apps/details?id=your.app.id",
                              "_blank"
                            )
                          }
                        />
                        <Image
                          src={App_Store_Badge}
                          alt="App Store Badge"
                          className="object-contain cursor-pointer w-auto h-9 md:h-10 lg:h-9"
                          onClick={() =>
                            window.open("https://apps.apple.com/app/your-app-id", "_blank")
                          }
                        />
                      </div>
                      <div className="w-[0.5px] h-full xs:block hidden bg-slate-300" />
                      <div className="w-full h-[0.5px] xs:hidden bg-slate-300" />
                      <button
                        onClick={() => window.open("https://fingoo.app", "_blank")}
                        className="inline-flex items-center w-auto md:w-full lg:w-auto justify-center gap-2 bg-[#63c8bc] text-white text-base md:text-lg font-bold px-3 py-1 rounded-lg transition"
                      >
                        <Image
                          src={Web}
                          alt="Web Icon"
                          className="object-contain w-auto h-4 md:h-5"
                        />
                        웹으로 이용
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DesktopLayout />
          </div>
        </main>

        {/* 스크롤 인디케이터 */}
        <div
          className={cn(
            "absolute bottom-8 left-1/2 z-50 flex flex-col items-center gap-2 transition-all duration-500 ease-in-out transform -translate-x-1/2",
            showScrollIndicator
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 translate-y-4 pointer-events-none"
          )}
        >
          <span className="text-sm font-medium text-[#333] whitespace-nowrap">
            아래로 스크롤
          </span>
          <div className="animate-bounce">
            <ChevronDoubleDownIcon className="w-6 h-6 text-[#333]" />
          </div>
        </div>
      </div>

      {/* 오버랩 효과가 적용된 다음 섹션들 */}
      <div
        className={cn(
          "transition-all duration-700 ease-out",
          showNextSections ? "opacity-100" : "opacity-0"
        )}
        style={{
          opacity: nextSectionOpacity,
          transform: nextSectionTransform,
          transition: 'all 0.4s ease-out',
        }}
      >
        {/* Instagram & YouTube Section */}
        <SnsSection />
      </div>

      {/* Footer Info Section */}
      <Footer />
    </div>
  );
}