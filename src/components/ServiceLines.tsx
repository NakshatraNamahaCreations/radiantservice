"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { serviceMenu } from "@/data/site";
import { cn } from "./ui";
import ServiceCard from "./ServiceCard";

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

/**
 * Home page "What we do": a carousel with one card per group in the header's
 * services dropdown. The card turns navy on hover, with the icon flipping to
 * gold.
 */
export default function ServiceLines({
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
  const [page, setPage] = useState(0);
  const [pages, setPages] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 2);
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);

    // One dot per position the first visible card can take.
    const first = el.querySelector<HTMLElement>(":scope > li");
    if (first) {
      const step = first.offsetWidth + 24;
      const visible = Math.max(1, Math.round((el.clientWidth + 24) / step));
      setPages(Math.max(1, serviceMenu.length - visible + 1));
      setPage(Math.round(el.scrollLeft / step));
    }
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
    const first = el.querySelector(":scope > li");
    const step = first ? first.getBoundingClientRect().width + 24 : 340;
    el.scrollBy({ left: step * direction, behavior: "smooth" });
  }

  function scrollToPage(index: number) {
    const el = trackRef.current;
    const first = el?.querySelector<HTMLElement>(":scope > li");
    if (!el || !first) return;
    el.scrollTo({ left: index * (first.offsetWidth + 24), behavior: "smooth" });
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
              <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted sm:text-lg">
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

        {/* Three cards across on desktop, two on tablets, one on phones;
            the rest slide in with the arrows. The small negative margin gives
            the hover shadow room without clipping. */}
        <div className="container-x">
          <ul
            ref={trackRef}
            className="no-scrollbar -mx-3 mt-12 flex snap-x snap-mandatory scroll-px-3 gap-6 overflow-x-auto scroll-smooth px-3 pt-3 pb-8"
          >
            {serviceMenu.map((group, i) => (
              <li
                key={group.title}
                className="w-full shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]"
              >
                <ServiceCard group={group} index={i} href={group.href} />
              </li>
            ))}
          </ul>

          {pages > 1 ? (
            <div className="mt-2 flex justify-center gap-2">
              {Array.from({ length: pages }, (_, d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => scrollToPage(d)}
                  aria-label={`Show services from card ${d + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    d === page
                      ? "w-8 bg-brand-700"
                      : "w-2 bg-brand-200 hover:bg-brand-300"
                  )}
                />
              ))}
            </div>
          ) : null}
        </div>
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
