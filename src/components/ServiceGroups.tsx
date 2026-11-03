import { serviceMenu } from "@/data/site";
import ServiceCard from "./ServiceCard";

/**
 * Services page: every group from the header dropdown with all its services.
 * Each group carries an id so the dropdown, footer and home page cards can
 * link straight to it.
 */
export default function ServiceGroups() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(42rem 24rem at 92% -10%, rgba(20,58,110,.07), transparent 60%), radial-gradient(30rem 18rem at 2% 108%, rgba(200,144,46,.06), transparent 65%)",
        }}
      />

      <div className="container-x relative">
        {/* Flex rather than grid so a short last row sits centred. */}
        <ul className="flex flex-wrap justify-center gap-6">
          {serviceMenu.map((group, i) => (
            <li
              key={group.id}
              id={group.id}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <ServiceCard group={group} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
