"use client";

import { useState } from "react";
import { cn } from "./ui";

type Item = { q: string; a: string };

export default function Faq({
  items,
  eyebrow = "FAQ",
  title = "Questions we get asked a lot",
  body = "Quick answers about our financial, compliance, and legal services. If you need anything else, our team is a call away.",
  alt = false,
  id,
  columns = 1,
}: {
  items: Item[];
  eyebrow?: string;
  title?: string;
  body?: string;
  alt?: boolean;
  /** Anchor id, so the header menu can scroll to it. */
  id?: string;
  /** 2 puts the heading across the top and splits the list into two columns. */
  columns?: 1 | 2;
}) {
  const [open, setOpen] = useState<number | null>(0);
  const twoUp = columns === 2;

  // Two independent stacks rather than a grid: in a grid, opening an answer
  // stretches its whole row, shunting the item beside it down and leaving a
  // gap. Separate stacks let each column grow on its own.
  const split = Math.ceil(items.length / 2);
  const stacks: { item: Item; index: number }[][] = twoUp
    ? [
        items.slice(0, split).map((item, i) => ({ item, index: i })),
        items.slice(split).map((item, i) => ({ item, index: split + i })),
      ]
    : [items.map((item, i) => ({ item, index: i }))];

  const intro = (
    <>
      <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.5rem]">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 text-base leading-relaxed text-pretty text-ink-muted">
          {body}
        </p>
      ) : null}
    </>
  );


  const list = stacks.map((stack, stackIndex) => (
    <div key={stackIndex} className="space-y-4 self-start">
      {stack.map(({ item, index }) => {
        const isOpen = open === index;
        return (
          <div
            key={item.q}
            className={cn(
              "overflow-hidden rounded-2xl border bg-white transition-all duration-300",
              isOpen
                ? "border-brand-200 shadow-[0_18px_40px_-16px_rgba(20,58,110,.25)]"
                : "border-[#ece3d1] hover:border-brand-200 hover:shadow-[0_10px_24px_-14px_rgba(20,58,110,.2)]"
            )}
          >
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-xl text-xs font-bold transition-colors duration-300",
                    isOpen
                      ? "bg-brand-600 text-white"
                      : "bg-brand-50 text-brand-600"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  className={cn(
                    "flex-1 text-[16px] leading-snug font-semibold transition-colors duration-300 sm:text-base",
                    isOpen ? "text-brand-700" : "text-ink"
                  )}
                >
                  {item.q}
                </span>

                {/* Plus turns into a minus */}
                <span
                  aria-hidden
                  className={cn(
                    "relative mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300",
                    isOpen
                      ? "bg-brand-600 text-white"
                      : "bg-[var(--bg-2)] text-brand-600"
                  )}
                >
                  <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                  <span
                    className={cn(
                      "absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300",
                      isOpen ? "scale-y-0" : "scale-y-100"
                    )}
                  />
                </span>
              </button>
            </h3>

            <div
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-ink-muted sm:px-6 sm:pb-6 sm:pl-[4.5rem]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  ));

  return (
    <section
      id={id}
      className={cn(
        "relative overflow-hidden py-16 sm:py-24",
        alt ? "bg-[var(--bg-2)]" : "bg-white"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38rem 22rem at 0% 0%, rgba(20,58,110,.06), transparent 62%), radial-gradient(28rem 18rem at 100% 100%, rgba(200,144,46,.05), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        {twoUp ? (
          <>
            <div className="mx-auto max-w-2xl text-center">{intro}</div>
            <div className="mt-14 grid items-start gap-5 lg:grid-cols-2">
              {list}
            </div>
          </>
        ) : (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_1.3fr] lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              {intro}
            </div>
            <div className="space-y-4">{list}</div>
          </div>
        )}
      </div>
    </section>
  );
}
