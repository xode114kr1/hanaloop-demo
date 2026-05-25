"use client";

import { useMemo, useState } from "react";
import type { Product, ProductPcf } from "@/types/product";

type LifecycleSectionProps = {
  productPcfs: ProductPcf[];
  products: Product[];
};

function getStageIcon(stageName: string) {
  return stageName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getStageShare(emissions: number, totalEmissions: number) {
  if (totalEmissions === 0) return 0;

  return (Math.abs(emissions) / totalEmissions) * 100;
}

export function LifecycleSection({
  productPcfs,
  products,
}: LifecycleSectionProps) {
  const [selectedProductId, setSelectedProductId] = useState(
    () => products[0]?.id ?? "",
  );
  const activeProductId = products.some(
    (product) => product.id === selectedProductId,
  )
    ? selectedProductId
    : (products[0]?.id ?? "");

  const selectedProduct = products.find(
    (product) => product.id === activeProductId,
  );
  const lifecycleStages = useMemo(
    () =>
      productPcfs
        .filter((pcf) => pcf.productId === activeProductId)
        .sort((left, right) => left.stageOrder - right.stageOrder),
    [activeProductId, productPcfs],
  );
  const lifecycleTotalEmissions = lifecycleStages.reduce(
    (sum, stage) => sum + Math.abs(stage.emissions),
    0,
  );

  return (
    <section className="dashboard-card overflow-hidden p-(--space-md)">
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-(--on-surface)">
            PCF Lifecycle Analysis
          </h2>
          <p className="mt-1 text-sm text-(--on-surface-variant)">
            Product Carbon Footprint breakdown by stage
          </p>
        </div>
        <label className="flex w-full flex-col gap-2 sm:w-70">
          <span className="text-tiny font-bold uppercase text-(--outline)">
            Product
          </span>
          <select
            className="h-11 w-full rounded-lg border border-(--outline-variant) bg-(--surface-container-lowest) px-3 text-sm font-semibold text-(--on-surface) outline-none transition focus:border-(--primary-container) focus:shadow-(--focus-ring)"
            disabled={products.length === 0}
            onChange={(event) => setSelectedProductId(event.target.value)}
            value={activeProductId}
          >
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border border-(--outline-variant) p-5 text-sm font-semibold text-(--on-surface-variant)">
          No products available for this company
        </div>
      ) : lifecycleStages.length === 0 ? (
        <div className="rounded-lg border border-(--outline-variant) p-5 text-sm font-semibold text-(--on-surface-variant)">
          No PCF lifecycle data available for {selectedProduct?.name}
        </div>
      ) : (
        <div className="custom-scrollbar flex snap-x gap-6 overflow-x-auto pb-4">
          {lifecycleStages.map((stage) => {
            const stageShare = getStageShare(
              stage.emissions,
              lifecycleTotalEmissions,
            );

            return (
              <article
                className="min-w-70 snap-start rounded-xl border border-(--outline-variant) bg-white p-4 transition hover:border-(--primary-container)"
                key={stage.id}
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-(--surface-container-low) text-xs font-bold text-(--primary)">
                    {getStageIcon(stage.stageName)}
                  </span>
                  <div>
                    <span className="text-tiny font-bold uppercase text-(--outline)">
                      Stage {stage.stageOrder.toString().padStart(2, "0")}
                    </span>
                    <h3 className="font-bold text-(--on-surface)">
                      {stage.stageName}
                    </h3>
                  </div>
                </div>
                <div className="mb-4 rounded-lg bg-(--surface-container-low) p-3">
                  <div className="mb-2 flex items-center justify-between gap-3 text-sm font-bold text-(--on-surface)">
                    <span>{stage.emissions.toLocaleString()} kg CO2e</span>
                    <span className="text-xs text-(--primary)">
                      {stageShare.toFixed(1)}%
                    </span>
                  </div>
                  <div
                    aria-label={`${stage.stageName} contribution ${stageShare.toFixed(1)}%`}
                    aria-valuemax={100}
                    aria-valuemin={0}
                    aria-valuenow={Number(stageShare.toFixed(1))}
                    className="h-2 overflow-hidden rounded-full bg-(--surface-container-highest)"
                    role="progressbar"
                  >
                    <div
                      className={`h-full rounded-full ${
                        stage.emissions < 0
                          ? "bg-(--tertiary-container)"
                          : "bg-(--primary-container)"
                      }`}
                      style={{ width: `${stageShare}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-(--on-surface-variant)">
                  {stage.description}
                </p>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
