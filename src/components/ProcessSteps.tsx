"use client";

import { useEffect, useRef, useState } from "react";
import { steps } from "@/data/site";
import { cn } from "./ui";
import { ServiceIcon } from "./Icons";

/**
 * "How we work for you" — a timeline rail with the four stages sitting on it.
 * The rail draws and the stages reveal in sequence the first time the section
 * scrolls into view, and the whole thing degrades to a plain, fully visible
 * grid when the visitor prefers reduced motion.
 */
export default function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setAnimate(false);
      setShown(true);
      return;
    }

    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect(); // play once
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const on = shown || !animate;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[var(--bg-2)] py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 22rem at 50% -8%, rgba(20,58,110,.08), transparent 62%), radial-gradient(28rem 18rem at 100% 100%, rgba(200,144,46,.05), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div
          className={cn(
            "mx-auto max-w-2xl text-center",
            animate && "transition-all duration-700 ease-out",
            on ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          )}
        >
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
            Work process
          </span>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
            How we work for you
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted">
            A clear, four-stage process that takes you from first consultation to
            continuous oversight.
          </p>
        </div>

        <ol className="relative mt-20 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Continuous rail: sits behind the badges, fully visible above the cards */}
          <span
            aria-hidden
            className="absolute top-10 right-[12.5%] left-[12.5%] hidden h-[3px] rounded-full bg-[#e6dcc8] lg:block"
          />
          <span
            aria-hidden
            className={cn(
              "absolute top-10 right-[12.5%] left-[12.5%] hidden h-[3px] origin-left rounded-full lg:block",
              animate && "transition-transform duration-[1600ms] ease-out",
              on ? "scale-x-100" : "scale-x-0"
            )}
            style={{
              background:
                "linear-gradient(90deg, var(--color-brand-600), var(--color-accent-500) 55%, var(--color-accent-300))",
              transitionDelay: animate ? "250ms" : undefined,
            }}
          />

          {steps.map((step, i) => (
            <li
              key={step.title}
              className={cn(
                "group relative flex flex-col items-center",
                animate && "transition-all duration-700 ease-out",
                on ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              )}
              style={animate ? { transitionDelay: `${350 + i * 150}ms` } : undefined}
            >
              {/* Badge sits on the rail */}
              <span
                className={cn(
                  "relative z-10 grid h-20 w-20 place-items-center rounded-2xl bg-brand-600 shadow-lg shadow-brand-600/30 ring-8 ring-[var(--bg-2)]",
                  "transition-all duration-500 group-hover:-translate-y-1.5 group-hover:bg-brand-700 group-hover:shadow-xl group-hover:shadow-brand-600/40",
                  on ? "scale-100" : "scale-50"
                )}
                style={
                  animate ? { transitionDelay: `${420 + i * 150}ms` } : undefined
                }
              >
                <ServiceIcon
                  name={step.icon}
                  className="h-8 w-8 text-white transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute -right-2 -bottom-2 grid h-8 w-8 place-items-center rounded-xl bg-white text-xs font-bold text-brand-700 shadow-md ring-1 ring-black/5">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </span>

              {/* Card */}
              <div className="mt-6 flex h-full w-full flex-col rounded-2xl border border-[#ece3d1] bg-white px-4 py-4 text-center shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-brand-200 group-hover:shadow-[0_20px_44px_-14px_rgba(20,58,110,.26)]">
                <span className="text-[12px] font-bold tracking-[0.16em] text-accent-600 uppercase">
                  {step.label}
                </span>
                <h3 className="mt-2.5 flex-1 text-base leading-snug font-semibold text-balance text-ink">
                  {step.title}
                </h3>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
