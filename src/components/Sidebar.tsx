import { navItems } from "../app/_components/dashboard-data";

export function Sidebar() {
  return (
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
    </aside>
  );
}
