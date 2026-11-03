import Link from "next/link";
import type { ReactNode } from "react";

export function cn(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-200 disabled:opacity-60 disabled:pointer-events-none";

const variants = {
  primary:
    "bg-gradient-to-br from-brand-600 to-brand-800 text-white ring-1 ring-inset ring-white/10 shadow-lg shadow-brand-800/25 hover:from-brand-700 hover:to-brand-900 hover:shadow-brand-800/40 hover:-translate-y-0.5",
  accent:
    "bg-gold text-brand-900 shadow-lg shadow-accent-600/30 hover:brightness-105 hover:-translate-y-0.5",
  outline:
    "border border-[var(--line)] hover:border-accent-500 hover:text-brand-700 bg-transparent",
  white:
    "bg-white text-brand-700 hover:bg-white/92 shadow-lg shadow-black/25 hover:-translate-y-0.5",
  ghost: "hover:bg-[var(--bg-2)]",
} as const;

const sizes = {
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  lg: "px-7 py-3.5 text-base",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: ReactNode;
};

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & { href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const classes = cn(buttonBase, variants[variant], sizes[size], className);
  const isExternal = /^(https?:|tel:|mailto:|#)/.test(href);

  if (isExternal) {
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(buttonBase, variants[variant], sizes[size], className)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Section({
  children,
  className,
  alt = false,
  id,
}: {
  children: ReactNode;
  className?: string;
  alt?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-16 sm:py-24",
        alt && "bg-[var(--bg-2)]",
        className
      )}
    >
      <div className="container-x">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold tracking-wide text-brand-700 uppercase dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-300">
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  body?: string;
  center?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow ? (
        <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="mt-4 text-3xl leading-[1.14] font-bold tracking-tight text-balance text-ink sm:text-[2.4rem]">
        {title}
      </h2>
      {body ? (
        <p className="mt-6 text-base leading-relaxed text-pretty text-ink-muted">
          {body}
        </p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("surface rounded-2xl p-6", className)}>{children}</div>
  );
}

export function Rupee({ value, unit }: { value: number; unit?: string }) {
  return (
    <span className="font-semibold">
      &#8377;{value.toLocaleString("en-IN")}
      {unit ? <span className="muted text-xs font-normal"> {unit}</span> : null}
    </span>
  );
}
