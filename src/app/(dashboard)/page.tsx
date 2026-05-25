import { TopBar } from "@/components/TopBar";
import { Sidebar } from "@/components/Sidebar";
import { EmissionsChart } from "@/features/emissions-chart/EmissionsChart";
import { LifecycleSection } from "@/features/lifecycle-section/LifecycleSection";
import { MetricsGrid } from "@/features/metrics-grid/MetricsGrid";
import { PostPanel } from "@/features/post-panel/PostPanel";
import { mockCompanies } from "@/mocks/companies";
import { mockProductPcfs } from "@/mocks/product-pcfs";
import { mockProducts } from "@/mocks/products";

type DashboardPageProps = {
  searchParams: Promise<{ companyId?: string | string[] }>;
};

function CompanyEmptyState() {
  return (
    <section className="relative space-y-6 overflow-hidden after:absolute after:inset-0 after:z-10 after:bg-(--surface)/15 after:backdrop-blur-sm after:content-['']">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {["w-2/3", "w-1/2", "w-3/4", "w-1/2"].map((width, index) => (
          <article
            aria-hidden="true"
            className="dashboard-card animate-pulse p-(--space-md) opacity-55"
            key={index}
          >
            <div className="h-3 w-24 rounded-full bg-(--surface-container-highest)" />
            <div
              className={`mt-5 h-8 rounded-full bg-(--surface-container-high) ${width}`}
            />
            <div className="mt-5 h-3 w-full rounded-full bg-(--surface-container-highest)" />
            <div className="mt-2 h-3 w-2/3 rounded-full bg-(--surface-container-highest)" />
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <article
          aria-hidden="true"
          className="dashboard-card min-h-75 animate-pulse p-(--space-md) opacity-55 xl:col-span-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="w-full max-w-sm">
              <div className="h-7 w-3/4 rounded-full bg-(--surface-container-high)" />
              <div className="mt-3 h-3 w-1/2 rounded-full bg-(--surface-container-highest)" />
            </div>
            <div className="hidden gap-2 sm:flex">
              <div className="h-9 w-20 rounded-lg bg-(--surface-container-high)" />
              <div className="h-9 w-20 rounded-lg bg-(--surface-container-highest)" />
            </div>
          </div>
          <div className="mt-10 flex h-40 items-end gap-3">
            {[65, 48, 74, 42, 82, 56, 68, 76].map((height, index) => (
              <div
                className="flex-1 rounded-t-md bg-(--surface-container-high)"
                key={index}
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="mt-8 flex gap-4">
            <div className="h-3 w-20 rounded-full bg-(--surface-container-highest)" />
            <div className="h-3 w-20 rounded-full bg-(--surface-container-highest)" />
            <div className="h-3 w-20 rounded-full bg-(--surface-container-highest)" />
          </div>
        </article>

        <article
          aria-hidden="true"
          className="dashboard-card min-h-75 animate-pulse p-(--space-md) opacity-55 xl:col-span-4"
        >
          <div className="h-7 w-40 rounded-full bg-(--surface-container-high)" />
          {[0, 1, 2].map((item) => (
            <div
              className="mt-6 border-b border-(--outline-variant) pb-5 last:border-b-0"
              key={item}
            >
              <div className="ml-auto h-3 w-24 rounded-full bg-(--surface-container-highest)" />
              <div className="mt-4 h-4 w-5/6 rounded-full bg-(--surface-container-high)" />
              <div className="mt-3 h-3 w-full rounded-full bg-(--surface-container-highest)" />
              <div className="mt-2 h-3 w-2/3 rounded-full bg-(--surface-container-highest)" />
            </div>
          ))}
        </article>
      </div>

      <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
        <section className="dashboard-card max-w-2xl p-(--space-lg) text-center shadow-(--shadow-overlay)">
          <h2 className="mt-3 text-2xl font-semibold text-(--on-surface)">
            배출량 데이터를 보려면 회사를 선택하세요
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-(--on-surface-variant)">
            상단 검색창에서 회사를 선택하면 대시보드 지표, GHG 배출량, 관련
            게시글, PCF 라이프사이클 분석을 확인할 수 있습니다.
          </p>
        </section>
      </div>
    </section>
  );
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const { companyId } = await searchParams;
  const requestedCompanyId = Array.isArray(companyId)
    ? companyId[0]
    : companyId;
  const companies = mockCompanies.map(({ country, id, name }) => ({
    country,
    id,
    name,
  }));
  const selectedCompany = companies.find(
    (company) => company.id === requestedCompanyId,
  );
  const selectedCompanyId = selectedCompany?.id;
  const hasSelectedCompany = Boolean(selectedCompanyId);
  const products = hasSelectedCompany
    ? mockProducts.filter((product) => product.companyId === selectedCompanyId)
    : [];
  const productIds = new Set(products.map((product) => product.id));
  const productPcfs = mockProductPcfs.filter((pcf) =>
    productIds.has(pcf.productId),
  );

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
          {hasSelectedCompany ? (
            <>
              <section className="scroll-mt-24" id="dashboard-overview">
                <MetricsGrid companyId={selectedCompanyId} />
              </section>

              <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <EmissionsChart companyId={selectedCompanyId} />
                <PostPanel companyId={selectedCompanyId} />
              </section>

              <section className="scroll-mt-24" id="pcf-lifecycle">
                <LifecycleSection
                  productPcfs={productPcfs}
                  products={products}
                />
              </section>
            </>
          ) : (
            <CompanyEmptyState />
          )}
        </div>
      </div>
    </main>
  );
}
