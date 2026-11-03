import Link from "next/link";
import { areas, nav, serviceMenu, site, workingHours } from "@/data/site";
import { LinkedIn, Mail, MapPin, Phone } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-white">
      <span aria-hidden className="bg-gold absolute inset-x-0 top-0 h-[3px]" />
      <div className="container-x pt-14 pb-24 sm:pb-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo />
            <p className="muted mt-4 max-w-xs text-sm leading-relaxed">
              Professional CA &amp; financial consultancy services helping
              businesses grow with compliance, clarity and financial confidence.
            </p>

            {site.social.linkedin ? (
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#0A66C2] py-2 pr-4 pl-2 text-sm font-semibold text-white shadow-md shadow-[#0A66C2]/25 transition-transform hover:-translate-y-0.5"
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-white/15">
                  <LinkedIn className="h-4 w-4" />
                </span>
                Follow on LinkedIn
              </a>
            ) : null}

            <h3 className="mt-6 text-sm font-semibold">We are active in</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {areas.map((a) => (
                <li
                  key={a}
                  className="surface flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium"
                >
                  <MapPin className="h-3.5 w-3.5 text-brand-600" />
                  {a}
                </li>
              ))}
            </ul>

          </div>

          <div>
            <h3 className="text-sm font-semibold">Our Services</h3>
            <ul className="mt-4 space-y-3.5">
              {serviceMenu.map((group) => (
                <li key={group.title}>
                  <Link
                    href={group.href}
                    className="text-sm font-medium transition-colors hover:text-brand-600"
                  >
                    {group.title}
                  </Link>
                  <p className="muted mt-1 text-xs leading-relaxed">
                    {group.items.map((item) => item.label).join(" · ")}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="muted text-sm transition-colors hover:text-brand-600"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Contact</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li>
                <span className="muted block text-xs">Phone:</span>
                <a
                  href={site.phoneHref}
                  className="mt-1 flex items-center gap-2 font-medium transition-colors hover:text-brand-600"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {site.phone}
                </a>
              </li>
              <li>
                <span className="muted block text-xs">Email:</span>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-1 flex items-center gap-2 font-medium break-all transition-colors hover:text-brand-600"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {site.email}
                </a>
              </li>
              <li>
                <span className="muted block text-xs">Address:</span>
                <a
                  href={site.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="muted mt-1 flex items-start gap-2 leading-relaxed transition-colors hover:text-brand-600"
                >
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  {site.address}
                </a>
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold">Working Hours</h3>
            <ul className="mt-3 space-y-2.5">
              {workingHours.map((h) => (
                <li
                  key={h.day}
                  className="muted flex items-center justify-between gap-4 text-sm"
                >
                  <span>{h.day}</span>
                  <span
                    className={
                      h.time === "Closed" ? "text-xs" : "text-xs font-medium"
                    }
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>

          </div>
        </div>

        <div className="mt-12 flex flex-col gap-5 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="muted text-xs">
            &copy; {year} {site.name}. All Rights Reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link href="/privacy" className="muted text-xs hover:text-brand-600">
              Privacy Policy
            </Link>
            <Link href="/terms" className="muted text-xs hover:text-brand-600">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
