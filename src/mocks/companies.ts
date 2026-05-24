import type { Company } from "@/types/company";

export const mockCompanies: Company[] = [
  {
    id: "company-001",
    name: "Hanaloop Materials",
    country: "KR",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "On-site fuel combustion",
        scope: "scope1",
        emissions: 1180,
      },
      {
        yearMonth: "2024-01",
        source: "Purchased electricity",
        scope: "scope2",
        emissions: 2640,
      },
      {
        yearMonth: "2024-01",
        source: "Supplier logistics",
        scope: "scope3",
        emissions: 3920,
      },
      {
        yearMonth: "2024-02",
        source: "On-site fuel combustion",
        scope: "scope1",
        emissions: 1120,
      },
      {
        yearMonth: "2024-02",
        source: "Purchased electricity",
        scope: "scope2",
        emissions: 2510,
      },
      {
        yearMonth: "2024-02",
        source: "Supplier logistics",
        scope: "scope3",
        emissions: 3760,
      },
    ],
  },
  {
    id: "company-002",
    name: "GreenFreight Systems",
    country: "US",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "Fleet fuel",
        scope: "scope1",
        emissions: 1840,
      },
      {
        yearMonth: "2024-01",
        source: "Warehouse electricity",
        scope: "scope2",
        emissions: 980,
      },
      {
        yearMonth: "2024-01",
        source: "Vehicle manufacturing",
        scope: "scope3",
        emissions: 2260,
      },
      {
        yearMonth: "2024-02",
        source: "Fleet fuel",
        scope: "scope1",
        emissions: 1710,
      },
      {
        yearMonth: "2024-02",
        source: "Warehouse electricity",
        scope: "scope2",
        emissions: 940,
      },
      {
        yearMonth: "2024-02",
        source: "Vehicle manufacturing",
        scope: "scope3",
        emissions: 2180,
      },
    ],
  },
  {
    id: "company-003",
    name: "EcoForge Electronics",
    country: "DE",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "Process gas",
        scope: "scope1",
        emissions: 620,
      },
      {
        yearMonth: "2024-01",
        source: "Purchased electricity",
        scope: "scope2",
        emissions: 3120,
      },
      {
        yearMonth: "2024-01",
        source: "Component supply chain",
        scope: "scope3",
        emissions: 4870,
      },
      {
        yearMonth: "2024-02",
        source: "Process gas",
        scope: "scope1",
        emissions: 590,
      },
      {
        yearMonth: "2024-02",
        source: "Purchased electricity",
        scope: "scope2",
        emissions: 2990,
      },
      {
        yearMonth: "2024-02",
        source: "Component supply chain",
        scope: "scope3",
        emissions: 4610,
      },
    ],
  },
];
