export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 shadow-sm md:px-6">
      <div className="container mx-auto flex h-16 items-center justify-end">
        <div className="flex min-w-0 items-center gap-4">
          <input
            className="w-72 rounded-full border border-transparent bg-[var(--surface-container-low)] py-2 pl-9 pr-4 text-sm text-[var(--on-surface)] outline-none transition focus:border-[var(--primary-container)] focus:shadow-[var(--focus-ring)]"
            placeholder="Search companies..."
            type="search"
          />
        </div>
      </div>
    </header>
  );
}
