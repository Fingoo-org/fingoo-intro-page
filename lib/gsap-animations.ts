import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Text reveal animation - splits text and animates each character/word
 */
export function textReveal(
  element: Element | string,
  options: {
    delay?: number;
    stagger?: number;
    duration?: number;
  } = {}
) {
  const {
    delay = 0,
    stagger = 0.05,
    duration = 0.8,
  } = options;

  const targets = typeof element === "string"
    ? document.querySelectorAll(element)
    : [element];

  targets.forEach((target) => {
    const text = target.textContent || "";
    target.textContent = "";

    // Create words
    const words = text.split(" ");
    const wordsContainer = document.createElement("div");
    wordsContainer.style.display = "inline-block";

    words.forEach((word, i) => {
      const wordSpan = document.createElement("span");
      wordSpan.className = "inline-block";
      wordSpan.style.opacity = "0";
      wordSpan.style.transform = "translateY(100%)";

      // Split word into characters
      word.split("").forEach((char) => {
        const charSpan = document.createElement("span");
        charSpan.className = "inline-block";
        charSpan.textContent = char;
        wordSpan.appendChild(charSpan);
      });

      wordsContainer.appendChild(wordSpan);

      // Add space
      if (i < words.length - 1) {
        const space = document.createElement("span");
        space.textContent = " ";
        space.className = "inline-block";
        wordsContainer.appendChild(space);
      }
    });

    target.appendChild(wordsContainer);

    // Animate
    gsap.to(wordsContainer.querySelectorAll("span"), {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      delay,
      ease: "power3.out",
    });
  });
}

/**
 * Parallax animation for background elements
 */
export function parallax(
  element: HTMLElement,
  speed: number = 0.5
): GSAPTween {
  return gsap.to(element, {
    y: () => ScrollTrigger.maxScroll(window) * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element.parentElement || document.body,
      start: "top bottom",
      end: "bottom top",
      scrub: 0,
    },
  });
}

/**
 * Stagger fade-in animation for list items
 */
export function staggerFadeIn(
  selector: string,
  options: {
    trigger?: Element | string;
    start?: string;
    stagger?: number;
    from?: number;
  } = {}
) {
  const {
    trigger = selector,
    start = "top 85%",
    stagger = 0.15,
    from = 0,
  } = options;

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: "power3.out",
      scrollTrigger: {
        trigger,
        start,
      },
    }
  );
}

/**
 * Scale reveal animation
 */
export function scaleReveal(
  selector: string,
  options: {
    trigger?: Element | string;
    start?: string;
    scale?: number;
  } = {}
) {
  const {
    trigger = selector,
    start = "top 85%",
    scale = 0.8,
  } = options;

  gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger,
        start,
      },
    }
  );
}

/**
 * Count up animation for numbers
 */
export function countUp(
  element: HTMLElement,
  target: number,
  options: {
    duration?: number;
    prefix?: string;
    suffix?: string;
  } = {}
) {
  const { duration = 2, prefix = "", suffix = "" } = options;

  const obj = { value: 0 };

  gsap.to(obj, {
    value: target,
    duration,
    ease: "power2.out",
    onUpdate: () => {
      const formatted = Math.round(obj.value);
      element.textContent = `${prefix}${formatted}${suffix}`;
    },
  });
}

/**
 * 3D card tilt effect on hover
 */
export function cardTilt(element: HTMLElement, intensity: number = 10) {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const percentX = (x - centerX) / centerX;
    const percentY = (y - centerY) / centerY;

    gsap.to(element, {
      rotationY: percentX * intensity,
      rotationX: -percentY * intensity,
      duration: 0.3,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

/**
 * Scroll-based horizontal scroll section
 */
export function horizontalScroll(
  container: HTMLElement,
  sections: HTMLElement[]
) {
  const scrollTween = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      pin: true,
      scrub: 1,
      end: () => "+=" + container.offsetWidth,
    },
  });

  return scrollTween;
}

/**
 * Refresh all ScrollTriggers
 */
export function refreshScrollTriggers() {
  ScrollTrigger.refresh();
}

/**
 * Kill all ScrollTriggers
 */
export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
