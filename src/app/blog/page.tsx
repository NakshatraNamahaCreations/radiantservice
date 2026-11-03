import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { BlogGrid, CtaBanner } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical notes on tax, GST, compliance and Virtual CFO work from the Apex Radiant team.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Stay updated with the latest in the industry"
        body="Practical notes on tax, GST and compliance from the team that files them every month."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/blog", label: "Blog" },
        ]}
      />

      <BlogGrid />

      <CtaBanner />
    </>
  );
}
