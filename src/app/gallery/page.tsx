import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { CtaBanner } from "@/components/Sections";
import GalleryGrid from "@/components/GalleryGrid";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Gallery",
  description: `A look at how ${site.name} works - client advisory sessions, audit and documentation reviews, compliance planning and the team behind it.`,
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A look inside how we work"
        body="Advisory sessions, documentation reviews, compliance planning and the day-to-day of a working consultancy."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/gallery", label: "Gallery" },
        ]}
      />

      <GalleryGrid />

      <CtaBanner />
    </>
  );
}
