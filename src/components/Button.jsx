import { cn } from '../lib/utils';

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium tracking-[-0.01em] transition-colors duration-200 disabled:pointer-events-none disabled:opacity-40';

const VARIANTS = {
  primary:
    'bg-amber-400 text-graphite-950 hover:bg-amber-300 shadow-[0_14px_36px_-22px_rgba(12,119,226,0.45)]',
  secondary:
    'border border-ink/10 bg-ink/[0.03] text-steel-100 hover:border-ink/20 hover:bg-ink/[0.06]',
  ghost: 'text-steel-300 hover:bg-ink/[0.05] hover:text-steel-100',
  outline:
    'border border-amber-400/30 bg-amber-400/[0.06] text-amber-200 hover:border-amber-400/50 hover:bg-amber-400/10',
  product: 'bg-product-accent text-white hover:bg-[#3b9bf0] shadow-[0_14px_30px_-18px_rgba(12,119,226,0.45)]',
  'product-secondary':
    'border border-product-line bg-product-surface text-product-ink hover:border-product-strong hover:bg-product-soft',
};

const SIZES = {
  sm: 'h-9 px-3.5 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-sm',
};
export function Button({ variant = 'primary', size = 'md', className, children, type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </button>
  );
}
