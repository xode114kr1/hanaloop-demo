"use client";

import { useEffect, useState } from "react";
import type { CompanyInfo } from "@/lib/api";

type MetricCardData = {
  title: string;
  icon: string;
  value: string;
  unit?: string;
  detail: string;
};

type MetricsGridProps = {
  companyId?: string;
};

function getMetricCards(companyInfo: CompanyInfo): MetricCardData[] {
  return [
    {
      title: "총 배출량",
      icon: "CO",
      value: companyInfo.totalEmissions.toLocaleString(),
      unit: "tCO2e",
      detail: `${companyInfo.companyName} 전체 배출량`,
    },
    {
      title: "당월 배출량",
      icon: "MO",
      value: companyInfo.currentMonthEmissions.toLocaleString(),
      unit: "tCO2e",
      detail: `${companyInfo.currentYearMonth ?? "월 정보 없음"} 기준 배출량`,
    },
    {
      title: "배출량이 가장 높은 제품",
      icon: "PC",
      value: companyInfo.highestEmissionProduct?.name ?? "데이터 없음",
      detail: companyInfo.highestEmissionProduct
        ? `${companyInfo.highestEmissionProduct.emissions.toLocaleString()} kg CO2e`
        : "제품 PCF 데이터가 없습니다",
    },
    {
      title: "제품 개수",
      icon: "PR",
      value: companyInfo.productCount.toLocaleString(),
      unit: "개",
      detail: `${companyInfo.companyName} 등록 제품`,
    },
  ];
}

const loadingCards: MetricCardData[] = [
  {
    title: "총 배출량",
    icon: "CO",
    value: "Loading...",
    unit: "tCO2e",
    detail: "데이터를 불러오는 중입니다",
  },
  {
    title: "당월 배출량",
    icon: "MO",
    value: "Loading...",
    unit: "tCO2e",
    detail: "데이터를 불러오는 중입니다",
  },
  {
    title: "배출량이 가장 높은 제품",
    icon: "PC",
    value: "Loading...",
    detail: "데이터를 불러오는 중입니다",
  },
  {
    title: "제품 개수",
    icon: "PR",
    value: "Loading...",
    unit: "개",
    detail: "데이터를 불러오는 중입니다",
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

export function MetricsGrid({ companyId }: MetricsGridProps) {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams();
    if (companyId) params.set("companyId", companyId);

    async function loadCompanyInfo() {
      try {
        const response = await fetch(`/api/company-info?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message ?? "회사 정보를 불러오지 못했습니다");
        }

        setCompanyInfo(data);
        setErrorMessage(null);
      } catch (error) {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "회사 정보를 불러오지 못했습니다",
        );
      }
    }

    void loadCompanyInfo();

    return () => controller.abort();
  }, [companyId]);

  const metricCards = companyInfo ? getMetricCards(companyInfo) : loadingCards;

  return (
    <>
      {errorMessage ? (
        <div className="rounded-lg border border-(--error-container) bg-(--error-container) px-4 py-3 text-sm font-semibold text-(--on-error-container)">
          {errorMessage}
        </div>
      ) : null}
      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => (
          <MetricCard card={card} key={card.title} />
        ))}
      </section>
    </>
  );
}
