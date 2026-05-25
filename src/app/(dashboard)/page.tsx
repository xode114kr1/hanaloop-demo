import { EmissionsChart } from "./_components/EmissionsChart";
import { LifecycleSection } from "./_components/LifecycleSection";
import { MetricsGrid } from "./_components/MetricsGrid";
import { TopBar } from "./_components/TopBar";
import { PostPanel } from "./_components/PostPanel";
import { Sidebar } from "./_components/Sidebar";
import { mockCompanies } from "@/mocks/companies";
import { mockProductPcfs } from "@/mocks/product-pcfs";
import { mockProducts } from "@/mocks/products";

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
  const products = mockProducts.filter(
    (product) => product.companyId === selectedCompanyId,
  );
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
          <section className="scroll-mt-24" id="dashboard-overview">
            <MetricsGrid companyId={selectedCompanyId} />
          </section>

          <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
            <EmissionsChart companyId={selectedCompanyId} />
            <PostPanel companyId={selectedCompanyId} />
          </section>

          <section className="scroll-mt-24" id="pcf-lifecycle">
            <LifecycleSection productPcfs={productPcfs} products={products} />
          </section>
        </div>
      </div>
    </main>
  );
}
