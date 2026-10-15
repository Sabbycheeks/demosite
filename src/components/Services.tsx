import { services } from "../content/site";
import { ServiceVisual } from "./ServiceVisual";

export function Services({ onRequest }: { onRequest: (serviceId: string) => void }) {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Services</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
            Heating and cooling, handled plainly.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Repair, replacement, and the maintenance that keeps both from becoming an emergency.
          </p>
        </div>
        <div className="mt-10 border-t border-line">
          {services.map((service) => (
            <article key={service.id} id={service.id} className="grid gap-5 border-b border-line py-7 sm:grid-cols-[9rem_1fr] sm:items-center sm:gap-8">
              <ServiceVisual visual={service.visual} />
              <div>
                <h3 className="font-display text-2xl font-bold text-navy">{service.title}</h3>
                <p className="mt-2 max-w-2xl text-ink">{service.summary}</p>
                <button
                  type="button"
                  onClick={() => onRequest(service.id)}
                  className="mt-3 text-base font-semibold text-orange hover:text-orange-deep"
                >
                  Request this service
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
