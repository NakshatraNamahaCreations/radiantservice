import { site, whyUs } from "@/data/site";
import { ButtonLink } from "./ui";
import { ArrowRight, Phone, ServiceIcon } from "./Icons";

/**
 * "Why clients engage us", from the firm profile. An intro column on the left
 * holds the heading and the call to action while the points run alongside it,
 * each numbered and carrying its own icon.
 */
export default function WhyUs() {
  return (
    <section className="relative isolate overflow-hidden py-16 sm:py-24">
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(135deg, #021a3d 0%, #052350 50%, #143a6e 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(48rem 28rem at 82% 6%, rgba(200,144,46,.20), transparent 62%), radial-gradient(34rem 20rem at 0% 100%, rgba(47,79,133,.42), transparent 66%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 11px)",
        }}
      />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_1.4fr] lg:gap-16">
          {/* Intro */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <span className="text-xs font-semibold tracking-[0.18em] text-accent-400 uppercase">
              Why clients engage us
            </span>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-white sm:text-[2.5rem]">
              Depth where it counts
            </h2>
            <p className="mt-6 text-base leading-relaxed text-pretty text-white/70">
              Six reasons mid-market and promoter-led businesses move their tax
              and compliance function to us, and stay.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/contact" variant="accent">
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink
                href={site.phoneHref}
                className="border border-white/25 bg-white/10 text-white shadow-none hover:bg-white/20"
              >
                <Phone className="h-4 w-4" />
                Call now
              </ButtonLink>
            </div>
          </div>

          {/* The six points */}
          <ol className="grid gap-5 sm:grid-cols-2">
            {whyUs.map((item, i) => (
              <li key={item.title}>
                <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/15 bg-white/8 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-400/50 hover:bg-white/12">
                  {/* Gold rule reveals along the top on hover */}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-accent-400 to-accent-200 transition-transform duration-300 group-hover:scale-x-100"
                  />

                  {/* The index, held back behind the content */}
                  <span
                    aria-hidden
                    className="absolute top-4 right-5 text-4xl font-bold text-white/8 transition-colors duration-300 group-hover:text-accent-400/25"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="relative grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-400 ring-1 ring-accent-500/30 transition-all duration-300 group-hover:bg-accent-500 group-hover:text-ink group-hover:ring-accent-500">
                    <ServiceIcon name={item.icon} className="h-5 w-5" />
                  </span>

                  <h3 className="relative mt-5 text-base leading-snug font-bold text-balance text-white">
                    {item.title}
                  </h3>
                  <p className="relative mt-3 text-sm leading-relaxed text-white/70">
                    {item.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
