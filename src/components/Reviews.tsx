import { demo, reviews } from "../content/site";

export function Reviews() {
  return (
    <section id="reviews" className="bg-paper">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Reviews</p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Placeholder reviews
        </h2>
        {demo.reviewsArePlaceholders ? (
          <p className="mt-5 max-w-3xl border-l-4 border-signal bg-white px-5 py-4 text-ink" role="note">
            {reviews.notice}
          </p>
        ) : null}
        <ul className="mt-8 grid gap-5 lg:grid-cols-3">
          {reviews.items.map((review) => (
            <li key={review.attribution} className="border border-line bg-cream p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">Placeholder</p>
              <blockquote className="mt-4 text-lg leading-relaxed text-navy">“{review.quote}”</blockquote>
              <p className="mt-4 text-sm font-semibold text-muted">{review.attribution}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
