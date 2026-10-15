import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { company, demo, hours, services } from "../content/site";
import {
  emptyEstimate,
  submitEstimate,
  toEstimateRequest,
  validateEstimate,
  type EstimateInput,
  type FieldErrors,
} from "../lib/estimate";

const inputClass =
  "mt-1.5 w-full rounded-md border border-line bg-white px-3 py-3 text-base text-ink shadow-sm";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm font-semibold text-danger">
      {message}
    </p>
  );
}

export function EstimateForm({
  serviceRequest,
}: {
  serviceRequest: { id: string; nonce: number };
}) {
  const [fields, setFields] = useState<EstimateInput>(emptyEstimate);
  const [phase, setPhase] = useState<"editing" | "submitting" | "success">("editing");
  const [attempted, setAttempted] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [appliedNonce, setAppliedNonce] = useState(0);
  const [headingFocusNonce, setHeadingFocusNonce] = useState(0);
  const [invalidFocus, setInvalidFocus] = useState<{ id: string; tick: number } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorSummaryId = useId();
  const errors: FieldErrors = attempted ? validateEstimate(fields) : {};

  if (serviceRequest.nonce !== appliedNonce) {
    setAppliedNonce(serviceRequest.nonce);
    if (serviceRequest.nonce > 0 && serviceRequest.id) {
      setFields((current) => ({ ...current, service: serviceRequest.id }));
      setPhase("editing");
      setAttempted(false);
      setFormError("");
      setHeadingFocusNonce(serviceRequest.nonce);
    }
  }

  useEffect(() => {
    if (!headingFocusNonce) return;
    headingRef.current?.focus();
  }, [headingFocusNonce]);

  useEffect(() => {
    if (!invalidFocus) return;
    document.getElementById(invalidFocus.id)?.focus();
  }, [invalidFocus]);

  function update<K extends keyof EstimateInput>(key: K, value: EstimateInput[K]) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateEstimate(fields);
    setAttempted(true);
    setFormError("");
    if (Object.keys(nextErrors).length > 0) {
      const order: (keyof EstimateInput)[] = [
        "name",
        "phone",
        "email",
        "service",
        "description",
        "contactMethod",
      ];
      const first = order.find((key) => nextErrors[key]);
      if (first) setInvalidFocus({ id: first, tick: Date.now() });
      return;
    }

    const request = toEstimateRequest(fields);
    if (!request) return;

    setPhase("submitting");
    const result = await submitEstimate(request);
    if (!result.ok) {
      setPhase("editing");
      setFormError(result.message);
      return;
    }
    setSuccessMessage(result.message);
    setPhase("success");
  }

  const describedBy = (field: keyof EstimateInput) => (errors[field] ? `${field}-error` : undefined);

  return (
    <section id="contact" className="bg-navy text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-signal">Contact</p>
          <h2
            ref={headingRef}
            id="estimate-heading"
            tabIndex={-1}
            className="mt-3 font-display text-3xl font-bold tracking-tight text-white outline-none sm:text-4xl"
          >
            Request a free estimate
          </h2>
          <p className="mt-4 text-lg text-cream/80">
            Tell us what the system is doing. On a live site this note would reach the shop. Here it stays in the browser.
          </p>
          <a href={`tel:${company.phoneTel}`} className="mt-6 inline-block font-display text-3xl font-bold text-white hover:text-signal">
            {company.phoneDisplay}
          </a>
          <p className="mt-1 text-sm text-cream/70">{company.city}</p>
          <a href={`mailto:${company.email}`} className="mt-2 inline-block text-sm font-semibold text-signal">
            {company.email}
          </a>
          <div className="mt-8 border border-white/15 p-4">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-signal">
              {demo.hoursAreSample ? "Sample hours" : "Hours"}
            </p>
            {demo.hoursAreSample ? <p className="mt-1 text-sm text-cream/75">{hours.note}</p> : null}
            <dl className="mt-3 space-y-1">
              {hours.lines.map((line) => (
                <div key={line.days} className="flex justify-between gap-4 text-sm">
                  <dt>{line.days}</dt>
                  <dd className="font-semibold text-white">{line.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="bg-cream p-5 text-ink shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)] sm:p-8">
          {phase === "success" ? (
            <div role="status" aria-live="polite">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange">Demo form</p>
              <h3 className="mt-2 font-display text-3xl font-bold text-navy">Thanks, {fields.name.trim()}.</h3>
              <p className="mt-4 text-lg text-ink">{successMessage}</p>
              <p className="mt-3 text-ink">
                Nothing was delivered to an inbox, CRM, or email service. A live site would connect that step later.
              </p>
              <button
                type="button"
                className="mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-orange px-5 font-semibold text-white hover:bg-orange-deep"
                onClick={() => {
                  setFields(emptyEstimate());
                  setAttempted(false);
                  setPhase("editing");
                  setSuccessMessage("");
                }}
              >
                Start another sample
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate aria-describedby={Object.keys(errors).length > 0 ? errorSummaryId : undefined}>
              {Object.keys(errors).length > 0 ? (
                <p id={errorSummaryId} className="mb-4 border border-danger/30 bg-white px-3 py-2 text-sm font-semibold text-danger" role="alert">
                  Check the highlighted fields and try again.
                </p>
              ) : null}
              {formError ? (
                <p className="mb-4 text-sm font-semibold text-danger" role="alert">
                  {formError}
                </p>
              ) : null}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="text-sm font-semibold text-navy">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={fields.name}
                    onChange={(event) => update("name", event.target.value)}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={describedBy("name")}
                    className={`${inputClass} ${errors.name ? "border-danger" : ""}`}
                  />
                  <FieldError id="name-error" message={errors.name} />
                </div>
                <div>
                  <label htmlFor="phone" className="text-sm font-semibold text-navy">
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={fields.phone}
                    onChange={(event) => update("phone", event.target.value)}
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={describedBy("phone")}
                    className={`${inputClass} ${errors.phone ? "border-danger" : ""}`}
                  />
                  <FieldError id="phone-error" message={errors.phone} />
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="email" className="text-sm font-semibold text-navy">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={fields.email}
                  onChange={(event) => update("email", event.target.value)}
                  aria-invalid={errors.email ? true : undefined}
                  aria-describedby={describedBy("email")}
                  className={`${inputClass} ${errors.email ? "border-danger" : ""}`}
                />
                <FieldError id="email-error" message={errors.email} />
              </div>
              <div className="mt-4">
                <label htmlFor="service" className="text-sm font-semibold text-navy">
                  Service needed
                </label>
                <select
                  id="service"
                  name="service"
                  value={fields.service}
                  onChange={(event) => update("service", event.target.value)}
                  aria-invalid={errors.service ? true : undefined}
                  aria-describedby={describedBy("service")}
                  className={`${inputClass} ${errors.service ? "border-danger" : ""}`}
                >
                  <option value="">Select a service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                  <option value="not-sure">Not sure yet</option>
                </select>
                <FieldError id="service-error" message={errors.service} />
              </div>
              <div className="mt-4">
                <label htmlFor="description" className="text-sm font-semibold text-navy">
                  Brief description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={fields.description}
                  onChange={(event) => update("description", event.target.value)}
                  aria-invalid={errors.description ? true : undefined}
                  aria-describedby={describedBy("description")}
                  placeholder="Example: the furnace is blowing cold air."
                  className={`${inputClass} ${errors.description ? "border-danger" : ""}`}
                />
                <FieldError id="description-error" message={errors.description} />
              </div>
              <fieldset
                id="contactMethod"
                tabIndex={-1}
                className="mt-4 outline-none"
                aria-invalid={errors.contactMethod ? true : undefined}
                aria-describedby={describedBy("contactMethod")}
              >
                <legend className="text-sm font-semibold text-navy">Preferred contact method</legend>
                <div className="mt-2 flex flex-wrap gap-3">
                  {(["phone", "email"] as const).map((method) => (
                    <label
                      key={method}
                      className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3 ${fields.contactMethod === method ? "border-navy bg-white" : "border-line bg-white"}`}
                    >
                      <input
                        type="radio"
                        name="contactMethod"
                        value={method}
                        checked={fields.contactMethod === method}
                        onChange={() => update("contactMethod", method)}
                      />
                      <span className="capitalize">{method}</span>
                    </label>
                  ))}
                </div>
                <FieldError id="contactMethod-error" message={errors.contactMethod} />
              </fieldset>
              <button
                type="submit"
                disabled={phase === "submitting"}
                className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-md bg-orange px-5 font-semibold text-white hover:bg-orange-deep disabled:cursor-wait disabled:opacity-70"
              >
                {phase === "submitting" ? "Submitting…" : "Request a Free Estimate"}
              </button>
              {demo.formIsNotConnected ? (
                <p className="mt-3 text-sm text-muted">
                  This demonstration form is not connected to a backend. Submitting it does not contact the company.
                </p>
              ) : null}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
