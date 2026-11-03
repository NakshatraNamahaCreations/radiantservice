import Link from "next/link";
import { services } from "@/data/site";
import { ArrowRight, ServiceIcon } from "./Icons";

/**
 * The three practice lines with their services listed under each. Used on the
 * Services page, where the home page's carousel would only repeat itself.
 */
const lines = [
  {
    key: "Goods & Services Tax",
    blurb:
      "The core of the practice. Advisory, annual return and reconciliation work, and litigation from show-cause notice through the appellate stage.",
  },
  {
    key: "Complete Tax Outsourcing",
    blurb:
      "Indirect tax, direct tax, transfer pricing, payroll and corporate compliance run off a single set of books and a single calendar.",
  },
  {
    key: "Virtual CFO & Finance Function",
    blurb:
      "Reporting management can act on, planning and control that holds the working capital line, and a close that leaves you audit-ready.",
  },
];

export default function PracticeLines() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42rem 24rem at 92% -10%, rgba(20,58,110,.07), transparent 60%), radial-gradient(30rem 18rem at 2% 108%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="container-x relative space-y-14">
        {lines.map((line, lineIndex) => {
          const items = services.filter((s) => s.group === line.key);
          if (items.length === 0) return null;

          return (
            <div key={line.key}>
              {/* Practice line header */}
              <div className="flex flex-col gap-4 border-b border-[#ece3d1] pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div className="max-w-2xl">
                  <span className="text-xs font-bold tracking-[0.18em] text-accent-600 uppercase">
                    {String(lineIndex + 1).padStart(2, "0")} &middot;{" "}
                    {line.key}
                  </span>
                  <p className="mt-3 text-base leading-relaxed text-pretty text-ink-muted">
                    {line.blurb}
                  </p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-ink-muted">
                  {items.length} {items.length === 1 ? "service" : "services"}
                </span>
              </div>

              {/* Services under it */}
              <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s) => (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    className="group flex flex-col rounded-2xl border border-[#ece3d1] bg-white p-6 shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-16px_rgba(20,58,110,.28)]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                      <ServiceIcon name={s.icon} className="h-5 w-5" />
                    </span>

                    <h3 className="mt-5 text-base leading-snug font-bold text-balance text-ink transition-colors group-hover:text-brand-700">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-ink-muted">
                      {s.short}
                    </p>

                    <span className="mt-5 flex items-center gap-2 border-t border-[#f3ecdf] pt-4 text-xs font-bold tracking-wider text-brand-600 uppercase">
                      Read more
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
