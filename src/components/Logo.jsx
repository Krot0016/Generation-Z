export function Logo({ onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-3 text-left ${className ?? ''}`}
      aria-label="TwinBoost — на главную"
    >
      <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-amber-400/25 bg-amber-400/[0.07] text-amber-300 transition-colors duration-200 group-hover:border-amber-400/45 group-hover:bg-amber-400/10">
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 4l6 3.5v9L12 20l-6-3.5v-9L12 4z" />
          <path d="M6 7.5l6 3.5 6-3.5M12 11v9" opacity="0.65" />
        </svg>
        <span className="absolute right-1.5 top-1.5 h-1 w-1 rounded-full bg-amber-300/80" />
      </span>
      <span className="min-w-0">
        <span className="block text-[15px] font-semibold leading-none tracking-[-0.02em] text-steel-100">
          TwinBoost
        </span>
        <span className="mt-1 hidden text-[8px] uppercase leading-none tracking-[0.22em] text-steel-500 sm:block">
          digital twin generator
        </span>
      </span>
    </button>
  );
}
