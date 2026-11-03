/**
 * Absolute site URL used for canonical links, Open Graph, sitemap and robots.
 *
 * `??` alone is not enough: an env var that is *defined but empty* (which is
 * what a blank value in the Vercel dashboard produces) passes through `??` and
 * then crashes `new URL("")` at build time. So validate before trusting it, and
 * fall back to the deployment URL Vercel injects automatically.
 */
function resolveSiteUrl(): string {
  const candidates = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL,
  ];

  for (const candidate of candidates) {
    const value = candidate?.trim();
    if (!value) continue;

    const withScheme = /^https?:\/\//.test(value) ? value : `https://${value}`;
    try {
      return new URL(withScheme).origin;
    } catch {
      // Ignore a malformed value and try the next candidate.
    }
  }

  return "https://www.radiantcompanyservices.com";
}

export const site = {
  name: "Apex Radiant Consultants LLP",
  shortName: "Radiant",
  legalName: "Apex Radiant Consultants LLP",
  tagline: "Chartered Accountants · Tax Consultants · Virtual CFO",
  headline: "Income Tax and GST filings made simple",
  description:
    "Thane-headquartered firm of Chartered Accountants with a specialist Goods and Services Tax practice, complete tax and compliance outsourcing, and a Virtual CFO capability. Serving listed and mid-market businesses across Mumbai.",
  phone: "+91 84548 16913",
  phoneHref: "tel:+918454816913",
  whatsapp: "918454816913",
  email: "radiantservicescompany@gmail.com",
  address:
    "Lodha Signet, 321, Kolshet Road, Thane (West), Mumbai 400 607",
  hours: "Monday - Saturday, 10 AM - 7 PM",
  // Office location on Google Maps: the link opens it, the embed shows it on
  // the Contact page.
  mapUrl: "https://maps.app.goo.gl/VYa5cxnCjcmVS7SeA",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?origin=mfe&pb=!1m3!2m1!1s19.234348,72.988678!6i17!3m1!1sen!5m1!1sen",
  url: resolveSiteUrl(),
  // Social links are not shown anywhere on the site at the moment. Add real
  // profile URLs here and render them if you want icons back in the footer.
  social: {
    instagram: "",
    facebook: "",
    linkedin: "https://www.linkedin.com/in/ca-amandeep-kaur-065313118",
  },
} as const;

/**
 * Header menu. These are in-page anchors, not page links: everything the menu
 * points at is a section of the home page, so visitors never navigate away.
 * The standalone pages still exist and are reachable by URL.
 */
/**
 * Header and footer menu. Each item opens its own page.
 */
export const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

/** The "Our Services" dropdown in the header, the footer list, the home page
 *  "What we do" cards and the Services page all use this list. Every link
 *  opens its group on the Services page (/services#<id>). */
export const serviceMenu = [
  {
    id: "gst",
    title: "GST",
    icon: "gst",
    href: "/services#gst",
    items: [
      { label: "GST compliance", href: "/services#gst" },
      { label: "Litigation", href: "/services#gst" },
      { label: "Health check", href: "/services#gst" },
      { label: "Registration", href: "/services#gst" },
    ],
  },
  {
    id: "virtual-cfo",
    title: "Virtual CFO",
    icon: "cfo",
    href: "/services#virtual-cfo",
    items: [
      { label: "Health check", href: "/services#virtual-cfo" },
      { label: "Strategic decision making", href: "/services#virtual-cfo" },
      { label: "Financial planning", href: "/services#virtual-cfo" },
      { label: "Mergers & Acquisitions", href: "/services#virtual-cfo" },
      { label: "ERP optimisation", href: "/services#virtual-cfo" },
      { label: "Budgeting", href: "/services#virtual-cfo" },
      { label: "MIS", href: "/services#virtual-cfo" },
    ],
  },
  {
    id: "direct-tax",
    title: "Direct Tax",
    icon: "tax",
    href: "/services#direct-tax",
    items: [
      { label: "Compliance / returns", href: "/services#direct-tax" },
      { label: "Litigation", href: "/services#direct-tax" },
      { label: "Tax planning", href: "/services#direct-tax" },
      { label: "Tax optimisation", href: "/services#direct-tax" },
    ],
  },
  {
    id: "mca",
    title: "MCA",
    icon: "formation",
    href: "/services#mca",
    items: [
      { label: "Company formation", href: "/services#mca" },
      { label: "Planning", href: "/services#mca" },
      { label: "Annual returns", href: "/services#mca" },
    ],
  },
  {
    id: "other",
    title: "Other",
    icon: "audit",
    href: "/services#other",
    items: [
      { label: "Stock take", href: "/services#other" },
      { label: "Certifications (Net worth)", href: "/services#other" },
      { label: "Cashflow optimisation", href: "/services#other" },
      { label: "Peer reviews / Benchmarking", href: "/services#other" },
    ],
  },
];

export const workingHours = [
  { day: "Monday - Saturday", time: "10 am - 7 pm" },
  { day: "Sunday", time: "Closed" },
];

export type Service = {
  slug: string;
  /** Which of the three practice lines this sits under. */
  group: string;
  title: string;
  short: string;
  icon: string;
  /** Card background in the services carousel (public/media/services/<slug>.jpg) */
  image: string;
  description: string;
  includes: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "gst-litigation-representation",
    group: "Goods & Services Tax",
    title: "GST Litigation & Representation",
    short:
      "Replies to notices, departmental audit and anti-evasion proceedings, and appeals through the appellate stage.",
    icon: "legal",
    image: "/media/services/legal-drafting-documentation.jpg",
    description:
      "Drafting to show-cause-notice standard, with statutory and judicial citation. Positions are documented at the advisory stage so they hold at assessment or appeal rather than being reconstructed once a notice arrives.",
    includes: [
      "Replies to notices under Sections 61, 65, 73 and 74 of the CGST Act, 2017",
      "Departmental audit and anti-evasion proceedings",
      "Appeals under Section 107 and appellate follow-through",
      "Pre-deposit and cash-flow planning",
      "Drafting with statutory and judicial citation",
    ],
    faqs: [
      {
        q: "At what stage should we bring you in?",
        a: "As early as possible. A position documented at the advisory stage is far easier to defend than one reconstructed after a notice lands, which is why our advisory work is taken with the notice in mind.",
      },
      {
        q: "Do you handle the appellate stage as well as the reply?",
        a: "Yes. The same team drafts the reply and carries it through Section 107 appeals and appellate follow-through, so the position stays consistent throughout.",
      },
    ],
  },
  {
    slug: "gst-annual-return-reconciliation",
    group: "Goods & Services Tax",
    title: "GST Annual Return & Reconciliation",
    short:
      "GSTR-9 and GSTR-9C for multi-GSTIN groups, with documented sampling and materiality.",
    icon: "gst",
    image: "/media/services/gst-registration-filing.jpg",
    description:
      "Annual return and reconciliation work for groups holding registrations across many States, delivered against statutory filing deadlines with a documented sampling and materiality basis.",
    includes: [
      "GSTR-9 and GSTR-9C for multi-GSTIN groups",
      "Books-to-returns turnover reconciliation",
      "ITC bifurcation into inputs, input services and capital goods",
      "Fixed asset register review",
      "GSTR-2B, e-invoice and e-way bill reconciliation",
    ],
    faqs: [
      {
        q: "How many State registrations can you handle on one mandate?",
        a: "We have delivered annual return and reconciliation work across approximately 20 State registrations for a single listed group with PAN-India operations.",
      },
      {
        q: "How is sampling decided?",
        a: "On a documented sampling and materiality basis agreed at the start of the engagement, so the approach is defensible if it is later examined.",
      },
    ],
  },
  {
    slug: "gst-advisory-structuring",
    group: "Goods & Services Tax",
    title: "GST Advisory & Structuring",
    short:
      "Classification, valuation, credit eligibility and place-of-supply positions, with a quantified exposure schedule.",
    icon: "planning",
    image: "/media/services/strategic-business-planning.jpg",
    description:
      "GST health checks delivered with a quantified exposure schedule and a documented fall-back position, so you know both the exposure and what the alternative argument is before you commit.",
    includes: [
      "Classification and valuation positions",
      "Reverse charge exposure",
      "Input tax credit eligibility and Section 17 apportionment",
      "Blocked credits",
      "Place of supply, export and intermediary characterisation",
      "Refund claims",
    ],
    faqs: [
      {
        q: "What does a GST health check produce?",
        a: "A quantified exposure schedule and a documented fall-back position for each item, rather than a list of observations.",
      },
      {
        q: "Can you advise on export and intermediary characterisation?",
        a: "Yes, including place of supply analysis and the refund position that follows from it.",
      },
    ],
  },
  {
    slug: "gst-compliance",
    group: "Complete Tax Outsourcing",
    title: "GST Compliance",
    short:
      "The end-to-end monthly and annual cycle across single or multi-State registrations.",
    icon: "compliance",
    image: "/media/services/statutory-compliance-management.jpg",
    description:
      "Registrations through to the annual return, run on a single calendar so the compliance record, the books and the litigation position stay consistent with one another.",
    includes: [
      "Registrations and amendments",
      "GSTR-1, GSTR-3B, ITC-04 and LUT",
      "Credit reconciliation with vendor follow-up",
      "Refund filing",
      "Annual return across single or multi-State registrations",
    ],
    faqs: [
      {
        q: "Do you follow up with our vendors on credit mismatches?",
        a: "Yes. Credit reconciliation includes vendor follow-up, since most mismatches are resolved at the supplier rather than in the return.",
      },
      {
        q: "Can you take over a backlog?",
        a: "Yes. Clean-up of legacy compliance backlogs is part of the outsourcing work.",
      },
    ],
  },
  {
    slug: "direct-tax",
    group: "Complete Tax Outsourcing",
    title: "Direct Tax",
    short:
      "Computations, return filing, notice responses and faceless appellate representation.",
    icon: "tax",
    image: "/media/services/income-tax-filing-planning.jpg",
    description:
      "Corporate, firm and promoter tax handled end to end, including representation before the faceless assessment regime and CIT(A) / NFAC.",
    includes: [
      "Corporate, firm and promoter computations and return filing",
      "Responses to notices under Sections 143(2), 142(1), 148 and 133(6)",
      "Faceless assessment and CIT(A) / NFAC appellate representation",
      "Capital gains",
      "TDS returns and Section 195 certification including Form 15CA / 15CB",
      "Regime comparison and salary structuring",
    ],
    faqs: [
      {
        q: "Do you appear in faceless proceedings?",
        a: "Yes, including faceless assessment and appellate representation before CIT(A) and NFAC.",
      },
      {
        q: "How many assessees can you handle in a filing season?",
        a: "We have handled a filing season for a client base exceeding 290 assessees.",
      },
    ],
  },
  {
    slug: "transfer-pricing-international-tax",
    group: "Complete Tax Outsourcing",
    title: "Transfer Pricing & International Tax",
    short:
      "Local File, Master File and Form 3CEB, with permanent establishment and treaty analysis.",
    icon: "consult",
    image: "/media/services/business-financial-consultancy.jpg",
    description:
      "Documentation and analysis for cross-border and foreign-owned groups, including exposure assessment where a permanent establishment or dependent agent PE may arise.",
    includes: [
      "Local File, Master File and Form 3CEB",
      "Functional, asset and risk analysis and benchmarking",
      "Associated enterprise determination",
      "Intra-group service charge substantiation",
      "Safe Harbour evaluation",
      "Permanent establishment and DAPE assessment",
      "Treaty interpretation and Schedule FA reporting",
    ],
    faqs: [
      {
        q: "Do you assess permanent establishment exposure?",
        a: "Yes, including dependent agent PE, alongside the inter-company charging model and treaty analysis that follow from it.",
      },
      {
        q: "Is Safe Harbour worth evaluating?",
        a: "It depends on margins and the nature of the transaction. We evaluate it explicitly rather than assuming either way.",
      },
    ],
  },
  {
    slug: "payroll-labour-statutes",
    group: "Complete Tax Outsourcing",
    title: "Payroll & Labour Statutes",
    short:
      "Payroll processing with provident fund, ESIC and professional tax computation and filing.",
    icon: "users",
    image: "/media/services/company-llp-formation.jpg",
    description:
      "Payroll run alongside the tax function rather than separately from it, so salary TDS and the statutory filings reconcile to the same books.",
    includes: [
      "Payroll processing",
      "TDS on salary",
      "Provident fund, ESIC and professional tax computation and filing",
      "Full-and-final settlements",
      "Employee tax declarations",
    ],
    faqs: [
      {
        q: "Why run payroll with the tax function?",
        a: "Because salary TDS, provident fund and professional tax all reconcile back to the same books and the same calendar, which removes the differences that arise when payroll sits with a separate provider.",
      },
      {
        q: "Do you handle full-and-final settlements?",
        a: "Yes, along with employee tax declarations for the year.",
      },
    ],
  },
  {
    slug: "corporate-compliance",
    group: "Complete Tax Outsourcing",
    title: "Corporate Compliance",
    short:
      "MCA and ROC filings, statutory registers, LLP filings and FEMA / RBI reporting support.",
    icon: "audit",
    image: "/media/services/ca-audit-services.jpg",
    description:
      "Annual and event-based corporate compliance, including entity set-up for foreign-owned entities and the clean-up of legacy compliance backlogs.",
    includes: [
      "MCA and ROC annual and event-based filings",
      "Statutory registers and director compliance",
      "LLP filings",
      "FEMA and RBI reporting support",
      "Entity set-up for foreign-owned entities",
      "Clean-up of legacy compliance backlogs",
    ],
    faqs: [
      {
        q: "Can you set up an entity for a foreign parent?",
        a: "Yes, including the FEMA and RBI reporting that follows incorporation.",
      },
      {
        q: "We are behind on ROC filings. Can that be fixed?",
        a: "Yes. Backlog clean-up is routine work; we assess the exposure first and quantify the additional fees before filing.",
      },
    ],
  },
  {
    slug: "virtual-cfo",
    group: "Virtual CFO & Finance Function",
    title: "Virtual CFO & Finance Function",
    short:
      "Management reporting, budgeting and control, and the month and year-end close.",
    icon: "cfo",
    image: "/media/services/virtual-cfo-services.jpg",
    description:
      "A finance function delivered on demand: reporting that management can act on, planning and control that holds the working capital line, and a close that leaves you audit-ready. ERP environments include SAP, Microsoft Navision, Infor LN and Tally.",
    includes: [
      "Monthly management reporting; board and investor packs",
      "Profitability by product, SKU, channel and customer",
      "Annual budgets, rolling forecasts and variance analysis",
      "Working capital, inventory and receivables control",
      "Cash-flow forecasting and capital expenditure appraisal",
      "Month and year-end close, Schedule III statements and consolidation",
      "Audit readiness and coordination of statutory, internal, cost and tax audits",
    ],
    faqs: [
      {
        q: "Which ERP systems do you work in?",
        a: "SAP, Microsoft Navision, Infor LN and Tally.",
      },
      {
        q: "How does this differ from bookkeeping?",
        a: "Bookkeeping records what happened. The Virtual CFO mandate adds the reporting, planning and control layer on top, so the numbers drive decisions rather than only satisfying a filing.",
      },
    ],
  },
];

/** Options shown in the "Service Needed" dropdown on the consultation form. */
export const consultationServices = [
  "Goods & Services Tax",
  "GST Litigation",
  "Direct Tax",
  "Transfer Pricing & International Tax",
  "Payroll & Labour Statutes",
  "Corporate Compliance",
  "Virtual CFO",
];


/** The founders, from the 2026 firm profile. */
export const founders = [
  {
    name: "CA Rajkamal Singh",
    role: "Founding Partner · Signing Partner, Tax & Regulatory",
    photo: "/media/team/rajkamal-singh-card.jpg",
    /** Supplied as a finished card: it carries its own name plate, so the
     *  overlaid caption is suppressed and the artwork is shown whole. */
    photoIsCard: true,
    /** This card prints the tenure itself, so the body chip is suppressed. */
    photoShowsTenure: true,
    tenure: "18+ years",
    background:
      "KPMG, Deloitte and PwC; senior finance and taxation roles with listed corporates including Birla Corporation, ACC and the Adani Group.",
    focus: [
      "GST classification and valuation disputes",
      "Litigation from show-cause notice through appellate stage",
      "Multi-State GSTR-9 and 9C engagements",
      "Transfer pricing, permanent establishment and cross-border structuring",
    ],
  },
  {
    name: "CA Amandeep Kaur",
    /** Gold label shown on her card on the About page. */
    badge: "Founder",
    role: "Partner · Virtual CFO, Reporting & Assurance",
    photo: "/media/team/amandeep-kaur-card.jpg",
    photoIsCard: true,
    photoShowsTenure: true,
    tenure: "11+ years",
    background:
      "Senior FP&A roles with Remsons Industries and Godrej & Boyce; audit practice with Kalyaniwalla & Mistry LLP.",
    focus: [
      "Budgeting, forecasting and variance analysis",
      "Board and management reporting packs",
      "Profitability by product, SKU and channel",
      "Working capital, inventory and receivables control",
    ],
  },
];

/** "Our team" - partners who are not founders. */
export const team = [
  {
    name: "CA Sanjay Johary",
    role: "Partner",
    photo: "/media/team/sanjay-johary-card.jpg",
    photoIsCard: true,
    photoShowsTenure: true,
    tenure: "30+ years",
    background:
      "Senior finance leadership across large manufacturing and corporate environments.",
    focus: [
      "FP&A, budgeting, forecasting and management reporting",
      "Cost optimization, working capital and treasury management",
      "End-to-end accounting, taxation and statutory compliance",
      "Process improvement, shared services and GST transition",
    ],
  },
];

/** "Why clients engage us", from the firm profile. */
export const whyUs = [
  {
    icon: "gst",
    title: "GST depth, not GST coverage",
    body: "GST is the specialisation rather than one line on a list. The same team that files the return prepares the reconciliation and drafts the reply, so the position taken in the return is the position defended in the notice.",
  },
  {
    icon: "compliance",
    title: "One provider, whole function",
    body: "Indirect tax, direct tax, transfer pricing, payroll and corporate compliance run off a single set of books and a single calendar, which removes the reconciliation differences that arise when these are split across providers.",
  },
  {
    icon: "audit",
    title: "Large-firm method",
    body: "Engagement letters, structured working papers, documented sampling and materiality, and Partner review on every deliverable.",
  },
  {
    icon: "cfo",
    title: "Mid-market economics",
    body: "Delivered without the cost structure, layered staffing or turnaround lag of a large network firm.",
  },
  {
    icon: "legal",
    title: "Litigation orientation",
    body: "Advisory positions are taken with the notice in mind, so documentation is built at the advisory stage rather than reconstructed at assessment.",
  },
  {
    icon: "users",
    title: "Continuity",
    body: "Direct Partner access and a stable delivery team, so context is not lost between assignments.",
  },
];


/** The firm's own summary of itself, from page 1 of the 2026 profile. */
export const firmAtAGlance = [
  {
    icon: "gst",
    label: "Specialisation",
    body: "Goods and Services Tax - advisory, annual return and reconciliation work, and litigation from show-cause notice through the appellate stage. GST is the core of the practice; the tax outsourcing and Virtual CFO lines are built around it so that compliance, books and litigation positions stay consistent with one another.",
  },
  {
    icon: "formation",
    label: "Structure",
    body: "Limited Liability Partnership. Functions reserved to Chartered Accountants are carried on through the CA firm; permitted non-attest and outsourcing services are delivered through Apex Radiant Services. Two Partners, supported by Senior Executives, Executives and article assistants across the indirect tax, direct tax and accounting verticals.",
  },
  {
    icon: "users",
    label: "Clients",
    body: "Listed and large corporates, mid-market manufacturing and infrastructure, real estate, hospitality and services, start-ups, and cross-border or foreign-owned entities. The client base includes a listed company with PAN-India operations and annual turnover in excess of ₹2,500 crore.",
  },
];

export const stats = [
  { value: "18+", label: "Years of partner experience" },
  { value: "17", label: "Professionals across three verticals" },
  { value: "290+", label: "Assessees in a filing season" },
  { value: "₹4,500 cr+", label: "Client turnover served" },
];

export const aboutIntro =
  "Apex Radiant Consultants LLP is a Thane-headquartered firm of Chartered Accountants built around three things a mid-market or promoter-led business actually needs from a tax adviser: a specialist Goods and Services Tax practice, a complete tax and compliance function delivered on outsourcing, and a Virtual CFO capability that turns the numbers into decisions.";

export const highlights = [
  "Built by professionals trained in large international accounting networks",
  "Engagements scoped, documented and Partner-reviewed throughout",
  "A defensible position taken first and documented at the advisory stage",
  "Clients deal directly with a Partner from start to finish",
];

export const assurances = [
  "Fast response and clear guidance",
  "Compliance-first approach",
  "Trusted CA and consultants",
];

export const steps = [
  {
    icon: "consult",
    label: "Discovery",
    title: "Understand your business",
    body: "We begin by understanding your business structure, industry, financial position, and compliance requirements. Our experts conduct a detailed consultation to identify challenges and growth opportunities.",
  },
  {
    icon: "planning",
    label: "Strategy",
    title: "Strategic planning & advisory",
    body: "Based on our assessment, we design a customized financial and compliance strategy. Whether it is tax optimization, GST planning, legal drafting, or Virtual CFO services, we create a clear roadmap aligned with your goals.",
  },
  {
    icon: "audit",
    label: "Execution",
    title: "Execution with precision",
    body: "Our team handles filings, documentation, compliance management, and financial structuring with accuracy and transparency. We ensure timely submissions and adherence to all statutory regulations.",
  },
  {
    icon: "cfo",
    label: "Oversight",
    title: "Continuous support & growth monitoring",
    body: "We do not stop at compliance. We continuously monitor your financial health, regulatory updates, and business performance to provide proactive guidance that supports sustainable growth.",
  },
];

/** Representative experience, from the firm profile. Client identities are not
 *  disclosed; named references are available on request. */
export const caseStudies = [
  {
    slug: "listed-manufacturer-gst",
    image: "/media/cases/cashflow-stability.jpg",
    category: "Goods & Services Tax",
    client: "Listed manufacturer, PAN-India",
    title: "GST annual return across ~20 State registrations",
    body: "GSTR-9 and GSTR-9C preparation and review, books-to-returns turnover reconciliation, ITC bifurcation into inputs, input services and capital goods, fixed asset register review, and e-invoice and e-way bill reconciliation, delivered against statutory deadlines.",
    outcomes: ["GSTR-9 & 9C", "Multi-State", "Turnover above ₹2,500 cr"],
  },
  {
    slug: "cross-border-services-group",
    image: "/media/cases/roc-compliance.jpg",
    category: "International Tax",
    client: "Cross-border services group, India and Europe",
    title: "Permanent establishment and transfer pricing strategy",
    body: "Permanent establishment and DAPE exposure assessment, inter-company charging model, treaty analysis and transfer pricing documentation strategy.",
    outcomes: ["PE & DAPE review", "Treaty analysis", "TP documentation"],
  },
  {
    slug: "owner-managed-filing-season",
    image: "/media/cases/simplified-filings.jpg",
    category: "Direct Tax",
    client: "Owner-managed businesses and professionals",
    title: "Filing season for 290+ assessees",
    body: "Return filing season handled for a client base exceeding 290 assessees, together with faceless appellate representation before NFAC.",
    outcomes: ["290+ assessees", "Faceless appeals", "NFAC representation"],
  },
];

export const testimonials = [
  {
    name: "Shivam Singh",
    role: "Virtual CFO",
    quote:
      "Radiant Company Services has been a game-changer for our business. Their Virtual CFO support and strategic planning helped us streamline finances and make smarter decisions. Highly recommend for any growing company!",
  },
  {
    name: "Kanika",
    role: "Compliance & GST",
    quote:
      "Their team made the entire compliance process stress-free. From legal drafting to GST filings, they were fast, accurate, and always available for queries. Great service all around!",
  },
  {
    name: "Saheb Narang",
    role: "Financial Planning",
    quote:
      "Radiant Company Services offers more than just accounting - they truly understand business. Their insights into financial planning and compliance have saved us time and money. A trustworthy partner!",
  },
];

export const areas = ["Thane", "Mumbai", "Navi Mumbai"];

export const faqs = [
  {
    q: "What does Apex Radiant specialize in?",
    a: "We offer end-to-end financial and legal solutions for businesses of all sizes. Our core services include chartered accountancy, business consultancy, income tax and GST filings, legal drafting, Virtual CFO support, strategic planning, and statutory compliance management.",
  },
  {
    q: "How can a Virtual CFO benefit my business?",
    a: "A Virtual CFO provides expert financial strategy, planning, and oversight without the cost of a full-time executive. We help you manage cash flow, analyze performance, reduce risks, and make data-driven decisions to scale your business effectively.",
  },
  {
    q: "Can Radiant help with both personal and business tax filings?",
    a: "Yes, we handle both. Whether you're an individual professional or a business entity, we ensure accurate, timely filing of your income tax and GST returns, while helping you take advantage of eligible deductions and exemptions.",
  },
  {
    q: "Do you offer support with legal documentation and drafting?",
    a: "Absolutely. Our legal drafting services cover contracts, MOUs, partnership deeds, shareholder agreements, and more. We ensure your documents are legally sound, customized to your needs, and compliant with applicable laws.",
  },
  {
    q: "Is Apex Radiant right for startups or only established businesses?",
    a: "We work with both. Whether you're launching a startup or managing an established company, we provide scalable services from initial business setup and registration to complex financial strategy and compliance support.",
  },
];

export const posts = [
  {
    slug: "strategic-planning-business-compliance",
    date: "24 Feb, 2026",
    author: "Radiant Team",
    tag: "Strategic Planning",
    readTime: "5 min read",
    image: "/media/blog/strategic-planning.jpg",
    title: "Why strategic planning matters for business compliance",
    excerpt:
      "Compliance is cheapest when it is planned for. A look at how forecasting and a compliance calendar remove the year-end scramble.",
  },
  {
    slug: "gst-filing-tips-avoid-notices",
    date: "18 Feb, 2026",
    author: "Radiant Team",
    tag: "GST",
    readTime: "4 min read",
    image: "/media/blog/gst-filing.jpg",
    title: "GST filing tips to avoid notices and penalties",
    excerpt:
      "Most GST notices trace back to a handful of avoidable mismatches. Here is what to reconcile every month, and when.",
  },
  {
    slug: "virtual-cfo-financial-clarity",
    date: "10 Feb, 2026",
    author: "Radiant Team",
    tag: "Virtual CFO",
    readTime: "6 min read",
    image: "/media/blog/virtual-cfo.jpg",
    title: "When a Virtual CFO can transform your financial clarity",
    excerpt:
      "The signals that tell you it is time to bring in financial leadership, and what changes in the first ninety days.",
  },
];

/** Gallery page photos. `size` picks the tile shape: "wide" spans two
 *  columns, "tall" spans two rows. These are stock photos for now - swap in
 *  real photos of the office and team by changing `image`. */
export const gallery = [
  { image: "/media/team.jpg", title: "Client advisory session", category: "Advisory", size: "wide" },
  { image: "/media/blog/gst-filing.jpg", title: "GST return preparation", category: "Tax & GST", size: "normal" },
  { image: "/media/services/virtual-cfo-services.jpg", title: "Monthly MIS dashboards", category: "Virtual CFO", size: "tall" },
  { image: "/media/blog/strategic-planning.jpg", title: "Team strategy meeting", category: "Team", size: "wide" },
  { image: "/media/services/legal-drafting-documentation.jpg", title: "Legal drafting review", category: "Audit & Legal", size: "tall" },
  { image: "/media/cases/cashflow-stability.jpg", title: "Cash flow planning", category: "Virtual CFO", size: "normal" },
  { image: "/media/cases/simplified-filings.jpg", title: "Income tax filing", category: "Tax & GST", size: "normal" },
  { image: "/media/cta.jpg", title: "Working papers review", category: "Audit & Legal", size: "wide" },
  { image: "/media/blog/virtual-cfo.jpg", title: "Engagement sign-off", category: "Advisory", size: "normal" },
  { image: "/media/services/statutory-compliance-management.jpg", title: "Our workspace", category: "Team", size: "tall" },
];
