"use client";

import { useRef } from "react";
import Image from "next/image";
import GooglePlay_Badge from "@/public/images/googlePlay_badge.png";
import App_Store_Badge from "@/public/images/app_store_badge.svg";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@/hooks/use-gsap";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onScrollToFeatures: () => void;
  openLink: (url: string) => void;
}

// Animated Stock Chart Background Component
const StockChartBackground = () => {
  const chartRef = useRef<SVGSVGElement>(null);
  const chartContentRef = useRef<SVGGElement>(null);

  useGSAP(() => {
    if (!chartRef.current || !chartContentRef.current) return;

    // Initial fade in
    gsap.fromTo(chartRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "power2.out" }
    );

    // Scroll interaction - chart moves left only when scrolling
    gsap.to(chartContentRef.current, {
      x: -600,
      ease: "none",
      scrollTrigger: {
        trigger: chartRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    // Subtle pulse for current price line
    const priceLine = chartRef.current?.querySelector(".current-price-line");
    if (priceLine) {
      gsap.to(priceLine, {
        opacity: 0.7,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  // Realistic stock candle data - irregular like real stocks
  const candles = [
    // Very small candles at consolidation
    { x: 0, open: 720, close: 722, high: 718, low: 725 },
    { x: 40, open: 722, close: 719, high: 717, low: 724 },
    { x: 80, open: 719, close: 725, high: 716, low: 728 },
    { x: 120, open: 725, close: 723, high: 721, low: 727 },
    { x: 160, open: 723, close: 715, high: 713, low: 726 },
    // Breakout with long candle
    { x: 200, open: 715, close: 735, high: 712, low: 738 },
    // Small pullback candles
    { x: 240, open: 735, close: 730, high: 728, low: 737 },
    { x: 280, open: 730, close: 732, high: 729, low: 734 },
    { x: 320, open: 732, close: 728, high: 726, low: 734 },
    // Another long up candle
    { x: 360, open: 728, close: 745, high: 725, low: 748 },
    // Doji (tiny candle)
    { x: 400, open: 745, close: 746, high: 743, low: 747 },
    // Down move
    { x: 440, open: 746, close: 735, high: 733, low: 748 },
    { x: 480, open: 735, close: 730, high: 728, low: 737 },
    { x: 520, open: 730, close: 725, high: 722, low: 733 },
    // Hammer candle (long down, small body)
    { x: 560, open: 725, close: 723, high: 710, low: 727 },
    // Recovery
    { x: 600, open: 723, close: 735, high: 721, low: 738 },
    { x: 640, open: 735, close: 740, high: 733, low: 742 },
    // Big drop
    { x: 680, open: 740, close: 715, high: 713, low: 742 },
    // Volatile small candles
    { x: 720, open: 715, close: 720, high: 712, low: 723 },
    { x: 760, open: 720, close: 718, high: 716, low: 722 },
    { x: 800, open: 718, close: 725, high: 716, low: 727 },
    { x: 840, open: 725, close: 730, high: 723, low: 732 },
    // Strong rally
    { x: 880, open: 730, close: 755, high: 728, low: 758 },
    { x: 920, open: 755, close: 770, high: 753, low: 773 },
    // Gap up with small candles
    { x: 960, open: 770, close: 775, high: 768, low: 777 },
    { x: 1000, open: 775, close: 772, high: 770, low: 777 },
    { x: 1040, open: 772, close: 778, high: 770, low: 780 },
    // Long wick down candle
    { x: 1080, open: 778, close: 775, high: 760, low: 780 },
    // Continuation
    { x: 1120, open: 775, close: 785, high: 773, low: 788 },
    { x: 1160, open: 785, close: 795, high: 783, low: 797 },
    // Engulfing down
    { x: 1200, open: 795, close: 775, high: 773, low: 797 },
    // Consolidation with tiny candles
    { x: 1240, open: 775, close: 777, high: 773, low: 779 },
    { x: 1280, open: 777, close: 776, high: 774, low: 779 },
    { x: 1320, open: 776, close: 778, high: 775, low: 780 },
    // Breakout up
    { x: 1360, open: 778, close: 800, high: 776, low: 803 },
    { x: 1400, open: 800, close: 815, high: 798, low: 818 },
    // Pullback
    { x: 1440, open: 815, close: 805, high: 803, low: 817 },
    { x: 1480, open: 805, close: 808, high: 802, low: 810 },
    // Another push
    { x: 1520, open: 808, close: 825, high: 806, low: 828 },
    { x: 1560, open: 825, close: 835, high: 823, low: 838 },
    // Doji at top
    { x: 1600, open: 835, close: 836, high: 832, low: 837 },
    // Reversal down
    { x: 1640, open: 836, close: 815, high: 813, low: 838 },
    { x: 1680, open: 815, close: 820, high: 812, low: 823 },
    // Shooting star
    { x: 1720, open: 820, close: 818, high: 805, low: 822 },
    { x: 1760, open: 818, close: 810, high: 808, low: 820 },
    // Recovery
    { x: 1800, open: 810, close: 825, high: 808, low: 827 },
    { x: 1840, open: 825, close: 835, high: 823, low: 838 },
    { x: 1880, open: 835, close: 845, high: 833, low: 848 },
    // Strong continuation
    { x: 1920, open: 845, close: 870, high: 843, low: 873 },
    { x: 1960, open: 870, close: 880, high: 868, low: 883 },
    // Small correction
    { x: 2000, open: 880, close: 875, high: 873, low: 882 },
    { x: 2040, open: 875, close: 878, high: 873, low: 880 },
    // Final push
    { x: 2080, open: 878, close: 895, high: 876, low: 898 },
    { x: 2120, open: 895, close: 910, high: 893, low: 913 },
    { x: 2160, open: 910, close: 925, high: 908, low: 928 },
    { x: 2200, open: 925, close: 920, high: 918, low: 928 },
    { x: 2240, open: 920, close: 930, high: 918, low: 933 },
    // Exhaution
    { x: 2280, open: 930, close: 940, high: 928, low: 943 },
    { x: 2320, open: 940, close: 935, high: 933, low: 942 },
    { x: 2360, open: 935, close: 945, high: 933, low: 948 },
    { x: 2400, open: 945, close: 955, high: 943, low: 958 },
    { x: 2440, open: 955, close: 965, high: 953, low: 968 },
    { x: 2480, open: 965, close: 958, high: 956, low: 967 },
    { x: 2520, open: 958, close: 970, high: 956, low: 973 },
    { x: 2560, open: 970, close: 980, high: 968, low: 985 },
    { x: 2600, open: 980, close: 975, high: 973, low: 983 },
    { x: 2640, open: 975, close: 985, high: 973, low: 988 },
    { x: 2680, open: 985, close: 1000, high: 983, low: 1005 },
    { x: 2720, open: 1000, close: 1020, high: 998, low: 1025 },
    { x: 2760, open: 1020, close: 1010, high: 1008, low: 1023 },
    { x: 2800, open: 1010, close: 1015, high: 1008, low: 1018 },
    { x: 2840, open: 1015, close: 1030, high: 1013, low: 1033 },
    { x: 2880, open: 1030, close: 1045, high: 1028, low: 1048 },
    { x: 2920, open: 1045, close: 1040, high: 1038, low: 1048 },
    { x: 2960, open: 1040, close: 1055, high: 1038, low: 1058 },
  ];

  const priceToY = (price: number) => 1080 - (price - 600) * 2.2;
  const candleWidth = 25;

  return (
    <svg
      ref={chartRef}
      className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1920 1080"
      preserveAspectRatio="xMidYMid slice"
    >
      <g ref={chartContentRef}>
        {/* Candles */}
        {candles.map((candle, i) => {
          const yOpen = priceToY(candle.open);
          const yClose = priceToY(candle.close);
          const yHigh = priceToY(candle.high);
          const yLow = priceToY(candle.low);
          const isUp = candle.close >= candle.open;
          const color = isUp ? '#10B981' : '#EF4444';
          const bodyHeight = Math.abs(yClose - yOpen);

          return (
            <g key={`candle-${i}`} opacity="0.3">
              <line
                x1={candle.x}
                y1={yHigh}
                x2={candle.x}
                y2={yLow}
                stroke={color}
                strokeWidth="2"
              />
              <rect
                x={candle.x - candleWidth / 2}
                y={Math.min(yOpen, yClose)}
                width={candleWidth}
                height={bodyHeight > 0 ? bodyHeight : 2}
                fill={color}
                rx="1"
              />
            </g>
          );
        })}

        {/* Current price label */}
        <g className="current-price-line" opacity="0.7">
          <rect
            x="2780"
            y={priceToY(1055) - 14}
            width="100"
            height="28"
            fill="#10B981"
            rx="6"
          />
          <text
            x="2830"
            y={priceToY(1055) + 5}
            textAnchor="middle"
            fill="white"
            fontSize="13"
            fontWeight="bold"
          >
            $148.50
          </text>
        </g>
      </g>
    </svg>
  );
};

export function HeroSection({ onScrollToFeatures, openLink }: HeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Title animation
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          opacity: 0,
          y: 80,
          duration: 1.5,
          ease: "power4.out",
        });
      }

      // Elements animation
      const elements = heroRef.current?.querySelectorAll(".hero-animate");
      if (elements) {
        gsap.from(elements, {
          opacity: 0,
          y: 60,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      // Parallax on scroll - chart moves slightly
      const heroBg = heroRef.current?.querySelector(".hero-bg");
      if (heroBg) {
        gsap.to(heroBg, {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white"
    >
      {/* Stock Chart Background */}
      <div className="absolute inset-0 hero-bg overflow-hidden">
        {/* Gradient base */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-fingoo-main/5 rounded-full blur-[200px]" />

        {/* Animated Chart */}
        <StockChartBackground />
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-neutral-900 leading-[1.05] tracking-tight mb-8"
          >
            나만의 투자분석 친구
            <br />
            <span className="text-fingoo-main">FINGOO</span>
          </h1>

          {/* Description */}
          <p className="hero-animate text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
            복잡한 경제 뉴스와 재무 데이터를 AI가 분석합니다.
            <br className="hidden sm:block" />
            누구나 쉽게, 똑똑하게 투자를 시작할 수 있습니다.
          </p>

          {/* App Store Badges */}
          <div className="hero-animate flex flex-wrap items-center justify-center gap-6">
            <Image
              src={GooglePlay_Badge}
              alt="Google Play"
              width={135}
              height={40}
              className="h-10 w-auto transition-opacity cursor-pointer"
              onClick={() => openLink("https://play.google.com/store/apps/details?id=app.fingoo.main")}
            />
            <Image
              src={App_Store_Badge}
              alt="App Store"
              width={120}
              height={40}
              className="h-10 w-auto transition-opacity cursor-pointer"
              onClick={() => openLink("https://apps.apple.com/app/id6748242009")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
