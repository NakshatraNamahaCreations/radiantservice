import Image, { type StaticImageData } from "next/image";
import sanjayJohary from "@/../public/media/team/sanjay-johary-card.jpg";
import rajkamalSingh from "@/../public/media/team/rajkamal-singh-card.jpg";
import amandeepKaur from "@/../public/media/team/amandeep-kaur-card.jpg";
import { founders, team } from "@/data/site";
import { Check, Star } from "./Icons";

/**
 * Portraits are imported rather than referenced by path so Next fingerprints
 * each file by content. Replacing a photo therefore changes its URL, which
 * busts both the browser cache and Next's image optimiser - a plain
 * "/media/..." string keeps the same URL and serves the previous crop.
 */
const portraits: Record<string, StaticImageData> = {
  "/media/team/sanjay-johary-card.jpg": sanjayJohary,
  "/media/team/rajkamal-singh-card.jpg": rajkamalSingh,
  "/media/team/amandeep-kaur-card.jpg": amandeepKaur,
};

/**
 * The founders and the team in one row - each person led by a large portrait,
 * with tenure, the practices they came from and what they focus on beneath it.
 */
export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative overflow-hidden bg-white py-16 sm:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(40rem 24rem at 100% 0%, rgba(20,58,110,.06), transparent 62%), radial-gradient(30rem 18rem at 0% 100%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.18em] text-accent-600 uppercase">
            Leadership
          </span>
          <h2 className="mt-4 text-3xl leading-[1.14] font-bold tracking-tight text-balance text-ink sm:text-[2.6rem]">
            Meet our founders &amp; team
          </h2>
          <p className="mt-6 text-base leading-relaxed text-pretty text-ink-muted">
            Trained in large international accounting networks and in the
            finance functions of listed Indian corporates. Clients deal directly
            with a Partner throughout.
          </p>
        </div>

        {/* One row: the founders first, then the rest of the team. */}
        <div className="mt-14 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {[...founders, ...team].map((person) => (
            <PersonCard key={person.name} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}

type Person = (typeof founders)[number] | (typeof team)[number];

function PersonCard({ person }: { person: Person }) {
  const photoPath = "photo" in person ? person.photo : undefined;
  const photo = photoPath ? portraits[photoPath] : undefined;
  // Some portraits arrive as finished cards with their own name
  // plate; those are shown whole and keep their own caption.
  const isCard = "photoIsCard" in person && person.photoIsCard;
  // Some supplied cards print the tenure themselves.
  const cardShowsTenure =
    "photoShowsTenure" in person && person.photoShowsTenure;
  // A gold label over the portrait, e.g. "Founder".
  const badge = "badge" in person ? person.badge : undefined;

  return (
    <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-[#ece3d1] bg-white shadow-[0_1px_2px_rgba(5,27,58,.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-brand-200 hover:shadow-[0_26px_54px_-18px_rgba(20,58,110,.34)]">
      {/* Portrait leads the card */}
      <div
        className={
          isCard
            ? "relative aspect-4/5 overflow-hidden bg-white"
            : "relative aspect-4/5 overflow-hidden bg-brand-800"
        }
      >
        {photo ? (
          <Image
            src={photo}
            alt={person.name}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 50vw, 100vw"
            className={
              isCard
                ? "object-contain"
                : "object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
            }
          />
        ) : (
          <span className="absolute inset-0 grid place-items-center text-5xl font-bold text-white/25">
            {person.name
              .replace(/^CA\s+/, "")
              .split(" ")
              .map((w) => w[0])
              .slice(0, 2)
              .join("")}
          </span>
        )}

        {badge ? (
          <span className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-accent-600 via-accent-400 to-accent-600 px-4 py-2 text-xs font-extrabold tracking-[0.16em] text-brand-900 uppercase shadow-lg shadow-accent-600/40 ring-2 ring-white">
            <Star className="h-3.5 w-3.5 fill-current" />
            {badge}
          </span>
        ) : null}

        {/* Name and role sit on plain portraits; a supplied card
            already carries them. */}
        {!isCard ? (
          <>
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(5,35,80,.94) 0%, rgba(5,35,80,.60) 26%, rgba(5,35,80,.10) 52%, transparent 72%)",
              }}
            />

            <div className="absolute right-5 bottom-5 left-5">
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold tracking-wide text-white uppercase ring-1 ring-white/25 backdrop-blur-sm">
                {person.tenure}
              </span>
              <h3 className="mt-2.5 text-xl leading-tight font-bold text-white">
                {person.name}
              </h3>
              <p className="mt-1 text-[12px] leading-snug font-semibold tracking-[0.12em] text-accent-400 uppercase">
                {person.role}
              </p>
            </div>
          </>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-6">
        {isCard && !cardShowsTenure ? (
          <span className="mb-4 inline-flex w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-bold text-brand-700 ring-1 ring-brand-100">
            {person.tenure}
          </span>
        ) : null}
        <p className="text-sm leading-relaxed text-ink-muted">
          {person.background}
        </p>

        <ul className="mt-5 flex-1 space-y-2.5 border-t border-[#f3ecdf] pt-5">
          {person.focus.map((item) => (
            <li key={item} className="flex items-start gap-2.5">
              <span className="mt-0.5 grid h-4.5 w-4.5 shrink-0 place-items-center rounded-md bg-accent-500/12 text-accent-600 ring-1 ring-accent-500/25">
                <Check className="h-2.5 w-2.5" />
              </span>
              <span className="text-[14px] leading-relaxed text-ink">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
