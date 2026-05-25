import type { Post } from "@/types/post";

export const mockPosts: Post[] = [
  {
    id: "post-001",
    title: "CBAM reporting scope expanded for EU exports",
    resourceUid: "company-001",
    dateTime: "2024-03-12T09:30:00.000Z",
    content:
      "Hanaloop Materials will include supplier-level emissions evidence for all EU-bound shipments in the next reporting cycle.",
  },
  {
    id: "post-002",
    title: "Renewable electricity contract renewed",
    resourceUid: "company-001",
    dateTime: "2024-03-08T14:00:00.000Z",
    content:
      "The company renewed a long-term renewable electricity agreement covering core manufacturing facilities in Korea.",
  },
  {
    id: "post-003",
    title: "Electric fleet transition milestone reached",
    resourceUid: "company-002",
    dateTime: "2024-03-04T11:20:00.000Z",
    content:
      "GreenFreight Systems converted 42 percent of regional delivery vehicles to electric models during the first quarter.",
  },
  {
    id: "post-004",
    title: "Supplier audit identifies Scope 3 reduction plan",
    resourceUid: "company-003",
    dateTime: "2024-02-27T16:10:00.000Z",
    content:
      "EcoForge Electronics completed supplier audits and identified priority actions for component sourcing emissions reduction.",
  },
];
