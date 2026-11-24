import { CircleDot, Cog, Layers, Scissors } from 'lucide-react';

const ICONS = {
  turning: Cog,
  milling: Layers,
  grinding: CircleDot,
  cutting: Scissors,
};

export function TypeIcon({ typeKey, className = 'h-5 w-5' }) {
  const Icon = ICONS[typeKey] || Cog;
  return <Icon className={className} strokeWidth={1.6} aria-hidden="true" />;
}
