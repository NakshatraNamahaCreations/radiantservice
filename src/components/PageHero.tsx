import Link from "next/link";

export default function PageHero({
  eyebrow,
  title,
  body,
  breadcrumbs,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  breadcrumbs?: { href: string; label: string }[];
}) {
  return (
    <section className="relative isolate overflow-hidden bg-brand-900">
      {/* Navy ground, lit with the brand gold */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "linear-gradient(120deg, #021a3d 0%, #052350 52%, #143a6e 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20"
        style={{
          background:
            "radial-gradient(44rem 22rem at 88% 0%, rgba(200,144,46,.20), transparent 62%), radial-gradient(30rem 18rem at 0% 100%, rgba(47,79,133,.45), transparent 68%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-20 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 11px)",
        }}
      />


      <div className="container-x relative py-14 sm:py-20">
        {breadcrumbs?.length ? (
          <nav aria-label="Breadcrumb" className="mb-6 text-xs text-white/55">
            <ol className="flex flex-wrap items-center gap-1.5">
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.href} className="flex items-center gap-1.5">
                  {i > 0 ? (
                    <span aria-hidden className="text-white/30">
                      /
                    </span>
                  ) : null}
                  <Link
                    href={crumb.href}
                    className="transition-colors hover:text-white"
                  >
                    {crumb.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        {eyebrow ? (
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-400 uppercase">
            {eyebrow}
          </span>
        ) : null}

        <h1 className="mt-4 max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-balance text-white sm:text-5xl">
          {title}
        </h1>


        {body ? (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-white/75">
            {body}
          </p>
        ) : null}
      </div>
    </section>
  );
}
