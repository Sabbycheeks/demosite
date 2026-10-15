import { useEffect } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { pages } from "./content/site";
import { scrollToCurrentRoute, useRoute } from "./lib/route";
import { HomePage } from "./pages/HomePage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { SiteLink } from "./components/SiteLink";

function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-5 py-20 sm:px-8">
      <h1 className="font-display text-4xl font-extrabold text-navy">Page not found</h1>
      <p className="mt-4 text-lg text-ink">That address is not part of this demo.</p>
      <SiteLink href="/#top" className="mt-6 inline-block font-semibold text-orange">
        Go to the homepage
      </SiteLink>
    </section>
  );
}

export default function App() {
  const route = useRoute();
  const page = route.path === "/privacy" ? "privacy" : route.path === "/" ? "home" : "missing";

  useEffect(() => {
    const meta = page === "privacy" ? pages.privacy : pages.home;
    if (page === "missing") {
      document.title = "Page not found | Summit Heating & Cooling";
    } else {
      document.title = meta.title;
      document.querySelector('meta[name="description"]')?.setAttribute("content", meta.description);
    }
  }, [page]);

  useEffect(() => {
    scrollToCurrentRoute();
  }, [route.path, route.hash, route.token]);

  return (
    <>
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content" tabIndex={-1} className="outline-none">
        {page === "privacy" ? <PrivacyPage /> : page === "home" ? <HomePage /> : <NotFound />}
      </main>
      <Footer />
    </>
  );
}
