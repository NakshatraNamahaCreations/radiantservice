import Hero from "@/components/Hero";
import ServiceLines from "@/components/ServiceLines";
import Faq from "@/components/Faq";
import {
  AboutPreview,
  CtaBanner,
  HowItWorks,
  ServiceAreas,
  Testimonials,
} from "@/components/Sections";
import { faqs } from "@/data/site";

export default function HomePage() {
  return (
    <>
      <span id="top" aria-hidden />
      <Hero />
      <AboutPreview />
      <HowItWorks />
      <ServiceLines />
      <Testimonials />
      <ServiceAreas />
      <Faq items={faqs} alt id="faq" />
      <CtaBanner />
    </>
  );
}
