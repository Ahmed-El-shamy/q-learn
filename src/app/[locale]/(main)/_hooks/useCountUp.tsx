"use client";
import { useEffect, useRef, useState } from "react";

export function useCountUp(end: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;

          let startTime: number | null = null;

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;

            const progress = Math.min((timestamp - startTime) / duration, 1);
            const value = Math.floor(progress * end);
            setCount(value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [end, duration]);

  return { ref, count };
}
