import type { ServiceVisual as Visual } from "../content/site";
import { Photo } from "./Photo";

function MaintenanceIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true" fill="none">
      <rect x="16" y="10" width="32" height="44" rx="3" stroke="#f4f1ea" strokeWidth="2.4" />
      <path d="M24 22h16M24 32h16M24 42h10" stroke="#f15a22" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

function AirIcon() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true" fill="none">
      <path d="M14 24h28a6 6 0 1 0-2-11" stroke="#f4f1ea" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 34h36a6 6 0 1 1-2 11" stroke="#f15a22" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M14 44h20" stroke="#f4f1ea" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

export function ServiceVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "photo") {
    return (
      <Photo
        photo={visual.photo}
        className="h-24 w-24 rounded-md object-cover sm:h-28 sm:w-36"
      />
    );
  }

  return (
    <div className="flex h-24 w-24 items-center justify-center rounded-md bg-navy sm:h-28 sm:w-36">
      {visual.icon === "maintenance" ? <MaintenanceIcon /> : <AirIcon />}
    </div>
  );
}
