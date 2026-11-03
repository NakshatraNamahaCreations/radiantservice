import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
};

export function Audit(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 4H6.5A1.5 1.5 0 0 0 5 5.5v14A1.5 1.5 0 0 0 6.5 21h11a1.5 1.5 0 0 0 1.5-1.5v-14A1.5 1.5 0 0 0 17.5 4H16" />
      <rect x="8" y="2.5" width="8" height="3.5" rx="1.2" />
      <path d="m8.8 13 2 2 4-4.5" />
    </svg>
  );
}

export function Consult(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M20 13.5a3 3 0 0 1-3 3H9l-4 3.5v-3.5a3 3 0 0 1-3-3v-7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3Z" />
      <path d="M8 8h8M8 11.5h5" />
    </svg>
  );
}

export function Cfo(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5h17" />
      <path d="M6.5 20.5V13M11 20.5V8M15.5 20.5v-5M20 20.5V4.5" />
    </svg>
  );
}

export function Planning(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

export function Compliance(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 4.8 5.6v5.7c0 4.4 3 8.2 7.2 9.9 4.2-1.7 7.2-5.5 7.2-9.9V5.6L12 2.8Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </svg>
  );
}

export function Tax(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 2.8h12v18.4l-2.4-1.6-2.4 1.6-2.4-1.6-2.4 1.6L6 19.6Z" />
      <path d="M9.5 8h5M9.5 12h5" />
    </svg>
  );
}

export function Gst(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M6 18 18 6" />
      <circle cx="8" cy="8" r="2.2" />
      <circle cx="16" cy="16" r="2.2" />
    </svg>
  );
}

export function Legal(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3.5v17M7 20.5h10" />
      <path d="M4 8.5h16M6.5 8.5 4 14h5l-2.5-5.5ZM17.5 8.5 15 14h5l-2.5-5.5Z" />
      <circle cx="12" cy="5" r="1.4" />
    </svg>
  );
}

export function Formation(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3.5 20.5h17M5.5 20.5V6.2l7-3.4 6 3.4v14.3" />
      <path d="M9 10h.01M12.5 10h.01M9 13.5h.01M12.5 13.5h.01M9 17h3.5" />
    </svg>
  );
}

export function Users(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.3a3.2 3.2 0 0 1 0 5.9M17.5 20a5.5 5.5 0 0 0-2.4-4.5" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.7 2 2 0 0 1 5 3.5Z" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.86.5 3.6 1.36 5.1L2 22l5.2-1.5a9.8 9.8 0 0 0 4.84 1.26h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm0 17.94h-.01a8.2 8.2 0 0 1-4.16-1.14l-.3-.18-3.08.9.82-3-.2-.3a8.16 8.16 0 1 1 6.93 3.72Zm4.5-6.12c-.25-.13-1.46-.72-1.68-.8-.23-.08-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-1.97-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.05-.31-.02-.44-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.41-.55-.42h-.47c-.16 0-.42.06-.64.31-.22.25-.84.82-.84 2s.86 2.32.98 2.48c.12.17 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.19 1.1.16 1.52.1.46-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function LinkedIn(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h3.96V21H3V9.75Zm6.46 0h3.8v1.54h.05c.53-1 1.82-2.05 3.75-2.05 4 0 4.74 2.64 4.74 6.06V21h-3.95v-5.06c0-1.2-.02-2.76-1.68-2.76-1.69 0-1.95 1.32-1.95 2.67V21H9.46V9.75Z" />
    </svg>
  );
}

export function Instagram(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function Facebook(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21.5v-8.2h2.75l.42-3.2H13.5V8.06c0-.92.26-1.55 1.58-1.55h1.69V3.64a22.6 22.6 0 0 0-2.46-.13c-2.44 0-4.11 1.49-4.11 4.22v2.36H7.45v3.2h2.75v8.2h3.3Z" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} strokeWidth={2} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function ArrowUp(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20V5M6 11l6-6 6 6" />
    </svg>
  );
}

export function Star(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.6 1.1 6.45L12 17.45 6.2 20.5l1.1-6.45-4.7-4.6 6.5-.95L12 2.6Z" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 2.8 4.8 5.6v5.7c0 4.4 3 8.2 7.2 9.9 4.2-1.7 7.2-5.5 7.2-9.9V5.6L12 2.8Z" />
      <path d="m9 12 2.2 2.2L15.4 10" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3.2 1.9" />
    </svg>
  );
}

export function MapPin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2.8" y="4.8" width="18.4" height="14.4" rx="2.2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </svg>
  );
}

const registry: Record<string, (p: IconProps) => React.JSX.Element> = {
  users: Users,
  audit: Audit,
  consult: Consult,
  cfo: Cfo,
  planning: Planning,
  compliance: Compliance,
  tax: Tax,
  gst: Gst,
  legal: Legal,
  formation: Formation,
};

export function ServiceIcon({
  name,
  ...props
}: IconProps & { name: string }) {
  const Cmp = registry[name] ?? Audit;
  return <Cmp {...props} />;
}
