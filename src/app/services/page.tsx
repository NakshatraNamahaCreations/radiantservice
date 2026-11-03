import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ServiceGroups from "@/components/ServiceGroups";
import Faq from "@/components/Faq";
import { CtaBanner } from "@/components/Sections";
import { services } from "@/data/site";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "A specialist GST practice - advisory, annual return and litigation - complete tax and compliance outsourcing, and a Virtual CFO capability, for businesses across Thane and Mumbai.",
  alternates: { canonical: "/services" },
};

// Every service's own questions, gathered under one accordion. The home page
// carries the general FAQs, so this page asks different things.
const serviceFaqs = services.flatMap((s) =>
  s.faqs.map((f) => ({ ...f, service: s.title }))
);

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="GST, tax outsourcing and Virtual CFO"
        body="A specialist Goods and Services Tax practice, a complete tax and compliance function delivered on outsourcing, and a Virtual CFO capability that turns the numbers into decisions."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/services", label: "Our Services" },
        ]}
      />
      <ServiceGroups />
      <Faq
        items={serviceFaqs}
        eyebrow="Service questions"
        title="Asked on live engagements"
        body="Answers tied to the work itself - reconciliation basis, appellate stages, ERP environments and the rest."
        alt
        columns={2}
      />
      <CtaBanner />
    </>
  );
}
