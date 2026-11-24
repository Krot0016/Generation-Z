import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

const STEPS = [
  { id: 1, label: 'Импорт' },
  { id: 2, label: 'Сборка' },
  { id: 3, label: 'Двойник' },
];

export function Stepper({ current }) {
  return (
    <ol className="flex items-center gap-2 sm:gap-3" aria-label="Этапы создания цифрового двойника">
      {STEPS.map((step, index) => {
        const done = step.id < current;
        const active = step.id === current;
        return (
          <li key={step.id} className="flex items-center gap-2">
            <span
              aria-current={active ? 'step' : undefined}
              className={cn(
                'grid h-6 w-6 shrink-0 place-items-center rounded-full border font-mono text-[10px]',
                done && 'border-amber-400/35 bg-amber-400/10 text-amber-300',
                active && 'border-amber-400/60 bg-amber-400 text-graphite-950',
                !done && !active && 'border-ink/10 text-steel-600',
              )}
            >
              {done ? <Check className="h-3 w-3" strokeWidth={2.4} /> : step.id}
            </span>
            <span
              className={cn(
                'text-[10px] uppercase tracking-[0.14em]',
                active && 'text-steel-100',
                done && 'text-steel-400',
                !done && !active && 'text-steel-600',
              )}
            >
              {step.label}
            </span>
            {index < STEPS.length - 1 && (
              <span
                className={cn(
                  'hidden h-px w-5 sm:block',
                  done ? 'bg-amber-400/25' : 'bg-ink/10',
                )}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}
