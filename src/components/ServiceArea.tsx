import { demo, serviceArea } from "../content/site";

export function ServiceArea() {
  return (
    <section className="bg-white" aria-labelledby="area-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Service area</p>
        <h2 id="area-heading" className="mt-3 max-w-3xl font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Columbus, Hilliard, Dublin, and nearby Central Ohio.
        </h2>
        {demo.serviceAreaIsIllustrative ? (
          <>
            <p className="mt-4 text-sm font-semibold uppercase tracking-wide text-orange">{serviceArea.label}</p>
            <p className="mt-2 max-w-2xl text-ink">{serviceArea.note}</p>
          </>
        ) : null}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {serviceArea.places.map((place) => (
            <li key={place} className="border border-line bg-paper px-4 py-4 font-display text-lg font-bold text-navy">
              {place}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
