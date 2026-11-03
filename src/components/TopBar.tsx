import { site } from "@/data/site";
import { Clock, Mail, Phone } from "./Icons";

/** Thin contact strip above the header. It scrolls away; the header stays. */
export default function TopBar() {
  return (
    <div className="relative bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white">
      <div className="mx-auto flex h-10 w-full max-w-[90rem] items-center justify-between gap-4 px-4 text-xs sm:px-6 sm:text-[14px]">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <a
            href={site.phoneHref}
            className="flex shrink-0 items-center gap-1.5 text-white/85 transition-colors hover:text-accent-400"
          >
            <Phone className="h-3.5 w-3.5 text-accent-400" />
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="flex min-w-0 items-center gap-1.5 text-white/85 transition-colors hover:text-accent-400"
          >
            <Mail className="h-3.5 w-3.5 shrink-0 text-accent-400" />
            <span className="truncate">{site.email}</span>
          </a>
        </div>

        <span className="hidden shrink-0 items-center gap-1.5 text-white/70 md:flex">
          <Clock className="h-3.5 w-3.5 text-accent-400" />
          {site.hours}
        </span>
      </div>
      {/* Fine gold rule, as under the wordmark in the logo */}
      <span aria-hidden className="bg-gold absolute inset-x-0 bottom-0 h-px" />
    </div>
  );
}
