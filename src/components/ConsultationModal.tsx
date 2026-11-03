"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";
import ConsultationForm from "./ConsultationForm";
import { Check, Clock, Close, Mail, Phone } from "./Icons";

/** Any link to this hash opens the pop-up instead of navigating. */
export const CONSULTATION_HASH = "#consultation";

const promises = [
  "Reply within working hours",
  "Speak directly with a Partner",
  "No obligation first discussion",
];

/**
 * "Book a consultation" pop-up, mounted once in the layout. It opens from any
 * link to #consultation, so buttons on server-rendered sections need no code
 * of their own.
 */
export default function ConsultationModal() {
  const [open, setOpen] = useState(false);
  // Remounting the form on each open clears a previous submission.
  const [session, setSession] = useState(0);

  useEffect(() => {
    // Capture phase, so this runs before any link's own click handling.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (link?.getAttribute("href") !== CONSULTATION_HASH) return;
      e.preventDefault();
      setSession((n) => n + 1);
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-title"
      className="fixed inset-0 z-[80] flex items-end justify-center overflow-y-auto bg-brand-900/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={() => setOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-up relative grid w-full max-w-4xl overflow-hidden rounded-t-3xl bg-white shadow-[0_40px_90px_-30px_rgba(2,19,45,.8)] sm:rounded-3xl md:grid-cols-[19rem_1fr]"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-brand-800 transition-colors hover:bg-brand-800 hover:text-white"
        >
          <Close className="h-5 w-5" />
        </button>

        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-8 text-white md:block">
          <span
            aria-hidden
            className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-accent-400/20 blur-3xl"
          />
          <span aria-hidden className="bg-gold absolute inset-y-0 right-0 w-[3px]" />

          <p className="relative text-xs font-bold tracking-[0.18em] text-accent-300 uppercase">
            {site.name}
          </p>
          <h2 className="relative mt-4 text-2xl leading-snug font-bold">
            Talk to a Chartered Accountant
          </h2>
          <p className="relative mt-3 text-sm leading-relaxed text-white/70">
            Tell us what you need and we will call you back to plan the next
            step.
          </p>

          <ul className="relative mt-7 space-y-3.5">
            {promises.map((p) => (
              <li key={p} className="flex items-center gap-3 text-sm">
                <span className="bg-gold grid h-5 w-5 shrink-0 place-items-center rounded-full text-brand-900">
                  <Check className="h-3 w-3" />
                </span>
                {p}
              </li>
            ))}
          </ul>

          <div className="relative mt-9 space-y-3 border-t border-white/15 pt-6 text-sm">
            <a
              href={site.phoneHref}
              className="flex items-center gap-2.5 text-white/85 hover:text-accent-300"
            >
              <Phone className="h-4 w-4 text-accent-300" />
              {site.phone}
            </a>
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2.5 break-all text-white/85 hover:text-accent-300"
            >
              <Mail className="h-4 w-4 shrink-0 text-accent-300" />
              {site.email}
            </a>
            <p className="flex items-center gap-2.5 text-white/70">
              <Clock className="h-4 w-4 text-accent-300" />
              {site.hours}
            </p>
          </div>
        </aside>

        {/* Form */}
        <div className="max-h-[88vh] overflow-y-auto p-6 sm:p-8">
          <p className="text-xs font-bold tracking-[0.18em] text-accent-600 uppercase">
            Book a consultation
          </p>
          <h2
            id="consultation-title"
            className="mt-2 pr-12 text-2xl font-bold tracking-tight text-ink"
          >
            Request a call back
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            Share a few details and our team will get back to you.
          </p>
          <div className="mt-6">
            <ConsultationForm key={session} variant="plain" />
          </div>
        </div>
      </div>
    </div>
  );
}
