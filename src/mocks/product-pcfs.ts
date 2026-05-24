import type { ProductPcf } from "@/types/product";

export const mockProductPcfs: ProductPcf[] = [
  {
    id: "pcf-001",
    productId: "product-001",
    stageName: "Raw Material",
    stageOrder: 1,
    emissions: 12.4,
    description:
      "Recycled aluminum sourcing and primary material preparation.",
  },
  {
    id: "pcf-002",
    productId: "product-001",
    stageName: "Manufacturing",
    stageOrder: 2,
    emissions: 28.1,
    description:
      "Panel forming, cutting, and finishing in renewable-powered facilities.",
  },
  {
    id: "pcf-003",
    productId: "product-001",
    stageName: "Packaging",
    stageOrder: 3,
    emissions: 3.2,
    description:
      "Recycled cardboard packaging and water-based print materials.",
  },
  {
    id: "pcf-004",
    productId: "product-001",
    stageName: "Transportation",
    stageOrder: 4,
    emissions: 15.7,
    description:
      "Regional freight delivery and maritime shipping allocation.",
  },
  {
    id: "pcf-005",
    productId: "product-001",
    stageName: "Use",
    stageOrder: 5,
    emissions: 8.4,
    description:
      "Estimated maintenance and operational impact during product use.",
  },
  {
    id: "pcf-006",
    productId: "product-001",
    stageName: "End of Life",
    stageOrder: 6,
    emissions: -4.1,
    description:
      "Take-back recycling program and recovered material credits.",
  },
  {
    id: "pcf-007",
    productId: "product-003",
    stageName: "Raw Material",
    stageOrder: 1,
    emissions: 18.8,
    description:
      "Battery materials, steel frame, and electronics sourcing.",
  },
  {
    id: "pcf-008",
    productId: "product-003",
    stageName: "Manufacturing",
    stageOrder: 2,
    emissions: 41.6,
    description:
      "Vehicle assembly, battery integration, and quality testing.",
  },
  {
    id: "pcf-009",
    productId: "product-003",
    stageName: "Transportation",
    stageOrder: 4,
    emissions: 12.9,
    description:
      "Distribution from assembly center to regional logistics hubs.",
  },
];
