import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ParallaxOptions {
  speed?: number;
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const elementRef = useRef<HTMLElement>(null);
  const { speed = 1 } = options;

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.fromTo(element,
      {
        y: 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          toggleActions: "play none none reverse"
        },
        ease: "power1.out"
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [speed]);

  return elementRef;
};
