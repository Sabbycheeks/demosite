import { company, photos } from "../content/site";
import { Photo } from "./Photo";
import { SiteLink } from "./SiteLink";

export function Hero() {
  return (
    <section id="top" className="bg-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 lg:grid-cols-12 lg:py-20">
        <div className="lg:col-span-6">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">
            Columbus and Central Ohio
          </p>
          <h1 className="mt-4 max-w-xl font-display text-[2.6rem] font-extrabold leading-[1.02] tracking-tight text-navy sm:text-6xl">
            <span className="mr-3 inline-block h-[0.82em] w-1.5 translate-y-1 bg-signal align-middle" aria-hidden="true" />
            {company.heroTitle}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink">{company.heroSupport}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <SiteLink
              href="/#contact"
              className="inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 text-base font-semibold text-white hover:bg-orange-deep"
            >
              Request a Free Estimate
            </SiteLink>
            <a
              href={`tel:${company.phoneTel}`}
              className="inline-flex min-h-12 items-center justify-center rounded-md border border-navy px-5 text-base font-semibold text-navy hover:bg-navy hover:text-white"
            >
              Call {company.phoneDisplay}
            </a>
          </div>
          <p className="mt-8 border-t border-line pt-5 text-sm font-semibold tracking-wide text-navy">
            {company.trustLine}
          </p>
        </div>
        <div className="lg:col-span-6">
          <div className="overflow-hidden rounded-lg bg-navy shadow-[0_22px_50px_-28px_rgba(12,35,64,0.7)]">
            <Photo
              photo={photos.hero}
              priority
              className="aspect-[4/5] w-full object-cover object-[center_12%] sm:aspect-[5/4]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
