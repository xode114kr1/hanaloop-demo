import type { Company } from "@/types/company";

export const mockCompanies: Company[] = [
  {
    id: "company-001",
    name: "Hanaloop Materials",
    country: "KR",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "사업장 연료 연소",
        scope: "scope1",
        emissions: 1180,
      },
      {
        yearMonth: "2024-01",
        source: "구매 전력",
        scope: "scope2",
        emissions: 2640,
      },
      {
        yearMonth: "2024-01",
        source: "협력사 물류",
        scope: "scope3",
        emissions: 3920,
      },
      {
        yearMonth: "2024-02",
        source: "사업장 연료 연소",
        scope: "scope1",
        emissions: 1120,
      },
      {
        yearMonth: "2024-02",
        source: "구매 전력",
        scope: "scope2",
        emissions: 2510,
      },
      {
        yearMonth: "2024-02",
        source: "협력사 물류",
        scope: "scope3",
        emissions: 3760,
      },
    ],
  },
  {
    id: "company-002",
    name: "GreenFreight Systems",
    country: "KR",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "운송 차량 연료",
        scope: "scope1",
        emissions: 1840,
      },
      {
        yearMonth: "2024-01",
        source: "물류센터 전력",
        scope: "scope2",
        emissions: 980,
      },
      {
        yearMonth: "2024-01",
        source: "차량 제조",
        scope: "scope3",
        emissions: 2260,
      },
      {
        yearMonth: "2024-02",
        source: "운송 차량 연료",
        scope: "scope1",
        emissions: 1710,
      },
      {
        yearMonth: "2024-02",
        source: "물류센터 전력",
        scope: "scope2",
        emissions: 940,
      },
      {
        yearMonth: "2024-02",
        source: "차량 제조",
        scope: "scope3",
        emissions: 2180,
      },
    ],
  },
  {
    id: "company-003",
    name: "EcoForge Electronics",
    country: "KR",
    emissions: [
      {
        yearMonth: "2024-01",
        source: "공정 가스",
        scope: "scope1",
        emissions: 620,
      },
      {
        yearMonth: "2024-01",
        source: "구매 전력",
        scope: "scope2",
        emissions: 3120,
      },
      {
        yearMonth: "2024-01",
        source: "부품 공급망",
        scope: "scope3",
        emissions: 4870,
      },
      {
        yearMonth: "2024-02",
        source: "공정 가스",
        scope: "scope1",
        emissions: 590,
      },
      {
        yearMonth: "2024-02",
        source: "구매 전력",
        scope: "scope2",
        emissions: 2990,
      },
      {
        yearMonth: "2024-02",
        source: "부품 공급망",
        scope: "scope3",
        emissions: 4610,
      },
    ],
  },
];
