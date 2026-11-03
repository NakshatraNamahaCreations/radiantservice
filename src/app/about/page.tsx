import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Leadership } from "@/components/Sections";
import FirmAtAGlance from "@/components/FirmAtAGlance";
import { Section, SectionHeading } from "@/components/ui";
import { Check, Shield } from "@/components/Icons";
import CountUp from "@/components/CountUp";
import { aboutIntro, assurances, highlights, site, stats } from "@/data/site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Elite Radiant Consultants LLP is a CA and financial consultancy built on Professionalism, Trust and Quality, serving businesses across Thane, Mumbai and Navi Mumbai.",
  alternates: { canonical: "/about" },
};

const values = [
  {
    title: "Professionalism",
    body: "Qualified chartered accountants and consultants handling your work, with clear ownership and documented process at every stage.",
  },
  {
    title: "Trust",
    body: "Your financial information stays confidential, and our advice is the same whether or not it wins us additional work.",
  },
  {
    title: "Quality",
    body: "Filings are reviewed before submission, reconciliations are done monthly, and documentation is kept audit-ready year round.",
  },
  {
    title: "Competitive cost",
    body: "Financial expertise and strategic insight priced for growing businesses, without the overhead of a full-time finance team.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the firm"
        title="Financial and legal support built for growing businesses"
        body={aboutIntro}
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/about", label: "About Us" },
        ]}
      />

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Who we are"
              title="More than a virtual CFO firm"
              body="We are your partners in business growth. Our work spans chartered accountancy, business consultancy, income tax and GST filings, legal drafting, Virtual CFO support, strategic planning, and statutory compliance management."
            />

            <ul className="mt-8 space-y-3.5">
              {highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-500/15 text-accent-600">
                    <Check className="h-3 w-3" />
                  </span>
                  <span className="text-sm leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>

            <p className="muted mt-8 text-sm leading-relaxed">
              We work with startups taking their first compliance steps and with
              established companies managing complex financial strategy. The
              engagement scales to the business rather than the other way round.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => (
              <div key={s.label} className="surface rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-brand-600">
                  <CountUp value={s.value} />
                </div>
                <div className="muted mt-1.5 text-xs">{s.label}</div>
              </div>
            ))}
            <div className="surface rounded-2xl p-6 sm:col-span-2">
              <Shield className="h-6 w-6 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold">
                {site.legalName}
              </h3>
              <p className="muted mt-2 text-sm leading-relaxed">
                Operating from {site.address}, serving clients across Thane,
                Mumbai and Navi Mumbai.
              </p>
              <ul className="mt-4 flex flex-wrap gap-2 border-t pt-4">
                {assurances.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-1.5 rounded-full bg-[var(--bg-2)] px-2.5 py-1 text-xs font-medium"
                  >
                    <Check className="h-3 w-3 text-accent-600" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section alt>
        <SectionHeading
          eyebrow="Our foundation"
          title="What we are built on"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="surface rounded-2xl p-6">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-600/10 text-brand-600">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{v.title}</h3>
              <p className="muted mt-2 text-sm leading-relaxed">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <FirmAtAGlance />
      <Leadership />
    </>
  );
}
