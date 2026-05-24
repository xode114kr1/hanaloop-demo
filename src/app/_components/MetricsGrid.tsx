import { metricCards } from "./dashboard-data";

type MetricCardData = (typeof metricCards)[number];

function MetricCard({ card }: { card: MetricCardData }) {
  return (
    <article className="dashboard-card p-(--space-md)">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="dashboard-card-header">{card.title}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--surface-container-low) text-xs font-bold text-(--primary)">
          {card.icon}
        </span>
      </div>
      <h2 className="metric-value">
        {card.value}{" "}
        {"unit" in card ? (
          <span className="text-sm font-normal text-(--on-surface-variant)">
            {card.unit}
          </span>
        ) : null}
      </h2>
      <div className="mt-4">
        {card.tone === "success" ? (
          <span className="inline-flex rounded-full bg-(--primary-container)/12 px-2.5 py-1 text-xs font-bold text-(--on-primary-container)">
            {card.detail}
          </span>
        ) : null}
        {card.tone === "risk" ? (
          <>
            <p className="text-sm text-(--on-surface-variant)">
              {card.detail}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-(--error-container) px-2.5 py-1 text-xs font-bold uppercase text-(--on-error-container)">
              High Risk
            </span>
          </>
        ) : null}
        {card.tone === "progress" ? (
          <>
            <div className="h-2 overflow-hidden rounded-full bg-(--outline-variant)">
              <div className="w-65-percent h-full rounded-full bg-(--primary-container)" />
            </div>
            <p className="mt-3 text-sm text-(--on-surface-variant)">
              {card.detail}
            </p>
          </>
        ) : null}
        {card.tone === "scope" ? (
          <>
            <p className="text-sm text-(--on-surface-variant)">
              {card.detail}
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-(--secondary-container)">
              <div className="h-full w-4/5 rounded-full bg-(--secondary)" />
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}

export function MetricsGrid() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {metricCards.map((card) => (
        <MetricCard card={card} key={card.title} />
      ))}
    </section>
  );
}
