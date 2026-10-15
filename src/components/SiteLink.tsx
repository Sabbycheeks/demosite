import type { ReactNode } from "react";
import { navigate } from "../lib/route";

type SiteLinkProps = {
  href: string;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  ariaCurrent?: "page" | "true" | undefined;
};

export function SiteLink({
  href,
  className,
  children,
  onClick,
  ariaCurrent,
}: SiteLinkProps) {
  return (
    <a
      href={href}
      className={className}
      aria-current={ariaCurrent}
      onClick={(event) => {
        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        event.preventDefault();
        onClick?.();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}
