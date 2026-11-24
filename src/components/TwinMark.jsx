export function TwinMark({ className = 'h-9 w-9' }) {
  return (
    <span
      className={`grid ${className} shrink-0 place-items-center rounded-lg border border-product-accent/30 bg-product-accent/10 text-product-accent shadow-[inset_0_0_18px_rgba(12,119,226,0.06)]`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-[55%] w-[55%]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      >
        <path d="M12 4l6 3.5v9L12 20l-6-3.5v-9L12 4z" />
        <path d="M6 7.5l6 3.5 6-3.5M12 11v9" opacity="0.65" />
      </svg>
    </span>
  );
}
