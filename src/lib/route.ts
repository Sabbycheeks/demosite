import { useEffect, useState } from "react";

export type RouteState = {
  path: string;
  hash: string;
  token: number;
};

function normalizePath(path: string) {
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

export function readRoute(): Pick<RouteState, "path" | "hash"> {
  return {
    path: normalizePath(window.location.pathname),
    hash: window.location.hash,
  };
}

export function useRoute(): RouteState {
  const [route, setRoute] = useState<RouteState>({ ...readRoute(), token: 0 });

  useEffect(() => {
    const sync = () => {
      setRoute((current) => ({ ...readRoute(), token: current.token + 1 }));
    };
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  return route;
}

export function navigate(href: string) {
  const url = new URL(href, window.location.origin);
  const next = `${normalizePath(url.pathname)}${url.search}${url.hash}`;
  const current = `${normalizePath(window.location.pathname)}${window.location.search}${window.location.hash}`;
  if (next !== current) {
    window.history.pushState({}, "", next);
  }
  window.dispatchEvent(new PopStateEvent("popstate"));
}

export function scrollToCurrentRoute() {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
  const { path, hash } = readRoute();
  const id = hash.replace("#", "");

  if (path !== "/" || !id) {
    window.scrollTo({ top: 0, behavior });
    return;
  }

  const target = document.getElementById(id);
  if (target) target.scrollIntoView({ behavior, block: "start" });
  else window.scrollTo({ top: 0, behavior });
}
