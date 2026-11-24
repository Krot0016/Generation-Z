import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function ChainArrow({ className, tone = 'amber' }) {
  const green = tone === 'green';

  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center justify-center py-1 lg:flex-row lg:py-0',
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={cn('h-8 lg:hidden', green ? 'chain-line-v chain-line-v--green' : 'chain-line-v')}
      />
      <ChevronDown
        className={cn('h-4 w-4 lg:hidden', green ? 'text-product-accent/70' : 'text-amber-400/60')}
        strokeWidth={1.6}
      />
      <span
        className={cn('hidden w-8 lg:block', green ? 'chain-line-h chain-line-h--green' : 'chain-line-h')}
      />
      <ChevronRight
        className={cn('hidden h-4 w-4 lg:block', green ? 'text-product-accent/70' : 'text-amber-400/70')}
        strokeWidth={1.6}
      />
    </div>
  );
}
