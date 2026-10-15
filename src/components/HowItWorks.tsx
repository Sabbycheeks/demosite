import { steps } from "../content/site";

export function HowItWorks() {
  return (
    <section className="bg-white" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <h2 id="how-heading" className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          How it works
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <li key={step.number} className="border-t-2 border-signal pt-5">
              <p className="font-display text-4xl font-extrabold text-navy">{step.number}</p>
              <h3 className="mt-3 font-display text-2xl font-bold text-navy">{step.title}</h3>
              <p className="mt-2 text-ink">{step.copy}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
