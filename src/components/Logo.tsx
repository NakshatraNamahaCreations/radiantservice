import Image from "next/image";
import Link from "next/link";
import logo from "@/../public/brand/logo-full.jpg";
import { cn } from "./ui";

/**
 * Brand lockup, used exactly as supplied - the full Apex Radiant artwork
 * (eagle, wordmark, CA mark and the services line), not a crop of it.
 *
 * The artwork has an opaque white ground, so over the dark video banner it sits
 * on a white card. That presents the logo on its own background rather than
 * altering the artwork.
 */
export default function Logo({
  onDark = false,
  className,
}: {
  onDark?: boolean;
  className?: string;
}) {
  return (
    <Link href="/" className={cn("flex shrink-0 items-center", className)}>
      <span
        className={cn(
          "inline-flex items-center overflow-hidden rounded-xl bg-white",
          onDark
            ? "px-3 py-1.5 shadow-lg shadow-black/20 ring-1 ring-white/25"
            : "px-2 py-1"
        )}
      >
        <Image
          src={logo}
          alt="Apex Radiant Consultant LLP - Chartered Accountants, Tax Consultants, Virtual CFO"
          priority
          sizes="(min-width: 640px) 375px, 245px"
          className="h-14 w-auto object-contain sm:h-20"
        />
      </span>
    </Link>
  );
}
