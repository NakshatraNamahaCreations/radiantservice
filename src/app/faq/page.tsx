import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import { faqs, services } from "@/data/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Quick answers about our financial, compliance, and legal services - Virtual CFO, income tax, GST, legal drafting and statutory compliance.",
  alternates: { canonical: "/faq" },
};

// Every service-level question, grouped under one page alongside the general ones.
const serviceFaqs = services.flatMap((s) =>
  s.faqs.map((f) => ({ ...f, service: s.title }))
);

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        body="Quick answers about our financial, compliance, and legal services. If you need help, feel free to contact us."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/faq", label: "FAQ" },
        ]}
      />

      <Faq
        items={faqs}
        eyebrow="General"
        title="About working with us"
        columns={2}
      />

      <Faq
        items={serviceFaqs}
        eyebrow="By service"
        title="Service-specific questions"
        body="Answers tied to individual engagements, from Virtual CFO reporting to GST reconciliation."
        alt
        columns={2}
      />

    </>
  );
}
