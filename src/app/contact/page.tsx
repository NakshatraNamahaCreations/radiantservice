import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import ConsultationForm from "@/components/ConsultationForm";
import { Section } from "@/components/ui";
import { ArrowRight, Clock, MapPin, Phone, Tax, WhatsApp } from "@/components/Icons";
import { faqs, site, workingHours } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call ${site.phone} or send a consultation request. ${site.name}, ${site.address}. Open ${site.hours}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const waText = encodeURIComponent(
    `Hi ${site.name}, I would like a consultation.`
  );

  const channels = [
    {
      icon: <Phone className="h-5 w-5" />,
      label: "Phone",
      value: site.phone,
      href: site.phoneHref,
      note: "Fastest way to reach our consultants",
    },
    {
      icon: <WhatsApp className="h-5 w-5" />,
      label: "WhatsApp",
      value: "Chat with us",
      href: `https://wa.me/${site.whatsapp}?text=${waText}`,
      note: "Send documents or ask a quick question",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Need more clarity?"
        body="Share your requirement and our experts will guide you with the right compliance, tax, and legal plan."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/contact", label: "Contact" },
        ]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">Reach us</h2>

            <div className="mt-7 space-y-4">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-start gap-4 rounded-2xl border border-[#ece3d1] bg-white p-5 shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_20px_44px_-16px_rgba(20,58,110,.28)]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white group-hover:ring-brand-600">
                    {c.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[12px] font-bold tracking-[0.14em] text-accent-600 uppercase">
                      {c.label}
                    </span>
                    <span className="mt-1 block text-[16px] font-semibold break-words">
                      {c.value}
                    </span>
                    <span className="muted mt-1 block text-xs leading-relaxed">
                      {c.note}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-[#ece3d1] bg-white p-5 shadow-[0_1px_2px_rgba(5,27,58,.04)]">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div>
                  <h3 className="text-sm font-semibold">Address</h3>
                  <p className="muted mt-1.5 text-sm leading-relaxed">
                    {site.address}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-3 border-t pt-5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                <div className="w-full">
                  <h3 className="text-sm font-semibold">Working Hours</h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {workingHours.map((h) => (
                      <li
                        key={h.day}
                        className="muted flex items-center justify-between gap-4 text-sm"
                      >
                        <span>{h.day}</span>
                        <span className="text-xs font-medium">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <a
              href="/apex-radiant-firm-profile.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 flex items-start gap-4 rounded-2xl bg-brand-800 p-5 shadow-xl shadow-brand-900/20 transition-all duration-300 hover:-translate-y-1"
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/12 text-accent-400 ring-1 ring-white/20">
                <Tax className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block text-[12px] font-bold tracking-[0.14em] text-accent-400 uppercase">
                  Firm profile
                </span>
                <span className="mt-1 block text-[16px] font-semibold text-white">
                  Download the 2026 firm profile
                </span>
                <span className="mt-1 block text-xs leading-relaxed text-brand-100">
                  Service lines, leadership and representative experience (PDF)
                </span>
              </span>
            </a>

          </div>

          <div>
            <h2 className="text-2xl font-bold tracking-tight text-ink">
              Request a Consultation
            </h2>
            <p className="muted mt-3 text-sm leading-relaxed">
              Tell us what you need help with and our team will get back to you
              during working hours.
            </p>
            <div className="mt-7">
              <ConsultationForm />
            </div>
          </div>
        </div>
      </Section>

      <section className="bg-white pb-16 sm:pb-24">
        <div className="container-x">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-ink">
                Find our office
              </h2>
              <p className="muted mt-2 flex items-start gap-2 text-sm leading-relaxed">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                {site.address}
              </p>
            </div>
            <a
              href={site.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-800"
            >
              Open in Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl border border-[#ece3d1] shadow-[0_1px_2px_rgba(5,27,58,.04)]">
            <iframe
              src={site.mapEmbedUrl}
              title={`Map showing ${site.name}`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[22rem] w-full border-0 sm:h-[28rem]"
            />
          </div>
        </div>
      </section>

      <Faq items={faqs} alt />
    </>
  );
}
