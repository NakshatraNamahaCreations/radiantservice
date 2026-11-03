import { firmAtAGlance } from "@/data/site";
import { ServiceIcon } from "./Icons";

/**
 * The firm's own summary of its specialisation, structure and client base.
 * Used on the About page only - nothing else on the site covers this ground.
 */
export default function FirmAtAGlance() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-2)] py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 22rem at 100% 0%, rgba(20,58,110,.07), transparent 62%), radial-gradient(30rem 18rem at 0% 100%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
            The practice
          </span>
          <h2 className="mt-4 text-3xl leading-[1.14] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
            At a glance
          </h2>
        </div>

        <dl className="mt-14 space-y-5">
          {firmAtAGlance.map((row) => (
            <div
              key={row.label}
              className="group grid gap-5 rounded-2xl border border-[#ece3d1] bg-white p-6 shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_20px_44px_-16px_rgba(20,58,110,.26)] sm:p-8 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-10"
            >
              <dt className="flex items-center gap-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                  <ServiceIcon name={row.icon} className="h-6 w-6" />
                </span>
                <span className="text-lg font-bold text-ink">{row.label}</span>
              </dt>
              <dd className="text-[16px] leading-relaxed text-ink-muted lg:border-l lg:border-[#f3ecdf] lg:pl-10">
                {row.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
