import { EmissionsChart } from "./_components/EmissionsChart";
import { LifecycleSection } from "./_components/LifecycleSection";
import { MetricsGrid } from "./_components/MetricsGrid";
import { TopBar } from "./_components/TopBar";
import { UpdatesPanel } from "./_components/UpdatesPanel";
import { Sidebar } from "../components/Sidebar";

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <Sidebar />

      <div className="min-h-screen md:pl-[280px]">
        <TopBar />

        <div className="container mx-auto space-y-6 p-4 md:p-[var(--space-gutter)]">
          <MetricsGrid />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <EmissionsChart />
            <UpdatesPanel />
          </section>

          <LifecycleSection />
        </div>
      </div>
    </main>
  );
}
