import { company, demo, hours, nav, serviceArea, services } from "../content/site";
import { Logo } from "./Logo";
import { SiteLink } from "./SiteLink";

export function Footer() {
  return (
    <footer className="bg-navy-deep text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo light stacked />
          {demo.fictionalCompany ? (
            <p className="mt-4 text-sm leading-relaxed text-cream/75">
              Fictional company created for a sales demonstration. Not a real contractor.
            </p>
          ) : null}
          <a href={`tel:${company.phoneTel}`} className="mt-4 inline-block font-semibold text-white hover:text-signal">
            {company.phoneDisplay}
          </a>
          <p className="mt-1 text-sm text-cream/75">{company.city}</p>
          <a href={`mailto:${company.email}`} className="mt-1 inline-block text-sm text-signal">
            {company.email}
          </a>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Quick links</p>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.id}>
                <SiteLink href={item.href} className="text-cream/80 hover:text-white">
                  {item.label}
                </SiteLink>
              </li>
            ))}
            <li>
              <SiteLink href="/#faq" className="text-cream/80 hover:text-white">
                FAQ
              </SiteLink>
            </li>
            <li>
              <SiteLink href="/privacy" className="text-cream/80 hover:text-white">
                Privacy
              </SiteLink>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Services</p>
          <ul className="mt-4 space-y-2">
            {services.map((service) => (
              <li key={service.id}>
                <SiteLink href={`/#${service.id}`} className="text-cream/80 hover:text-white">
                  {service.title}
                </SiteLink>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold text-white">Service area</p>
          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-signal">{serviceArea.label}</p>
          <ul className="mt-3 space-y-1 text-cream/80">
            {serviceArea.places.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
          <p className="mt-6 font-display text-lg font-bold text-white">Business hours</p>
          {demo.hoursAreSample ? (
            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-signal">Sample information</p>
          ) : null}
          <dl className="mt-3 space-y-1 text-sm">
            {hours.lines.map((line) => (
              <div key={line.days} className="flex justify-between gap-3 text-cream/80">
                <dt>{line.days}</dt>
                <dd className="text-white">{line.time}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-xs text-cream/60">{hours.note}</p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-sm text-cream/60 sm:px-8">
          © {company.copyrightYear} {company.name}. Demonstration website.
        </p>
      </div>
    </footer>
  );
}
