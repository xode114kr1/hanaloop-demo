export type GhgScope = "scope1" | "scope2" | "scope3";

export type GhgEmission = {
  yearMonth: string;
  source: string;
  scope: GhgScope;
  emissions: number;
};
