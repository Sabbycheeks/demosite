import { company, demo } from "../content/site";
import { SiteLink } from "../components/SiteLink";

export function PrivacyPage() {
  return (
    <article className="bg-cream">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 lg:py-20">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Legal placeholder</p>
        <h1 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">Privacy</h1>
        {demo.privacyIsPlaceholder ? (
          <p className="mt-6 border-l-4 border-signal bg-white px-5 py-4 text-ink" role="note">
            Demo placeholder. This is not a privacy policy, and it is not legal advice. Do not publish it for a real business.
          </p>
        ) : null}
        <div className="mt-8 space-y-8 text-ink">
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">What this page is</h2>
            <p className="mt-3">
              {company.name} is a fictional company. This page shows where a privacy policy would sit on a contractor site. A real policy has to be written for the actual business, the tools it uses, and the laws that apply.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">What this demo collects</h2>
            <p className="mt-3">
              The estimate form asks for a name, phone number, email address, service, a short description, and a preferred contact method. Submitting it does not send that information anywhere. It is not stored on a server, and it is not passed to an email service or CRM.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">What a live site would need to say</h2>
            <p className="mt-3">
              If the form is later connected to an inbox or scheduling tool, the policy should name what is collected, why, who receives it, how long it is kept, and how someone can ask about it. Phone links on this demo only open the visitor’s own phone app.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">No accounts, ads, or analytics</h2>
            <p className="mt-3">
              This demonstration has no customer accounts, no advertising pixels, and no analytics package. Photographs load from Pexels and Unsplash.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold text-navy">Contact on this demo</h2>
            <p className="mt-3">
              {company.city}. Phone{" "}
              <a className="font-semibold text-orange" href={`tel:${company.phoneTel}`}>
                {company.phoneDisplay}
              </a>
              . Email{" "}
              <a className="font-semibold text-orange" href={`mailto:${company.email}`}>
                {company.email}
              </a>
              . That address uses the reserved .example domain and does not reach a real mailbox.
            </p>
          </section>
        </div>
        <p className="mt-10">
          <SiteLink href="/#top" className="font-semibold text-navy underline decoration-signal underline-offset-4">
            Back to the homepage
          </SiteLink>
        </p>
      </div>
    </article>
  );
}
