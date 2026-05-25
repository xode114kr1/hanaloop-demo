import { EmissionsChart } from "./_components/EmissionsChart";
import { LifecycleSection } from "./_components/LifecycleSection";
import { MetricsGrid } from "./_components/MetricsGrid";
import { TopBar } from "./_components/TopBar";
import { PostPanel } from "./_components/PostPanel";
import { Sidebar } from "./_components/Sidebar";
import { mockCompanies } from "@/mocks/companies";

type DashboardPageProps = {
  searchParams: Promise<{ companyId?: string | string[] }>;
};

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { companyId } = await searchParams;
  const selectedCompanyId = Array.isArray(companyId) ? companyId[0] : companyId;
  const companies = mockCompanies.map(({ country, id, name }) => ({
    country,
    id,
    name,
  }));

  return (
    <main className="dashboard-shell">
      <Sidebar />

      <div className="min-h-screen md:pl-70">
        <TopBar
          companies={companies}
          key={selectedCompanyId ?? "default-company"}
          selectedCompanyId={selectedCompanyId}
        />

        <div className="container mx-auto space-y-6 p-4 md:p-(--space-gutter)">
          <MetricsGrid companyId={selectedCompanyId} />

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <EmissionsChart companyId={selectedCompanyId} />
            <PostPanel companyId={selectedCompanyId} />
          </section>

          <LifecycleSection />
        </div>
      </div>
    </main>
  );
}
