const navItems = [
  { label: "Dashboard", icon: "DB", active: true },
  { label: "Emissions", icon: "CO" },
  { label: "Lifecycle", icon: "LC" },
  { label: "Social", icon: "PS" },
  { label: "Reports", icon: "RP" },
];

const metricCards = [
  {
    title: "Total Emissions",
    icon: "CO",
    value: "42,500",
    unit: "tCO2e",
    detail: "-5.2% vs last month",
    tone: "success",
  },
  {
    title: "Monthly Progress",
    icon: "MO",
    value: "-5.2%",
    detail: "Ahead of annual reduction goal",
    tone: "progress",
  },
  {
    title: "Highest Scope",
    icon: "S2",
    value: "Scope 2",
    detail: "Indirect energy consumption",
    tone: "scope",
  },
  {
    title: "Est. Carbon Tax",
    icon: "TX",
    value: "$1.2M",
    detail: "Projected for Fiscal Year 2024",
    tone: "risk",
  },
];

const emissions = [
  { month: "JAN", scope12: 60, scope3: 40 },
  { month: "FEB", scope12: 55, scope3: 35 },
  { month: "MAR", scope12: 65, scope3: 45 },
  { month: "APR", scope12: 50, scope3: 30 },
  { month: "MAY", scope12: 70, scope3: 50 },
  { month: "JUN", scope12: 45, scope3: 25 },
  { month: "JUL", scope12: 60, scope3: 40 },
  { month: "AUG", scope12: 75, scope3: 55 },
];

const posts = [
  {
    category: "Policy Change",
    date: "Oct 12, 2023",
    title: "New Carbon Border Adjustment Mechanism compliance",
    content:
      "Upcoming reports include detailed breakdowns for all EU-bound exports following the latest directive.",
  },
  {
    category: "Announcement",
    date: "Oct 10, 2023",
    title: "Sustainable logistics partnership with GreenFreight",
    content:
      "Scope 3 downstream emissions are projected to fall through electric fleet optimization.",
  },
  {
    category: "Achievement",
    date: "Oct 05, 2023",
    title: "ISO 14064 certification renewed",
    content:
      "Greenhouse gas verification and validation processes met international standards again.",
  },
];

const lifecycleStages = [
  {
    stage: "01",
    name: "Raw Material",
    emissions: "12.4 kg CO2e",
    icon: "RM",
    description:
      "Extraction and initial processing of sustainable aluminum and composite polymers.",
  },
  {
    stage: "02",
    name: "Manufacturing",
    emissions: "28.1 kg CO2e",
    icon: "MF",
    description:
      "High-efficiency assembly line powered by on-site renewable energy generation.",
  },
  {
    stage: "03",
    name: "Packaging",
    emissions: "3.2 kg CO2e",
    icon: "PK",
    description:
      "Recycled biodegradable materials with low-impact printing solutions.",
  },
  {
    stage: "04",
    name: "Transportation",
    emissions: "15.7 kg CO2e",
    icon: "TR",
    description:
      "Last-mile delivery via electric freight fleet and maritime shipping offsets.",
  },
  {
    stage: "05",
    name: "Use",
    emissions: "8.4 kg CO2e",
    icon: "US",
    description:
      "Average energy consumption over a five-year product lifecycle lifespan.",
  },
  {
    stage: "06",
    name: "End of Life",
    emissions: "-4.1 kg CO2e",
    icon: "EL",
    description:
      "Carbon credits earned through a comprehensive take-back and recycle program.",
  },
];

function IconBadge({ label }: { label: string }) {
  return (
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-container-low)] text-xs font-bold text-[var(--primary)]">
      {label}
    </span>
  );
}

function MetricCard({ card }: { card: (typeof metricCards)[number] }) {
  return (
    <article className="dashboard-card p-[var(--space-md)]">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="dashboard-card-header">{card.title}</span>
        <IconBadge label={card.icon} />
      </div>
      <h2 className="metric-value">
        {card.value}{" "}
        {card.unit ? (
          <span className="text-sm font-normal text-[var(--on-surface-variant)]">
            {card.unit}
          </span>
        ) : null}
      </h2>
      <div className="mt-4">
        {card.tone === "success" ? (
          <span className="inline-flex rounded-full bg-[rgb(0_184_148_/_12%)] px-2.5 py-1 text-xs font-bold text-[var(--on-primary-container)]">
            {card.detail}
          </span>
        ) : null}
        {card.tone === "risk" ? (
          <>
            <p className="text-sm text-[var(--on-surface-variant)]">
              {card.detail}
            </p>
            <span className="mt-2 inline-flex rounded-full bg-[var(--error-container)] px-2.5 py-1 text-xs font-bold uppercase text-[var(--on-error-container)]">
              High Risk
            </span>
          </>
        ) : null}
        {card.tone === "progress" ? (
          <>
            <div className="h-2 overflow-hidden rounded-full bg-[var(--outline-variant)]">
              <div className="h-full w-[65%] rounded-full bg-[var(--primary-container)]" />
            </div>
            <p className="mt-3 text-sm text-[var(--on-surface-variant)]">
              {card.detail}
            </p>
          </>
        ) : null}
        {card.tone === "scope" ? (
          <>
            <p className="text-sm text-[var(--on-surface-variant)]">
              {card.detail}
            </p>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-[var(--secondary-container)]">
              <div className="h-full w-4/5 rounded-full bg-[var(--secondary)]" />
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}

export default function Home() {
  return (
    <main className="dashboard-shell">
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-[280px] flex-col border-r border-[var(--outline-variant)] bg-[var(--surface-bright)] px-3 py-6 md:flex">
        <div className="mb-10 px-3">
          <h1 className="text-3xl font-bold tracking-tight text-[var(--secondary)]">
            CarbonMetric
          </h1>
          <p className="mt-1 text-sm text-[var(--on-surface-variant)]">
            Institutional Tier
          </p>
        </div>
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <a
              className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition-colors ${
                item.active
                  ? "bg-[var(--primary-container)] text-[var(--on-primary-container)]"
                  : "text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-highest)]"
              }`}
              href="#"
              key={item.label}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--outline-variant)] text-[10px] font-bold">
                {item.icon}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-[var(--outline-variant)] pt-6">
          <button className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary-container)] px-4 py-3 text-sm font-bold text-[var(--on-primary-container)] transition hover:brightness-105">
            <span aria-hidden="true">EX</span>
            Export ESG Data
          </button>
          <div className="space-y-1">
            {["Settings", "Support"].map((item) => (
              <a
                className="block rounded-lg px-3 py-2 text-sm font-medium text-[var(--on-surface-variant)] hover:bg-[var(--surface-container-low)]"
                href="#"
                key={item}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-h-screen md:pl-[280px]">
        <header className="sticky top-0 z-30 border-b border-[var(--outline-variant)] bg-[var(--surface)] px-4 shadow-sm md:px-6">
          <div className="container mx-auto flex h-16 items-center justify-between">
            <div className="flex min-w-0 items-center gap-4">
              <span className="text-xl font-bold text-[var(--primary)] md:hidden">
                CarbonMetric
              </span>
              <label className="relative hidden sm:block">
                <span className="sr-only">Search companies</span>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[var(--on-surface-variant)]">
                  /
                </span>
                <input
                  className="w-72 rounded-full border border-transparent bg-[var(--surface-container-low)] py-2 pl-9 pr-4 text-sm text-[var(--on-surface)] outline-none transition focus:border-[var(--primary-container)] focus:shadow-[var(--focus-ring)]"
                  placeholder="Search companies..."
                  type="search"
                />
              </label>
            </div>
            <div className="flex items-center gap-2">
              {["NT", "HP", "ST"].map((item) => (
                <button
                  aria-label={item}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-[var(--on-surface-variant)] transition hover:bg-[var(--surface-container-low)]"
                  key={item}
                >
                  {item}
                </button>
              ))}
              <div className="ml-2 flex h-9 w-9 items-center justify-center rounded-full border border-[var(--outline-variant)] bg-[var(--secondary)] text-xs font-bold text-white">
                ES
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto space-y-6 p-4 md:p-[var(--space-gutter)]">
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {metricCards.map((card) => (
              <MetricCard card={card} key={card.title} />
            ))}
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
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

            <article className="dashboard-card p-[var(--space-md)] xl:col-span-4">
              <div className="mb-6 flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold text-[var(--on-surface)]">
                  Recent ESG Updates
                </h2>
                <button className="text-sm font-bold text-[var(--primary)]">
                  View All
                </button>
              </div>
              <div className="space-y-5">
                {posts.map((post, index) => (
                  <article
                    className="border-b border-[var(--outline-variant)] pb-5 last:border-b-0 last:pb-0"
                    key={post.title}
                  >
                    <div className="mb-2 flex justify-between gap-4 text-[11px] font-bold uppercase text-[var(--outline)]">
                      <span>{post.category}</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="font-bold text-[var(--on-surface)] transition hover:text-[var(--primary)]">
                      {post.title}
                    </h3>
                    <p className="text-clamp-2 mt-2 text-sm text-[var(--on-surface-variant)]">
                      {post.content}
                    </p>
                    {index === 0 ? (
                      <span className="mt-3 inline-flex rounded-full bg-[rgb(0_184_148_/_10%)] px-2.5 py-1 text-xs font-bold text-[var(--on-primary-container)]">
                        Active briefing
                      </span>
                    ) : null}
                  </article>
                ))}
              </div>
            </article>
          </section>

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
                    <IconBadge label={stage.icon} />
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
        </div>
      </div>

    </main>
  );
}
