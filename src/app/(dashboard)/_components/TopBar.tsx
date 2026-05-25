export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-(--outline-variant) bg-(--surface) shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-end p-4 md:p-(--space-gutter)">
        <div className="flex w-full min-w-0 items-center justify-end gap-4 sm:w-auto">
          <input
            className="w-full rounded-full border border-transparent bg-(--surface-container-low) py-2 pl-9 pr-4 text-sm text-(--on-surface) outline-none transition focus:border-(--primary-container) focus:shadow-(--focus-ring) sm:w-72"
            placeholder="Search companies..."
            type="search"
          />
        </div>
      </div>
    </header>
  );
}
