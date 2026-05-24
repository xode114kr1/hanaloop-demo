import { lifecycleStages } from "./dashboard-data";

export function LifecycleSection() {
  return (
    <section className="dashboard-card overflow-hidden p-[var(--space-md)]">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-[var(--on-surface)]">
            PCF Lifecycle Analysis
          </h2>
          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
            Product Carbon Footprint breakdown by stage
          </p>
        </div>
        <div className="flex gap-2">
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--outline-variant)] font-bold hover:bg-[var(--surface-container-low)]">
            &lt;
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--outline-variant)] font-bold hover:bg-[var(--surface-container-low)]">
            &gt;
          </button>
        </div>
      </div>
      <div className="custom-scrollbar flex snap-x gap-6 overflow-x-auto pb-4">
        {lifecycleStages.map((stage) => (
          <article
            className="min-w-[280px] snap-start rounded-xl border border-[var(--outline-variant)] bg-white p-4 transition hover:border-[var(--primary-container)]"
            key={stage.stage}
          >
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-container-low)] text-xs font-bold text-[var(--primary)]">
                {stage.icon}
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase text-[var(--outline)]">
                  Stage {stage.stage}
                </span>
                <h3 className="font-bold text-[var(--on-surface)]">
                  {stage.name}
                </h3>
              </div>
            </div>
            <div className="mb-4 rounded-lg bg-[var(--surface-container-low)] p-3 text-sm font-bold text-[var(--on-surface)]">
              {stage.emissions}
            </div>
            <p className="text-sm text-[var(--on-surface-variant)]">
              {stage.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
