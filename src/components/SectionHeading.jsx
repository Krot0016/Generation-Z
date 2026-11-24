export function SectionHeading({ eyebrow, title, description, action, className }) {
  return (
    <div className={`flex flex-col gap-5 md:flex-row md:items-end md:justify-between ${className ?? ''}`}>
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-6 bg-amber-400/50" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h2 className="text-balance text-[28px] font-semibold leading-tight tracking-[-0.03em] text-steel-100 sm:text-[34px]">
          {title}
        </h2>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-steel-400">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
