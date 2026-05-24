import { emissions } from "./dashboard-data";

export function EmissionsChart() {
  return (
    <article className="dashboard-card p-[var(--space-md)] xl:col-span-8">
      <div className="mb-10 flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--on-surface)]">
            GHG Emissions Overview
          </h2>
          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
            Real-time tracking across all reporting boundaries
          </p>
        </div>
        <div className="flex w-fit rounded-lg bg-[var(--surface-container-low)] p-1">
          {["Monthly", "Yearly", "All"].map((item, index) => (
            <button
              className={`rounded-md px-4 py-2 text-xs font-bold ${
                index === 0
                  ? "bg-white text-[var(--primary)] shadow-sm"
                  : "text-[var(--on-surface-variant)] hover:bg-white/60"
              }`}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="relative h-[300px]">
        <div className="absolute inset-0 flex flex-col justify-between">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              className="border-t border-[var(--outline-variant)] opacity-50"
              key={index}
            />
          ))}
        </div>
        <div className="relative flex h-full items-end justify-between gap-3 px-1 pt-8">
          {emissions.map((item) => (
            <div
              className="flex h-full min-w-7 flex-1 flex-col items-center justify-end gap-1"
              key={item.month}
            >
              <div className="flex h-[230px] w-full max-w-10 items-end justify-center gap-1">
                <div
                  className="w-1/2 rounded-t-sm bg-[var(--secondary)] opacity-30 transition hover:opacity-80"
                  style={{ height: `${item.scope3}%` }}
                />
                <div
                  className="w-1/2 rounded-t-sm bg-[var(--primary-container)] transition hover:brightness-105"
                  style={{ height: `${item.scope12}%` }}
                />
              </div>
              <span className="mt-2 text-[10px] font-bold text-[var(--on-surface-variant)]">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-6 border-t border-[var(--outline-variant)] pt-6">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="h-3 w-3 rounded-full bg-[var(--primary-container)]" />
          Scope 1 & 2
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="h-3 w-3 rounded-full bg-[var(--secondary)] opacity-30" />
          Scope 3
        </div>
      </div>
    </article>
  );
}
