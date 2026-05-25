import type { GhgEmission } from "./ghg-emission";

export type Company = {
  id: string;
  name: string;
  country: string;
  emissions: GhgEmission[];
};
