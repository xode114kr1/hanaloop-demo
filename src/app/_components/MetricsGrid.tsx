import { mockCompanies } from "@/mocks/companies";
import { mockProductPcfs } from "@/mocks/product-pcfs";
import { mockProducts } from "@/mocks/products";

type MetricCardData = {
  title: string;
  icon: string;
  value: string;
  unit?: string;
  detail: string;
};

const selectedCompany = mockCompanies[0];
const selectedProducts = mockProducts.filter(
  (product) => product.companyId === selectedCompany.id,
);
const totalEmissions = selectedCompany.emissions.reduce(
  (sum, emission) => sum + emission.emissions,
  0,
);
const latestYearMonth = selectedCompany.emissions
  .map((emission) => emission.yearMonth)
  .sort()
  .at(-1);
const monthlyEmissions = selectedCompany.emissions
  .filter((emission) => emission.yearMonth === latestYearMonth)
  .reduce((sum, emission) => sum + emission.emissions, 0);
const highestEmissionProduct = selectedProducts
  .map((product) => {
    const emissions = mockProductPcfs
      .filter((pcf) => pcf.productId === product.id)
      .reduce((sum, pcf) => sum + pcf.emissions, 0);

    return { name: product.name, emissions };
  })
  .sort((a, b) => b.emissions - a.emissions)[0];

const metricCards: MetricCardData[] = [
  {
    title: "총 배출량",
    icon: "CO",
    value: totalEmissions.toLocaleString(),
    unit: "tCO2e",
    detail: `${selectedCompany.name} 전체 배출량`,
  },
  {
    title: "당월 배출량",
    icon: "MO",
    value: monthlyEmissions.toLocaleString(),
    unit: "tCO2e",
    detail: `${latestYearMonth} 기준 배출량`,
  },
  {
    title: "배출량이 가장 높은 제품",
    icon: "PC",
    value: highestEmissionProduct?.name ?? "데이터 없음",
    detail: highestEmissionProduct
      ? `${highestEmissionProduct.emissions.toLocaleString()} kg CO2e`
      : "제품 PCF 데이터가 없습니다",
  },
  {
    title: "제품 개수",
    icon: "PR",
    value: selectedProducts.length.toLocaleString(),
    unit: "개",
    detail: `${selectedCompany.name} 등록 제품`,
  },
];

function MetricCard({ card }: { card: MetricCardData }) {
  return (
    <article className="dashboard-card p-(--space-md)">
      <div className="mb-3 flex items-start justify-between gap-4">
        <span className="dashboard-card-header">{card.title}</span>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--surface-container-low) text-xs font-bold text-(--primary)">
          {card.icon}
        </span>
      </div>
      <h2 className="metric-value wrap-break-word">
        {card.value}{" "}
        {"unit" in card ? (
          <span className="text-sm font-normal text-(--on-surface-variant)">
            {card.unit}
          </span>
        ) : null}
      </h2>
      <div className="mt-4">
        <p className="text-sm text-(--on-surface-variant)">{card.detail}</p>
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
