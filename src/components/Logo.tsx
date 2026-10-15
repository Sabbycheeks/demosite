import { company } from "../content/site";
import { SiteLink } from "./SiteLink";

export function Logo({
  onClick,
  light = false,
  stacked = false,
}: {
  onClick?: () => void;
  light?: boolean;
  stacked?: boolean;
}) {
  const tone = light ? "text-cream" : "text-navy";
  return (
    <SiteLink href="/#top" onClick={onClick} className="flex min-w-0 items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-9 w-9 shrink-0" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill={light ? "#fffcf8" : "#0c2340"} />
        <path
          d="M6 23.5 16 7l10 16.5"
          fill="none"
          stroke={light ? "#0c2340" : "#f4f1ea"}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M11.2 23.5 16 15.2l4.8 8.3" fill="#f15a22" />
      </svg>
      {stacked ? (
        <span className={`font-display leading-tight ${tone}`}>
          <span className="block text-lg font-bold">Summit</span>
          <span className="block text-sm font-semibold">Heating & Cooling</span>
        </span>
      ) : (
        <span className={`font-display text-[1.05rem] font-bold leading-[1.05] tracking-tight sm:text-lg ${tone}`}>
          {company.name}
        </span>
      )}
    </SiteLink>
  );
}
