/**
 * Sample business content for the Summit Heating & Cooling sales demo.
 * Anything flagged in `demo` must stay labeled until a real contractor
 * replaces it with verified information.
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ServiceVisual =
  | { kind: "photo"; photo: Photo }
  | { kind: "icon"; icon: "maintenance" | "air" };

export type Service = {
  id: string;
  title: string;
  summary: string;
  visual: ServiceVisual;
};

export const company = {
  name: "Summit Heating & Cooling",
  phoneDisplay: "(614) 555-0142",
  phoneTel: "+16145550142",
  email: "hello@summitheating.example",
  copyrightYear: 2026,
  city: "Columbus, Ohio",
  heroTitle: "Comfort You Can Count On. Every Season.",
  heroSupport:
    "Reliable heating and cooling solutions for your home, delivered by a team that puts your comfort first.",
  trustLine: "Residential Heating & Cooling Specialists.",
} as const;

export const demo = {
  fictionalCompany: true,
  licensedInsuredUnverified: true,
  reviewsArePlaceholders: true,
  serviceAreaIsIllustrative: true,
  hoursAreSample: true,
  formIsNotConnected: true,
  privacyIsPlaceholder: true,
} as const;

export const photos = {
  hero: {
    src: "https://images.pexels.com/photos/32497161/pexels-photo-32497161.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Technician inspecting an outdoor air conditioner beside a house",
    width: 1500,
    height: 1000,
  },
  coil: {
    src: "https://images.pexels.com/photos/5463580/pexels-photo-5463580.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Close view of hands servicing the coil of an outdoor air conditioner",
    width: 800,
    height: 1200,
  },
  indoor: {
    src: "https://images.pexels.com/photos/32588555/pexels-photo-32588555.jpeg?auto=compress&cs=tinysrgb&w=1200",
    alt: "Technician working on indoor heating and cooling equipment",
    width: 900,
    height: 1600,
  },
  houseUnit: {
    src: "https://images.pexels.com/photos/4119844/pexels-photo-4119844.jpeg?auto=compress&cs=tinysrgb&w=1600",
    alt: "Outdoor condenser beside a residential house and backyard fence",
    width: 1500,
    height: 1000,
  },
  home: {
    src: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1600&q=80",
    alt: "A two-story house with a porch, lawn, and trees",
    width: 1500,
    height: 1000,
  },
} as const satisfies Record<string, Photo>;

export const nav = [
  { href: "/#top", id: "top", label: "Home" },
  { href: "/#services", id: "services", label: "Services" },
  { href: "/#about", id: "about", label: "About" },
  { href: "/#reviews", id: "reviews", label: "Reviews" },
  { href: "/#contact", id: "contact", label: "Contact" },
] as const;

export const trustItems = [
  {
    title: "Licensed & Insured",
    detail: "Not a verified credential.",
    demo: true,
  },
  {
    title: "Upfront Estimates",
    detail: "You see the price before the work begins.",
    demo: false,
  },
  {
    title: "Quality Workmanship",
    detail: "Careful work, explained in plain language.",
    demo: false,
  },
  {
    title: "Customer-Focused Service",
    detail: "Your home and your time are treated with respect.",
    demo: false,
  },
] as const;

export const services: Service[] = [
  {
    id: "ac-repair",
    title: "Air Conditioning Repair",
    summary:
      "The house is warm, the condenser is loud, or the system will not start. We find the fault, tell you what it takes to fix, and start only after you approve the price.",
    visual: { kind: "photo", photo: photos.coil },
  },
  {
    id: "furnace",
    title: "Furnace Repair & Installation",
    summary:
      "No heat, short cycling, or a furnace that smells off at startup. We repair it when a repair is the right call, and we install a new one when it is not.",
    visual: { kind: "photo", photo: photos.indoor },
  },
  {
    id: "replacement",
    title: "HVAC System Replacement",
    summary:
      "An old system that breaks every season costs more than it saves. We size the replacement for your house and put the options and prices in writing before you decide.",
    visual: { kind: "photo", photo: photos.houseUnit },
  },
  {
    id: "maintenance",
    title: "Preventive Maintenance",
    summary:
      "A spring visit and a fall visit are how most breakdowns get avoided. We clean, check, and leave you with a straight list of what is fine and what should be watched.",
    visual: { kind: "icon", icon: "maintenance" },
  },
  {
    id: "air-quality",
    title: "Indoor Air Quality",
    summary:
      "Dry air, dust, and stale rooms are often a filter, humidity, or ventilation problem. We recommend the fix that matches the house, not a stack of add-ons.",
    visual: { kind: "icon", icon: "air" },
  },
];

export const reasons = [
  {
    title: "Clear communication",
    copy: "You hear what we found, what it costs, and what happens next. No jargon for its own sake.",
  },
  {
    title: "Honest recommendations",
    copy: "If a repair will hold, we say so. If it will not, we say that too, and we price both paths.",
  },
  {
    title: "Respect for your home",
    copy: "Shoe covers, drop cloths, and the work area cleaned up before we leave.",
  },
  {
    title: "Reliable scheduling",
    copy: "We show up in the window we agreed to, and we call if anything changes.",
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Tell us what you need.",
    copy: "Call or use the form. A short description is enough to get started.",
  },
  {
    number: "02",
    title: "Receive an estimate.",
    copy: "We look at the system and give you a price before the work begins.",
  },
  {
    number: "03",
    title: "Get comfortable again.",
    copy: "We do the work, walk you through what changed, and leave the space as we found it.",
  },
] as const;

export const reviews = {
  notice:
    "Placeholder reviews. These quotes are sample layout only. They are not from real customers, and they are not verified ratings. Replace them with reviews you can stand behind before a site goes live.",
  items: [
    {
      quote:
        "The visit was explained before any work started, and the house was left clean.",
      attribution: "Sample customer, Columbus",
    },
    {
      quote:
        "We were given a repair price and a replacement price, then left to decide.",
      attribution: "Sample customer, Hilliard",
    },
    {
      quote:
        "Maintenance was scheduled around work hours and finished when they said it would be.",
      attribution: "Sample customer, Dublin",
    },
  ],
} as const;

export const serviceArea = {
  label: "Illustrative demo content",
  note: "A live site should list only the communities this company actually serves.",
  places: ["Columbus", "Hilliard", "Dublin", "Nearby Central Ohio"],
} as const;

export const hours = {
  note: "Sample hours for this demo. Not a real schedule.",
  lines: [
    { days: "Monday–Friday", time: "7:30 a.m.–6:00 p.m." },
    { days: "Saturday", time: "8:00 a.m.–1:00 p.m." },
    { days: "Sunday", time: "Closed" },
  ],
} as const;

export const faqs = [
  {
    id: "repairs",
    question: "Do you repair systems, or only replace them?",
    answer:
      "We do both. Plenty of homes need a repair, not a new system. If replacement is the sounder choice, we explain why and what it costs before you commit.",
  },
  {
    id: "estimates",
    question: "How do estimates work?",
    answer:
      "Tell us what the system is doing. We schedule a visit, inspect the equipment, and give you a price before the work starts. The form on this demo does not send a real request.",
  },
  {
    id: "maintenance",
    question: "How often should heating and cooling be maintained?",
    answer:
      "Most homes do well with a check before cooling season and another before heating season. We will tell you if your equipment needs a different rhythm.",
  },
  {
    id: "replacement",
    question: "When is replacement a better idea than another repair?",
    answer:
      "Age, repeated breakdowns, safety concerns, and the cost of the next repair all matter. We lay the repair and the replacement side by side so you can choose.",
  },
  {
    id: "weekend",
    question: "What if the system stops outside normal hours?",
    answer:
      "Call the shop number and describe what the system is doing. The hours printed on this demo are sample information, not a promise of after-hours coverage.",
  },
  {
    id: "explain",
    question: "Will someone explain the work before it starts?",
    answer:
      "Yes. You should know what we found, what we recommend, and what it will cost before we begin.",
  },
] as const;

export const pages = {
  home: {
    title: "Summit Heating & Cooling | Columbus HVAC Repair & Installation",
    description:
      "Sales demo for Summit Heating & Cooling, a fictional Columbus-area heating and cooling company. Residential repair, replacement, and maintenance. Call (614) 555-0142.",
  },
  privacy: {
    title: "Privacy | Summit Heating & Cooling",
    description:
      "Placeholder privacy page for the Summit Heating & Cooling sales demo. This is not a legal policy.",
  },
} as const;
