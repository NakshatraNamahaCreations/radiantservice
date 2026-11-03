import Image from "next/image";
import team from "@/../public/media/team.jpg";
import { testimonials } from "@/data/site";
import { Star } from "./Icons";

/**
 * Client feedback in the reference layout: a centred heading, the photograph
 * set to the right, and the quotes carried on cards clustered over its
 * lower-left corner, reaching out past the image edge.
 */
export default function BestOption() {
  return (
    <section className="relative overflow-hidden bg-[var(--bg-2)] py-16 sm:py-24">
      <div className="container-x relative">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span
            aria-hidden
            className="mx-auto block h-0.5 w-10 rounded-full bg-brand-800"
          />
          <h2 className="mt-6 text-3xl leading-[1.16] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
            Why businesses
            <span className="block">vouch for us</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-muted">
            What business owners say after working with us on tax, GST and
            compliance.
          </p>
        </div>

        {/* Photograph right, client quotes over its lower-left */}
        <div className="relative mt-12 lg:mt-16">
          <div className="overflow-hidden rounded-2xl shadow-xl shadow-brand-900/15 lg:ml-auto lg:w-[66%]">
            <Image
              src={team}
              alt="Our consultants working with a client"
              placeholder="blur"
              sizes="(min-width: 1024px) 44rem, 100vw"
              className="aspect-4/3 w-full object-cover sm:aspect-16/10"
            />
          </div>

          <ul className="mt-6 grid gap-4 sm:grid-cols-3 lg:absolute lg:bottom-8 lg:left-0 lg:mt-0 lg:w-[62%]">
            {testimonials.map((t) => (
              <li key={t.name}>
                <figure className="flex h-full flex-col rounded-xl bg-white p-5 shadow-[0_14px_34px_-14px_rgba(20,58,110,.30)] ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-14px_rgba(20,58,110,.38)]">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      aria-hidden
                      className="font-serif text-3xl leading-none text-accent-500"
                    >
                      &ldquo;
                    </span>
                    <span className="flex gap-0.5 text-accent-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-3 w-3" />
                      ))}
                    </span>
                  </div>

                  <blockquote className="mt-3 flex-1">
                    <p className="line-clamp-5 text-xs leading-relaxed text-ink-muted">
                      {t.quote}
                    </p>
                  </blockquote>

                  <figcaption className="mt-4 border-t border-[#f3ecdf] pt-3">
                    <div className="text-[16px] leading-snug font-bold text-ink">
                      {t.name}
                    </div>
                    <div className="mt-0.5 text-[11px] font-bold tracking-[0.12em] text-accent-600 uppercase">
                      {t.role}
                    </div>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
