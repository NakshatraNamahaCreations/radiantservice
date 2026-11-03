"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
import { cn } from "./ui";
import { ArrowRight } from "./Icons";

function Chevron({
  dir,
  ...props
}: React.SVGProps<SVGSVGElement> & { dir: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d={dir === "left" ? "m14.5 6-6 6 6 6" : "m9.5 6 6 6-6 6"} />
    </svg>
  );
}

export default function ServicesCarousel({
  eyebrow = "Service lines",
  title = "What we do",
  body = "A specialist GST practice, complete tax and compliance outsourcing, and a Virtual CFO capability - run off a single set of books and a single calendar.",
}: {
  eyebrow?: string;
  title?: string;
  body?: string;
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollable, setScrollable] = useState(false);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 2);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  function scrollByCard(direction: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const first = el.querySelector("li");
    const step = first ? first.getBoundingClientRect().width + 20 : 320;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42rem 24rem at 92% -10%, rgba(20,58,110,.07), transparent 60%), radial-gradient(30rem 18rem at 2% 108%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="relative">
        <div className="container-x">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
                {eyebrow}
              </span>
              <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
                {title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted">
                {body}
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                disabled={!scrollable || atStart}
                aria-label="Previous services"
                className={arrowClass(!scrollable || atStart)}
              >
                <Chevron dir="left" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                disabled={!scrollable || atEnd}
                aria-label="Next services"
                className={arrowClass(!scrollable || atEnd)}
              >
                <Chevron dir="right" className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Full-bleed track so cards run to the right edge */}
        <ul
          ref={trackRef}
          className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 sm:px-[max(1.25rem,calc((100vw-76rem)/2+1.25rem))]"
        >
          {services.map((s, i) => (
            <li
              key={s.slug}
              className="w-[17.5rem] shrink-0 snap-start sm:w-[19rem]"
            >
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex h-[26rem] flex-col justify-end overflow-hidden rounded-2xl p-6 shadow-lg shadow-brand-900/10 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-brand-900/25"
              >
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 19rem, 17.5rem"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                />

                {/* Navy wash: deepens on hover so the revealed copy stays readable */}
                <div
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,19,45,.94) 0%, rgba(2,19,45,.70) 38%, rgba(2,19,45,.30) 70%, rgba(2,19,45,.28) 100%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(20,58,110,.96) 0%, rgba(11,44,90,.88) 55%, rgba(2,19,45,.72) 100%)",
                  }}
                />

                <span className="absolute top-5 left-6 text-sm font-bold tracking-widest text-white/55 transition-colors duration-300 group-hover:text-white/80">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="absolute top-5 right-5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase ring-1 ring-white/20 backdrop-blur-sm">
                  {s.group}
                </span>

                <div className="relative">
                  <h3 className="text-xl leading-tight font-bold text-balance text-white">
                    {s.title}
                  </h3>

                  {/* Hidden until hover on pointer devices; always visible where
                      there is no hover (phones AND touch tablets, which a width
                      breakpoint alone would wrongly leave with hidden text). */}
                  <div className="mt-3 max-h-40 opacity-100 transition-all duration-500 ease-out [@media(hover:hover)]:mt-0 [@media(hover:hover)]:max-h-0 [@media(hover:hover)]:opacity-0 group-hover:mt-4 group-hover:max-h-40 group-hover:opacity-100">
                    <p className="text-sm leading-relaxed text-white/80">
                      {s.short}
                    </p>
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-wider text-white uppercase">
                    Read more
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-brand-700">
                      <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function arrowClass(disabled: boolean) {
  return cn(
    "grid h-12 w-12 place-items-center rounded-full border transition-all duration-200",
    disabled
      ? "cursor-not-allowed border-[#ece3d1] text-[#cdbf9f]"
      : "border-brand-200 text-brand-600 hover:-translate-y-0.5 hover:border-brand-600 hover:bg-brand-600 hover:text-white hover:shadow-lg hover:shadow-brand-600/25"
  );
}
