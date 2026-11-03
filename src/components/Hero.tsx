import Image from "next/image";
import banner from "@/../public/media/banner-gst-blocks.jpg";
import { site } from "@/data/site";
import { ButtonLink } from "./ui";
import { ArrowRight, Phone, Shield } from "./Icons";

export default function Hero() {
  return (
    <section className="relative isolate -mt-20 overflow-hidden bg-white sm:-mt-24">
      {/* The artwork is shown whole: width 100%, height from its own aspect
          ratio, so nothing is ever cropped off the sides. */}
      <div className="relative pt-20 sm:pt-24">
        <Image
          src={banner}
          alt=""
          aria-hidden
          priority
          sizes="100vw"
          placeholder="blur"
          className="h-auto w-full"
        />

        {/* The banner is light on the left, so the copy is dark. A soft white
            wash keeps it readable where it runs over the blurred laptop.
            Below lg the copy sits underneath the artwork instead. */}
        <div
          aria-hidden
          className="absolute inset-x-0 top-20 bottom-0 hidden lg:block sm:top-24"
          style={{
            background:
              "linear-gradient(90deg, rgba(255,255,255,.55) 0%, rgba(255,255,255,.45) 35%, rgba(255,255,255,0) 55%)",
          }}
        />

        <div className="lg:absolute lg:inset-x-0 lg:top-24 lg:bottom-0 lg:flex lg:items-center">
          <div className="container-x w-full py-12 lg:py-6">
            <div className="animate-fade-up max-w-xl text-ink xl:max-w-2xl">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-accent-500/40 bg-white/85 px-4 py-1.5 shadow-sm backdrop-blur-md">
                <Shield className="h-4 w-4 text-accent-600" />
                <span className="text-[12px] font-semibold tracking-wide text-brand-800 uppercase sm:text-xs">
                  {site.tagline}
                </span>
              </div>

              <h1 className="mt-5 text-[2rem] leading-[1.08] font-bold tracking-tight text-balance text-brand-900 sm:text-4xl lg:mt-6 lg:text-[2.5rem] xl:text-[3.2rem]">
                Income Tax and GST
                <span className="text-gold block pb-1">filings made simple</span>
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-relaxed text-pretty text-ink-muted lg:mt-5 xl:text-base">
                {site.name} handles income tax and GST filings, statutory
                compliance, legal drafting and Virtual CFO support for
                businesses across Thane and Mumbai.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 lg:mt-7">
                <ButtonLink href="#consultation">
                  <Phone className="h-4 w-4" />
                  Book a consultation
                </ButtonLink>
                <ButtonLink
                  href="/#services"
                  variant="white"
                  className="ring-1 ring-brand-200"
                >
                  View services
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
