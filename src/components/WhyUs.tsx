import { photos, reasons } from "../content/site";
import { Photo } from "./Photo";

export function WhyUs() {
  return (
    <section id="about" className="bg-paper">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-24">
        <div className="overflow-hidden rounded-lg bg-navy">
          <Photo photo={photos.home} className="aspect-[4/3] w-full object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Why choose us</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            A crew that says what it means.
          </h2>
          <p className="mt-4 text-lg text-ink">
            You should know who is coming to the house and what they are going to do. That is the standard.
          </p>
          <ol className="mt-8 space-y-6">
            {reasons.map((reason, index) => (
              <li key={reason.title} className="grid grid-cols-[auto_1fr] gap-4">
                <span className="font-display text-xl font-bold text-signal" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-xl font-bold text-navy">{reason.title}</h3>
                  <p className="mt-1 text-ink">{reason.copy}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
