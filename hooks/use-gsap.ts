"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Lenis instance reference for GSAP integration
let lenisInstance: any = null;

export function setLenis(lenis: any) {
  lenisInstance = lenis;
}

export function getLenis() {
  return lenisInstance;
}

export function useGSAP(callback: (context: gsap.Context) => void, deps: any[] = []) {
  const contextRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    // Create GSAP context
    const ctx = gsap.context(callback);
    contextRef.current = ctx;

    // Integrate with Lenis if available
    if (lenisInstance) {
      lenisInstance.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenisInstance.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Refresh ScrollTrigger after a short delay
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, deps);
}
