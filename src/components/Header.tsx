"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, serviceMenu, site } from "@/data/site";
import { ButtonLink, cn } from "./ui";
import Logo from "./Logo";
import { ChevronDown, Close, Menu, Phone } from "./Icons";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // "/" only matches itself; every other item also matches its sub-pages, so a
  // service detail page keeps "Our Services" highlighted.
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        "bg-white",
        scrolled ? "border-b" : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[90rem] items-center justify-between gap-4 px-4 sm:h-24 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const active = isActive(item.href);
            const link = (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-1 rounded-full px-2.5 py-2 text-[15px] font-semibold transition-colors xl:px-3.5 xl:text-[17px]",
                  active
                    ? "bg-[var(--bg-2)] text-brand-600"
                    : "text-brand-900 hover:text-brand-600"
                )}
              >
                {item.label}
                {item.href === "/services" && (
                  <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180" />
                )}
              </Link>
            );
            if (item.href !== "/services") return link;

            // Opens on hover, and on keyboard focus for anyone tabbing through.
            return (
              <div key={item.href} className="group relative">
                {link}
                <div className="invisible absolute top-full left-1/2 w-[min(56rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <div className="grid grid-cols-5 gap-6 rounded-2xl border border-[#ece3d1] bg-white p-6 shadow-[0_24px_48px_-16px_rgba(5,27,58,.25)]">
                    {serviceMenu.map((group) => (
                      <div key={group.title}>
                        <Link
                          href={group.href}
                          className="text-base font-bold text-brand-900 transition-colors hover:text-brand-600"
                        >
                          {group.title}
                        </Link>
                        <span
                          aria-hidden
                          className="mt-2 block h-0.5 w-8 rounded-full bg-accent-500"
                        />
                        <ul className="mt-3 space-y-2">
                          {group.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                className="text-sm text-ink-muted transition-colors hover:text-brand-600"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {/* Opens the consultation pop-up. Hidden on small laptops, where
              the full menu needs the room. */}
          <ButtonLink
            href="#consultation"
            className="hidden text-base sm:inline-flex lg:hidden xl:inline-flex"
          >
            <Phone className="h-4 w-4" />
            Book consultation
          </ButtonLink>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="surface grid h-10 w-10 place-items-center rounded-xl transition-colors lg:hidden"
          >
            {open ? <Close className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden transition-[max-height] duration-300 lg:hidden",
          open
            ? "max-h-[calc(100dvh-5rem)] overflow-y-auto border-t bg-white"
            : "max-h-0"
        )}
      >
        <div className="container-x flex flex-col gap-1 py-4">
          {nav.map((item) => {
            const link = (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "flex-1 rounded-xl px-3 py-3 text-[16px] font-medium hover:bg-[var(--bg-2)]",
                  isActive(item.href) && "bg-[var(--bg-2)] text-brand-600"
                )}
              >
                {item.label}
              </Link>
            );
            if (item.href !== "/services") return link;

            return (
              <div key={item.href}>
                <div className="flex items-center gap-1">
                  {link}
                  <button
                    type="button"
                    aria-label={servicesOpen ? "Hide services" : "Show services"}
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((v) => !v)}
                    className="grid h-11 w-11 place-items-center rounded-xl hover:bg-[var(--bg-2)]"
                  >
                    <ChevronDown
                      className={cn(
                        "h-5 w-5 transition-transform duration-200",
                        servicesOpen && "rotate-180"
                      )}
                    />
                  </button>
                </div>
                {servicesOpen && (
                  <div className="grid gap-5 px-3 pt-2 pb-4 sm:grid-cols-2">
                    {serviceMenu.map((group) => (
                      <div key={group.title}>
                        <Link
                          href={group.href}
                          onClick={() => setOpen(false)}
                          className="text-sm font-bold text-brand-900"
                        >
                          {group.title}
                        </Link>
                        <ul className="mt-2 space-y-1.5 border-l-2 border-accent-500/60 pl-3">
                          {group.items.map((sub) => (
                            <li key={sub.label}>
                              <Link
                                href={sub.href}
                                onClick={() => setOpen(false)}
                                className="text-sm text-ink-muted hover:text-brand-600"
                              >
                                {sub.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          <ButtonLink href={site.phoneHref} size="lg" className="mt-3">
            <Phone className="h-4 w-4" />
            {site.phone}
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
