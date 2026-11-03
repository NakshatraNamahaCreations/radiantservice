"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { gallery } from "@/data/site";
import { cn } from "./ui";
import { ArrowRight, Close } from "./Icons";

const ALL = "All";

/**
 * Gallery page: filter tabs, a mixed-size photo grid, and a full-screen
 * viewer with previous/next (arrow keys and Esc work too).
 */
export default function GalleryGrid() {
  const categories = useMemo(
    () => [ALL, ...Array.from(new Set(gallery.map((g) => g.category)))],
    []
  );
  const [filter, setFilter] = useState(ALL);
  const [viewing, setViewing] = useState<number | null>(null);

  const items = useMemo(
    () =>
      filter === ALL ? gallery : gallery.filter((g) => g.category === filter),
    [filter]
  );

  const step = useCallback(
    (dir: 1 | -1) =>
      setViewing((v) =>
        v === null ? v : (v + dir + items.length) % items.length
      ),
    [items.length]
  );

  useEffect(() => {
    if (viewing === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setViewing(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [viewing, step]);

  const current = viewing === null ? null : items[viewing];

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
                filter === c
                  ? "bg-brand-800 text-white shadow-lg shadow-brand-900/25"
                  : "border border-[#ece3d1] bg-white text-ink hover:border-accent-400 hover:text-brand-700"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Grid */}
        <ul className="mt-12 grid auto-rows-[15rem] grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <li
              key={item.image}
              className={cn(
                "animate-fade-up",
                item.size === "wide" && "sm:col-span-2",
                item.size === "tall" && "sm:row-span-2"
              )}
            >
              <button
                type="button"
                onClick={() => setViewing(i)}
                aria-label={`View ${item.title}`}
                className="group relative block h-full w-full overflow-hidden rounded-2xl text-left shadow-[0_2px_10px_-4px_rgba(5,27,58,.15)] ring-1 ring-black/5 transition-shadow duration-500 hover:shadow-[0_28px_56px_-20px_rgba(5,27,58,.5)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                />
                {/* Light shade always, deepening to navy on hover */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-900/80 via-brand-900/10 to-transparent transition-opacity duration-500 group-hover:opacity-0"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-brand-900/95 via-brand-800/60 to-brand-700/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                {/* Gold inner frame on hover */}
                <span
                  aria-hidden
                  className="absolute inset-3 rounded-xl border border-accent-400/0 transition-colors duration-500 group-hover:border-accent-400/70"
                />

                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="inline-flex rounded-full bg-accent-500 px-3 py-1 text-[12px] font-bold tracking-wide text-brand-900 uppercase">
                    {item.category}
                  </span>
                  <span className="mt-2.5 flex items-end justify-between gap-3">
                    <span className="text-lg leading-snug font-semibold text-white">
                      {item.title}
                    </span>
                    <span className="grid h-9 w-9 shrink-0 translate-y-2 place-items-center rounded-full bg-white text-brand-800 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4 -rotate-45" />
                    </span>
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Full-screen viewer */}
      {current && viewing !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[70] flex flex-col bg-brand-900/95 backdrop-blur-sm"
          onClick={() => setViewing(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white sm:px-8">
            <span className="text-sm text-white/70">
              {viewing + 1} / {items.length}
            </span>
            <button
              type="button"
              onClick={() => setViewing(null)}
              aria-label="Close"
              className="grid h-11 w-11 place-items-center rounded-full bg-white/10 ring-1 ring-white/20 transition-colors hover:bg-white/20"
            >
              <Close className="h-5 w-5" />
            </button>
          </div>

          <div className="relative flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              key={current.image}
              src={current.image}
              alt={current.title}
              fill
              sizes="100vw"
              className="animate-fade-up object-contain px-16 sm:px-24"
            />
            {items.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Previous photo"
                  className="absolute top-1/2 left-3 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-accent-500 hover:text-brand-900 sm:left-6"
                >
                  <ArrowRight className="h-5 w-5 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Next photo"
                  className="absolute top-1/2 right-3 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-accent-500 hover:text-brand-900 sm:right-6"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>

          <div
            className="px-5 py-6 text-center sm:px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-xs font-bold tracking-[0.16em] text-accent-400 uppercase">
              {current.category}
            </span>
            <p className="mt-1.5 text-lg font-semibold text-white">
              {current.title}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  );
}
