"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DashboardErrorState } from "@/features/dashboard-error-state/DashboardErrorState";
import type { EmissionsChartData } from "@/lib/api";

type ChartPeriod = "monthly" | "yearly";
type ChartScope = "all" | "scope1" | "scope2" | "scope3";

type EmissionsChartProps = {
  companyId?: string;
};

const periodOptions: { label: string; value: ChartPeriod }[] = [
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

const scopeOptions: { label: string; value: ChartScope }[] = [
  { label: "All", value: "all" },
  { label: "Scope 1", value: "scope1" },
  { label: "Scope 2", value: "scope2" },
  { label: "Scope 3", value: "scope3" },
];

const scopeLabels: Record<Exclude<ChartScope, "all">, string> = {
  scope1: "Scope 1",
  scope2: "Scope 2",
  scope3: "Scope 3",
};

const scopeColors: Record<Exclude<ChartScope, "all">, string> = {
  scope1: "var(--primary-container)",
  scope2: "var(--secondary)",
  scope3: "var(--tertiary-container)",
};

function getVisibleScopes(scope: ChartScope): Exclude<ChartScope, "all">[] {
  if (scope === "all") return ["scope1", "scope2", "scope3"];

  return [scope];
}

export function EmissionsChart({ companyId }: EmissionsChartProps) {
  const [period, setPeriod] = useState<ChartPeriod>("monthly");
  const [scope, setScope] = useState<ChartScope>("all");
  const [chartData, setChartData] = useState<EmissionsChartData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!companyId) return;

    const controller = new AbortController();
    const params = new URLSearchParams({ companyId, period, scope });

    async function loadEmissionsChart() {
      setIsLoading(true);
      setErrorMessage(null);

      try {
        const response = await fetch(`/api/emissions-chart?${params}`, {
          signal: controller.signal,
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message ?? "배출량 차트를 불러오지 못했습니다");
        }

        setChartData(data);
        setErrorMessage(null);
      } catch (error) {
        if (controller.signal.aborted) return;

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "배출량 차트를 불러오지 못했습니다",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadEmissionsChart();

    return () => controller.abort();
  }, [companyId, period, retryCount, scope]);

  const visibleScopes = useMemo(() => getVisibleScopes(scope), [scope]);
  const visibleChartData = companyId ? chartData : null;
  const visibleErrorMessage = companyId ? errorMessage : null;
  const visibleIsLoading = companyId ? isLoading : false;
  const selectedTotal = visibleChartData?.total ?? 0;
  const points = visibleChartData?.data ?? [];

  return (
    <article
      className="dashboard-card scroll-mt-24 p-(--space-md) xl:col-span-8"
      id="ghg-emissions"
    >
      <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-start">
        <div>
          <h2 className="text-2xl font-semibold text-(--on-surface)">
            GHG Emissions Overview
          </h2>
          <p className="mt-1 text-sm text-(--on-surface-variant)">
            {visibleIsLoading
              ? "Loading emissions data..."
              : `${selectedTotal.toLocaleString()} tCO2e across selected boundaries`}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <div className="flex w-fit rounded-lg bg-(--surface-container-low) p-1">
            {periodOptions.map((item) => (
              <button
                aria-pressed={period === item.value}
                className={`rounded-md px-4 py-2 text-xs font-bold transition ${
                  period === item.value
                    ? "bg-white text-(--primary) shadow-sm"
                    : "text-(--on-surface-variant) hover:bg-white/60"
                }`}
                key={item.value}
                onClick={() => setPeriod(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex max-w-full flex-wrap gap-2">
            {scopeOptions.map((item) => (
              <button
                aria-pressed={scope === item.value}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition ${
                  scope === item.value
                    ? "border-(--primary-container) bg-(--primary-container)/10 text-(--on-primary-container)"
                    : "border-(--outline-variant) text-(--on-surface-variant) hover:border-(--primary-container)"
                }`}
                key={item.value}
                onClick={() => setScope(item.value)}
                type="button"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="h-75">
        {visibleErrorMessage ? (
          <DashboardErrorState
            message={visibleErrorMessage}
            onRetry={() => setRetryCount((count) => count + 1)}
            title="배출량 차트를 불러오지 못했습니다"
          />
        ) : !visibleIsLoading && points.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm font-semibold text-(--on-surface-variant)">
            No emissions data available
          </div>
        ) : (
          <div className={visibleIsLoading ? "h-full opacity-45" : "h-full"}>
            <ResponsiveContainer height="100%" width="100%">
              <BarChart
                accessibilityLayer
                data={points}
                margin={{ bottom: 0, left: -16, right: 4, top: 8 }}
              >
                <CartesianGrid
                  stroke="var(--outline-variant)"
                  strokeDasharray="3 3"
                  vertical={false}
                />
                <XAxis
                  axisLine={false}
                  dataKey="label"
                  tick={{ fill: "var(--on-surface-variant)", fontSize: 12 }}
                  tickLine={false}
                />
                <YAxis
                  axisLine={false}
                  tick={{ fill: "var(--on-surface-variant)", fontSize: 12 }}
                  tickFormatter={(value: number) => value.toLocaleString()}
                  tickLine={false}
                  width={64}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--surface-container-lowest)",
                    border: "1px solid var(--outline-variant)",
                    borderRadius: "var(--radius-base)",
                    boxShadow: "var(--shadow-overlay)",
                  }}
                  cursor={{ fill: "rgb(0 184 148 / 8%)" }}
                  formatter={(value, name) => {
                    const scopeName = name as Exclude<ChartScope, "all">;
                    const emissionsValue = Number(value ?? 0);

                    return [
                      `${emissionsValue.toLocaleString()} tCO2e`,
                      scopeLabels[scopeName],
                    ];
                  }}
                  labelStyle={{
                    color: "var(--on-surface)",
                    fontWeight: 700,
                  }}
                />
                <Legend
                  formatter={(value) =>
                    scopeLabels[value as Exclude<ChartScope, "all">]
                  }
                  iconType="circle"
                  wrapperStyle={{
                    color: "var(--on-surface-variant)",
                    fontSize: 12,
                    fontWeight: 700,
                    paddingTop: 16,
                  }}
                />
                {visibleScopes.map((visibleScope) => (
                  <Bar
                    dataKey={visibleScope}
                    fill={scopeColors[visibleScope]}
                    key={visibleScope}
                    name={visibleScope}
                    radius={0}
                    stackId={scope === "all" ? "emissions" : undefined}
                  />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap gap-6 border-t border-(--outline-variant) pt-6">
        {visibleScopes.map((visibleScope) => (
          <div
            className="flex items-center gap-2 text-sm font-semibold"
            key={visibleScope}
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ background: scopeColors[visibleScope] }}
            />
            {scopeLabels[visibleScope]}
          </div>
        ))}
      </div>
    </article>
  );
}
