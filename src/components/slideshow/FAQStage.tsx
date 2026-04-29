import { useState } from 'react';
import clsx from 'clsx';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

type Props = {
  heading?: string;
  description?: string;
  faqs: FAQItem[];
};

/**
 * Accordion FAQ stage. Sized to fit one viewport: header on top, FAQ
 * list fills remaining space. If the list overflows, the user can
 * collapse the open item to see the rest. Don't add internal scroll.
 */
export default function FAQStage({
  heading = 'Frequently asked questions',
  description,
  faqs,
}: Props) {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id ?? null);

  return (
    <section className="card-glow flex h-full flex-col overflow-hidden p-6 sm:p-8 lg:p-10">
      <header className="gsap-stage-fade max-w-3xl flex-shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-phoenix-400">FAQ</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          {heading}
        </h2>
        {description && <p className="mt-3 text-sm text-midnight-300 sm:text-base">{description}</p>}
      </header>

      <ul className="gsap-stage-fade mt-6 flex-1 divide-y divide-midnight-800/80 overflow-hidden border-y border-midnight-800/80">
        {faqs.map((f) => {
          const isOpen = f.id === openId;
          return (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : f.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-4 text-left transition-colors hover:bg-midnight-800/20"
              >
                <span className="text-sm font-medium text-white sm:text-base">{f.question}</span>
                <ChevronDownIcon
                  className={clsx(
                    'h-5 w-5 flex-shrink-0 text-midnight-400 transition-transform duration-300',
                    isOpen && 'rotate-180 text-phoenix-400',
                  )}
                  aria-hidden="true"
                />
              </button>
              <div
                className={clsx(
                  'grid transition-[grid-template-rows] duration-300 ease-out',
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
                )}
              >
                <div className="overflow-hidden">
                  <div className="pb-4 pr-8 text-sm text-midnight-200">
                    {f.answer}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
