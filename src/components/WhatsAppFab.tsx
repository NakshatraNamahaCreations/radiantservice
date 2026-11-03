"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import { cn } from "./ui";
import {
  Close,
  Facebook,
  Instagram,
  LinkedIn,
  Mail,
  Phone,
  WhatsApp,
} from "./Icons";

/**
 * Floating "Connect with us" button. It opens a card with WhatsApp, call,
 * email and the social profiles. A social link only appears once its URL is
 * filled in under `site.social`.
 */
export default function WhatsAppFab() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const text = encodeURIComponent(
    `Hi ${site.name}, I would like to know more about your services.`
  );

  const channels = [
    {
      label: "WhatsApp",
      detail: "Chat with us now",
      href: `https://wa.me/${site.whatsapp}?text=${text}`,
      icon: WhatsApp,
      tone: "bg-[#25D366]",
      external: true,
    },
    {
      label: "Call us",
      detail: site.phone,
      href: site.phoneHref,
      icon: Phone,
      tone: "bg-brand-700",
      external: false,
    },
    {
      label: "Email",
      detail: site.email,
      href: `mailto:${site.email}`,
      icon: Mail,
      tone: "bg-accent-600",
      external: false,
    },
    {
      label: "LinkedIn",
      detail: "Follow our updates",
      href: site.social.linkedin,
      icon: LinkedIn,
      tone: "bg-[#0A66C2]",
      external: true,
    },
    {
      label: "Instagram",
      detail: "See our latest posts",
      href: site.social.instagram,
      icon: Instagram,
      tone: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5]",
      external: true,
    },
    {
      label: "Facebook",
      detail: "Like our page",
      href: site.social.facebook,
      icon: Facebook,
      tone: "bg-[#1877F2]",
      external: true,
    },
  ].filter((c) => c.href);

  // Close on Escape or a click anywhere else on the page.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed right-5 bottom-5 z-50">
      {/* Contact card */}
      <div
        className={cn(
          "absolute right-0 bottom-[4.5rem] w-[17.5rem] origin-bottom-right overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-20px_rgba(5,27,58,.55)] ring-1 ring-black/5 transition-all duration-300",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "invisible translate-y-3 scale-95 opacity-0"
        )}
      >
        <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 to-brand-900 px-5 pt-5 pb-6 text-white">
          <span
            aria-hidden
            className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent-400/20 blur-2xl"
          />
          <p className="relative text-[12px] font-bold tracking-[0.16em] text-accent-400 uppercase">
            Connect with us
          </p>
          <p className="relative mt-1 text-lg leading-snug font-bold">
            We usually reply within working hours
          </p>
        </div>

        <ul className="-mt-3 space-y-1 rounded-t-3xl bg-white p-3">
          {channels.map((c, i) => (
            <li
              key={c.label}
              className={cn(
                "transition-all duration-300",
                open ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0"
              )}
              style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
            >
              <a
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noopener noreferrer" : undefined}
                className="group flex items-center gap-3 rounded-2xl p-2.5 transition-colors hover:bg-brand-50"
              >
                <span
                  className={cn(
                    "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6",
                    c.tone
                  )}
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-ink">
                    {c.label}
                  </span>
                  <span className="block truncate text-xs text-ink-muted">
                    {c.detail}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Label beside the closed button, so it reads as more than WhatsApp */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        tabIndex={-1}
        aria-hidden
        className={cn(
          "absolute top-1/2 right-[4.25rem] hidden -translate-y-1/2 items-center gap-2 rounded-full bg-white py-2 pr-4 pl-3 text-sm font-semibold whitespace-nowrap text-brand-900 shadow-lg shadow-black/15 ring-1 ring-black/5 transition-all duration-300 sm:flex",
          open ? "pointer-events-none translate-x-2 opacity-0" : "opacity-100"
        )}
      >
        <span className="h-2 w-2 rounded-full bg-[#25D366]" />
        Connect with us
      </button>

      {/* Toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Contact us"}
        className={cn(
          "relative grid h-14 w-14 place-items-center rounded-full text-white shadow-xl shadow-black/25 transition-all duration-300 hover:scale-105",
          open ? "bg-brand-800" : "bg-[#25D366]"
        )}
      >
        {/* Soft pulse while closed, to draw the eye */}
        {!open ? (
          <span
            aria-hidden
            className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30"
          />
        ) : null}
        <span
          className={cn(
            "absolute transition-all duration-300",
            open ? "scale-50 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"
          )}
        >
          <WhatsApp className="h-7 w-7" />
        </span>
        <span
          className={cn(
            "absolute transition-all duration-300",
            open ? "scale-100 rotate-0 opacity-100" : "scale-50 -rotate-90 opacity-0"
          )}
        >
          <Close className="h-6 w-6" />
        </span>
      </button>
    </div>
  );
}
