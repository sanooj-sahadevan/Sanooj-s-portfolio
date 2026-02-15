import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const children = ref.current.querySelectorAll("[data-gsap]");
    children.forEach((el, i) => {
      const direction = el.getAttribute("data-gsap") || "up";
      const fromVars: gsap.TweenVars = { opacity: 0, duration: 0.8, ease: "power3.out" };

      if (direction === "up") fromVars.y = 60;
      if (direction === "down") fromVars.y = -60;
      if (direction === "left") fromVars.x = -80;
      if (direction === "right") fromVars.x = 80;
      if (direction === "scale") { fromVars.scale = 0.8; fromVars.y = 30; }

      gsap.from(el, {
        ...fromVars,
        delay: i * 0.08,
        scrollTrigger: {
          trigger: el,
          start: "top bottom-=80",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return ref;
}

export function useTextReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const chars = ref.current.querySelectorAll(".char");
    if (chars.length === 0) return;

    gsap.from(chars, {
      opacity: 0,
      y: 40,
      rotateX: -90,
      stagger: 0.03,
      duration: 0.6,
      ease: "back.out(1.7)",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom-=100",
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return ref;
}

export function useParallax<T extends HTMLElement>(speed = 0.3) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, [speed]);

  return ref;
}
