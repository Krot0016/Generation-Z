import { Stepper } from './Stepper';

export function FlowBar({ current, note }) {
  return (
    <div className="border-b border-white/[0.06] bg-graphite-950/45">
      <div className="container-page flex items-center justify-between gap-4 py-3">
        <Stepper current={current} />
        {note && (
          <span className="hidden items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-steel-600 sm:flex">
            <span className="h-1 w-1 rounded-full bg-amber-400/60" />
            {note}
          </span>
        )}
      </div>
    </div>
  );
}
