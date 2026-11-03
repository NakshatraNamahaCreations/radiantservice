import Link from "next/link";
import { serviceMenu } from "@/data/site";
import { ArrowRight, Check, ServiceIcon } from "./Icons";

type Group = (typeof serviceMenu)[number];

/**
 * One service group as a card: a navy header with the icon and title, the
 * services listed beneath, and an optional "Learn more" footer link. Used by
 * the home page carousel and the Services page.
 */
export default function ServiceCard({
  group,
  index,
  href,
}: {
  group: Group;
  index: number;
  href?: string;
}) {
  const body = (
    <>
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 px-6 pt-6 pb-7">
        <span
          aria-hidden
          className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-accent-400/15 blur-2xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-70"
        />
        <span
          aria-hidden
          className="absolute right-5 bottom-2 text-6xl leading-none font-bold text-white/[0.07]"
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="relative flex items-center gap-4">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent-300 to-accent-600 text-brand-900 shadow-lg shadow-black/25 ring-1 ring-white/30 transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6">
            <ServiceIcon name={group.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <h3 className="text-xl leading-tight font-bold text-white sm:text-2xl">
              {group.title}
            </h3>
            <p className="mt-1 text-xs font-semibold tracking-[0.14em] text-accent-300 uppercase">
              {group.items.length} services
            </p>
          </div>
        </div>
      </div>

      {/* Gold rule between header and body */}
      <span
        aria-hidden
        className="block h-0.5 bg-gradient-to-r from-accent-600 via-accent-300 to-accent-600"
      />

      {/* Services */}
      <ul className="flex-1 divide-y divide-[#f3ecdf] px-6 py-3">
        {group.items.map((item) => (
          <li
            key={item.label}
            className="flex items-center gap-3 py-2.5 text-base text-ink"
          >
            <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <Check className="h-3 w-3" />
            </span>
            {item.label}
          </li>
        ))}
      </ul>

      {href ? (
        <span className="mx-6 mb-5 flex items-center justify-between border-t border-[#f3ecdf] pt-4 text-sm font-semibold text-brand-700">
          Learn more
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand-50 text-brand-700 transition-all duration-300 group-hover:translate-x-1 group-hover:bg-brand-700 group-hover:text-white">
            <ArrowRight className="h-4 w-4" />
          </span>
        </span>
      ) : null}

      {/* Gold underline that draws in on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600 transition-transform duration-500 group-hover:scale-x-100"
      />
    </>
  );

  const cardClass =
    "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#ece3d1] bg-white shadow-[0_2px_10px_-4px_rgba(5,27,58,.10)] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-300 hover:shadow-[0_26px_50px_-20px_rgba(5,27,58,.40)]";

  return href ? (
    <Link href={href} className={cardClass}>
      {body}
    </Link>
  ) : (
    <article className={cardClass}>{body}</article>
  );
}
