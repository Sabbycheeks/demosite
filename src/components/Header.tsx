import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { company, nav } from "../content/site";
import { useRoute } from "../lib/route";
import { Logo } from "./Logo";
import { SiteLink } from "./SiteLink";

const focusableSelector =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

function isActive(path: string, hash: string, id: string) {
  if (path !== "/") return false;
  if (id === "top") return hash === "" || hash === "#top";
  return hash === `#${id}`;
}

export function Header() {
  const route = useRoute();
  const [open, setOpen] = useState(false);
  const [menuTop, setMenuTop] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const menuId = useId();

  useLayoutEffect(() => {
    if (!open) return;
    setMenuTop(headerRef.current?.offsetHeight ?? 0);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previouslyFocused = document.activeElement;
    const getItems = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>(focusableSelector) ?? []).filter(
        (item) => !item.hasAttribute("disabled") && item.tabIndex !== -1,
      );

    getItems()[0]?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const items = getItems();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [open]);

  useEffect(() => {
    const close = () => setOpen(false);
    window.addEventListener("popstate", close);
    return () => window.removeEventListener("popstate", close);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-line bg-cream">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3 sm:px-8 lg:h-20 lg:py-0">
        <Logo />
        <nav className="ml-auto hidden items-center gap-7 lg:flex" aria-label="Primary">
          {nav.map((item) => {
            const active = isActive(route.path, route.hash, item.id);
            return (
              <SiteLink
                key={item.id}
                href={item.href}
                ariaCurrent={active ? "true" : undefined}
                className={`text-[15px] font-semibold ${active ? "text-navy underline decoration-signal decoration-2 underline-offset-8" : "text-navy/75 hover:text-navy"}`}
              >
                {item.label}
              </SiteLink>
            );
          })}
        </nav>
        <div className="ml-auto hidden items-center gap-4 lg:ml-0 lg:flex">
          <a
            href={`tel:${company.phoneTel}`}
            className="text-[15px] font-semibold text-navy hover:text-orange"
          >
            {company.phoneDisplay}
          </a>
          <SiteLink
            href="/#contact"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-orange px-4 text-[15px] font-semibold text-white hover:bg-orange-deep"
          >
            Request a Free Estimate
          </SiteLink>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-md border border-line text-navy lg:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      <div className="flex gap-2 border-t border-line px-5 py-2.5 sm:px-8 lg:hidden">
        <a
          href={`tel:${company.phoneTel}`}
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md border border-navy px-3 text-sm font-semibold text-navy"
        >
          {company.phoneDisplay}
        </a>
        <SiteLink
          href="/#contact"
          className="inline-flex min-h-11 flex-1 items-center justify-center rounded-md bg-orange px-3 text-sm font-semibold text-white hover:bg-orange-deep"
        >
          Request a Free Estimate
        </SiteLink>
      </div>

      {open
        ? createPortal(
            <div className="lg:hidden">
          <div className="fixed inset-0 z-40 bg-navy/60" onClick={closeMenu} />
          <div
            ref={panelRef}
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            style={{ top: menuTop }}
            className="fixed inset-x-0 z-[45] flex max-h-[calc(100dvh-5rem)] flex-col overflow-y-auto bg-cream shadow-xl sm:left-auto sm:w-full sm:max-w-sm"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <p id={titleId} className="font-display text-lg font-bold text-navy">
                Menu
              </p>
              <button
                type="button"
                className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-line"
                onClick={closeMenu}
              >
                <span className="sr-only">Close menu</span>
                <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col px-3 py-3" aria-label="Mobile">
              {nav.map((item) => {
                const active = isActive(route.path, route.hash, item.id);
                return (
                  <SiteLink
                    key={item.id}
                    href={item.href}
                    onClick={closeMenu}
                    ariaCurrent={active ? "true" : undefined}
                    className="rounded-md px-3 py-3 text-lg font-semibold text-navy hover:bg-paper"
                  >
                    {item.label}
                  </SiteLink>
                );
              })}
            </nav>
            <div className="mt-auto space-y-3 border-t border-line p-5">
              <a
                href={`tel:${company.phoneTel}`}
                className="flex min-h-12 items-center justify-center rounded-md border border-navy font-semibold text-navy"
              >
                Call {company.phoneDisplay}
              </a>
              <SiteLink
                href="/#contact"
                onClick={closeMenu}
                className="flex min-h-12 items-center justify-center rounded-md bg-orange font-semibold text-white hover:bg-orange-deep"
              >
                Request a Free Estimate
              </SiteLink>
            </div>
          </div>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
