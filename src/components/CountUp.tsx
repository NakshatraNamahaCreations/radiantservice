"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a stat such as "₹2,500 cr+" up from zero each time it scrolls
 * into view, scrolling up or down. The text around the number (prefix and suffix) stays as written.
 * The final value is what renders first, so it is right without JavaScript and
 * for visitors who prefer reduced motion.
 */
export default function CountUp({
  value,
  duration = 1800,
}: {
  value: string;
  duration?: number;
}) {
  const match = value.match(/^(\D*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? Number(match[2].replace(/,/g, "")) : 0;
  const suffix = match?.[3] ?? "";

  const ref = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setCurrent(0);
    let frame = 0;
    let armed = true;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset once it is fully off screen so it counts again on the way back.
        if (!entry.isIntersecting) {
          cancelAnimationFrame(frame);
          setCurrent(0);
          armed = true;
          return;
        }
        if (!armed || entry.intersectionRatio < 0.4) return;
        armed = false;

        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - t, 3);
          setCurrent(Math.round(target * eased));
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: [0, 0.4] }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration]);

  if (!match) return <>{value}</>;

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {current.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
