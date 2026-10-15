import { demo, trustItems } from "../content/site";

export function TrustBar() {
  return (
    <section className="bg-navy text-cream" aria-label="What to expect">
      <ul className="mx-auto grid max-w-6xl gap-px bg-white/10 sm:grid-cols-2 xl:grid-cols-4">
        {trustItems.map((item) => (
          <li key={item.title} className="bg-navy px-5 py-6 sm:px-8">
            <p className="font-display text-lg font-bold text-white">{item.title}</p>
            <p className={`mt-1 text-sm leading-snug ${item.demo && demo.licensedInsuredUnverified ? "text-signal" : "text-cream/75"}`}>
              {item.demo && demo.licensedInsuredUnverified ? (
                <span className="font-bold uppercase tracking-wide">Demo. </span>
              ) : null}
              {item.detail}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
