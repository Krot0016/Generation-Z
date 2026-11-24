import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export function ChainArrow({ className }) {
  return (
    <div
      className={cn(
        'flex shrink-0 flex-col items-center justify-center py-1 lg:flex-row lg:py-0',
        className,
      )}
      aria-hidden="true"
    >
      <span className="chain-line-v h-8 lg:hidden" />
      <ChevronDown className="h-4 w-4 text-amber-400/60 lg:hidden" strokeWidth={1.6} />
      <span className="chain-line-h hidden w-8 lg:block" />
      <ChevronRight className="hidden h-4 w-4 text-amber-400/70 lg:block" strokeWidth={1.6} />
    </div>
  );
}
