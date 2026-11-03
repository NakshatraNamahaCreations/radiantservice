import Image from "next/image";
import Link from "next/link";
import ctaImage from "@/../public/media/cta.jpg";
import aboutMain from "@/../public/media/about/main.jpg";
import aboutInset from "@/../public/media/about/inset.jpg";
import coverageImage from "@/../public/media/coverage.jpg";
import {
  aboutIntro,
  assurances,
  caseStudies,
  highlights,
  posts,
  site,
  stats,
  testimonials,
} from "@/data/site";
import { ButtonLink, Section, SectionHeading } from "./ui";
import CountUp from "./CountUp";
import { ArrowRight, Check, Phone, Shield } from "./Icons";

export function AboutPreview() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 24rem at 0% 0%, rgba(20,58,110,.06), transparent 60%), radial-gradient(28rem 18rem at 100% 92%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Copy */}
          <div>
            <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
              About {site.name}
            </span>
            <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
              Financial and legal support built for growing businesses
            </h2>

            <p className="mt-7 text-base leading-relaxed text-pretty text-ink-muted">
              {aboutIntro}
            </p>

            <ul className="mt-8 space-y-4">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3.5">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-accent-500/12 text-accent-600 ring-1 ring-accent-500/20">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[16px] leading-relaxed text-ink">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <ButtonLink href="/about" size="lg">
                Know about us
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
              <ButtonLink href="/contact" variant="outline" size="lg">
                Talk to us
                <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </div>

          {/* Image composition */}
          <div className="relative lg:pl-6">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl shadow-brand-900/20 ring-1 ring-black/5">
              <Image
                src={aboutMain}
                alt="Our team working with a client"
                placeholder="blur"
                sizes="(min-width: 1024px) 34rem, 100vw"
                className="aspect-4/5 w-full object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(2,19,45,.42) 0%, transparent 45%)",
                }}
              />
            </div>

            {/* Overlapping inset photo */}
            <div className="absolute -bottom-8 -left-2 hidden overflow-hidden rounded-2xl shadow-xl shadow-brand-900/25 ring-4 ring-white sm:block lg:-left-8">
              <Image
                src={aboutInset}
                alt=""
                placeholder="blur"
                sizes="11rem"
                className="h-40 w-40 object-cover lg:h-44 lg:w-44"
              />
            </div>

            {/* Floating trust card */}
            <div className="absolute -top-5 -right-2 max-w-[15rem] rounded-2xl bg-brand-700 p-5 shadow-xl shadow-brand-900/30 lg:-right-6">
              <Shield className="h-6 w-6 text-accent-400" />
              <h3 className="mt-3 text-sm font-bold text-white">
                Professionalism, Trust and Quality
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-brand-100">
                The foundation we work on, at a competitive cost.
              </p>
            </div>
          </div>
        </div>

        {/* Stats rail */}
        <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-[#ece3d1] ring-1 ring-[#ece3d1] sm:mt-24 lg:grid-cols-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="group bg-white px-6 py-8 text-center transition-colors hover:bg-brand-50"
            >
              <dt className="text-3xl font-bold text-brand-600 sm:text-4xl">
                <CountUp value={s.value} />
              </dt>
              <dd className="mt-2 text-xs tracking-wide text-ink-muted uppercase">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

// The process block is an animated client component; re-exported here so pages
// that already import { HowItWorks } from "./Sections" keep working.
export { default as HowItWorks } from "./ProcessSteps";

export function CaseStudies() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 22rem at 100% 0%, rgba(20,58,110,.06), transparent 62%), radial-gradient(30rem 18rem at 0% 100%, rgba(200,144,46,.05), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
            Case studies
          </span>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
            Real outcomes delivered with clarity and compliance
          </h2>
          <p className="mt-4 text-base leading-relaxed text-pretty text-ink-muted">
            Explore how {site.name} supports businesses with structured finance,
            accurate filings, and strong compliance systems.
          </p>
        </div>

        <div className="mt-14 grid gap-7 lg:grid-cols-3">
          {caseStudies.map((c) => (
            <article
              key={c.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ece3d1] bg-white shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-14px_rgba(20,58,110,.28)]"
            >
              {/* Image with the headline sitting on it */}
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={c.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(2,19,45,.92) 0%, rgba(2,19,45,.55) 42%, rgba(2,19,45,.18) 72%, rgba(2,19,45,.30) 100%)",
                  }}
                />

                <div className="absolute top-4 right-4 left-4 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold tracking-wide text-brand-700 uppercase shadow-sm backdrop-blur-sm">
                    {c.category}
                  </span>
                  <span className="rounded-full bg-black/35 px-2.5 py-1 text-[12px] font-medium text-white/90 backdrop-blur-sm">
                    {c.client}
                  </span>
                </div>

                <h3 className="absolute right-5 bottom-5 left-5 text-lg leading-snug font-bold text-balance text-white">
                  {c.title}
                </h3>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <p className="flex-1 text-sm leading-relaxed text-ink-muted">
                  {c.body}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-[#f3ecdf] pt-5">
                  {c.outcomes.map((o) => (
                    <li
                      key={o}
                      className="flex items-center gap-2.5 text-sm font-medium text-ink"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-md bg-accent-500/12 text-accent-600 ring-1 ring-accent-500/20">
                        <Check className="h-3 w-3" />
                      </span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-6 rounded-2xl border border-[#ece3d1] bg-[var(--bg-2)] p-8 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <h3 className="text-lg font-bold text-ink">
              Want similar results for your business?
            </h3>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-ink-muted">
              Get support for tax filing, compliance, Virtual CFO, and business
              planning with a clear process and timely delivery.
            </p>
          </div>
          <ButtonLink href="#consultation" size="lg" className="shrink-0">
            Book a consultation
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

// "We're the best option for your finances" - carries the client quotes.
export { default as Testimonials } from "./BestOption";

// "Meet the founders" - the partners from the firm profile.
export { default as Leadership } from "./Leadership";

// "Why clients engage us", from the firm profile.
export { default as WhyUs } from "./WhyUs";

/** Every post as a card, for the /blog page. */
export function BlogGrid() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="container-x">
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <article
              key={p.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#ece3d1] bg-white shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-14px_rgba(20,58,110,.28)]"
            >
              <div className="relative aspect-16/10 overflow-hidden">
                <Image
                  src={p.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 24rem, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(3,26,61,.62) 0%, rgba(3,26,61,.12) 45%, transparent 75%)",
                  }}
                />

                <span className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[12px] font-bold tracking-wide text-brand-700 uppercase shadow-sm backdrop-blur-sm">
                  {p.tag}
                </span>

                <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between text-[12px] font-medium text-white/85">
                  <span>{p.date}</span>
                  <span>{p.readTime}</span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-lg leading-snug font-semibold text-balance text-ink transition-colors group-hover:text-brand-700">
                  {p.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-muted">
                  {p.excerpt}
                </p>

                <div className="mt-6 flex items-center gap-2.5 border-t border-[#f3ecdf] pt-5">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-50 text-[12px] font-bold text-brand-600">
                    R
                  </span>
                  <span className="text-xs font-medium text-ink-muted">
                    by {p.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceAreas() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Mumbai skyline at night */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={coverageImage}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(2,19,45,.80) 0%, rgba(3,26,61,.60) 45%, rgba(2,19,45,.84) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(45rem 26rem at 50% 0%, rgba(20,58,110,.35), transparent 62%)",
          }}
        />
      </div>

      <div className="container-x relative py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-400 uppercase">
            Coverage
          </span>
          <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-white sm:text-[2.6rem]">
            Let&apos;s work together
          </h2>
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/contact" variant="white" size="lg">
            Get in touch
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section id="contact" className="relative isolate overflow-hidden">
      {/* Full-bleed still lifted from the banner video */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <Image
          src={ctaImage}
          alt=""
          fill
          sizes="100vw"
          placeholder="blur"
          className="object-cover object-center"
        />
        {/* Scrim: heavy on the left so the card always has contrast behind it */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(3,26,61,.80) 0%, rgba(3,26,61,.52) 42%, rgba(3,26,61,.28) 72%, rgba(11,44,90,.34) 100%)",
          }}
        />
      </div>

      <div className="container-x py-16 sm:py-24 lg:py-28">
        <div className="relative max-w-xl overflow-hidden rounded-3xl bg-brand-50/95 p-8 shadow-2xl shadow-black/25 ring-1 ring-white/60 backdrop-blur-sm sm:p-11">
          {/* Soft brand watermark, echoing the reference card */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-10 -bottom-12 h-52 w-52 rounded-full bg-accent-500/10"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -top-16 -right-4 h-40 w-40 rounded-full bg-brand-600/8"
          />

          <div className="relative">
            <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
              Get started
            </span>

            <h2 className="mt-4 text-3xl leading-[1.12] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
              Your goals, our plan
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-pretty text-ink-muted">
              Trusted CA and financial consultancy in Thane and Mumbai. Share
              your requirement and our experts will guide you with the right
              compliance, tax, and legal plan.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 rounded-full bg-brand-600 py-3.5 pr-3.5 pl-7 text-sm font-bold tracking-wide text-white uppercase shadow-lg shadow-brand-600/25 transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-xl hover:shadow-brand-600/30"
              >
                Contact us
                <span className="grid h-8 w-8 place-items-center rounded-full bg-accent-500 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <a
                href={site.phoneHref}
                className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition-colors hover:text-brand-600"
              >
                <Phone className="h-4 w-4" />
                {site.phone}
              </a>
            </div>

            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 border-t border-brand-200/70 pt-6">
              {assurances.map((a) => (
                <li
                  key={a}
                  className="flex items-center gap-2 text-xs font-medium text-ink-muted"
                >
                  <Check className="h-3.5 w-3.5 text-accent-600" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
