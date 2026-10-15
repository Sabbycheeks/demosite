import { useRef, useState, type KeyboardEvent } from "react";
import { faqs } from "../content/site";

export function Faq() {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0].id]);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  function toggle(id: string) {
    setOpenIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = faqs.length - 1;
    let next = index;
    if (event.key === "ArrowDown") next = index === last ? 0 : index + 1;
    else if (event.key === "ArrowUp") next = index === 0 ? last : index - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    else return;
    event.preventDefault();
    buttonRefs.current[next]?.focus();
  }

  return (
    <section id="faq" className="bg-cream" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 lg:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-orange">Questions</p>
        <h2 id="faq-heading" className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
          Practical answers
        </h2>
        <div className="mt-8 border-t border-line">
          {faqs.map((item, index) => {
            const open = openIds.includes(item.id);
            const panelId = `${item.id}-panel`;
            const buttonId = `${item.id}-button`;
            return (
              <div key={item.id} className="border-b border-line">
                <h3>
                  <button
                    ref={(node) => {
                      buttonRefs.current[index] = node;
                    }}
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-xl font-bold text-navy"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                  >
                    {item.question}
                    <span aria-hidden="true" className="text-2xl font-normal text-signal">
                      {open ? "–" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={panelId} role="region" aria-labelledby={buttonId} hidden={!open}>
                  <p className="pb-5 text-ink">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
