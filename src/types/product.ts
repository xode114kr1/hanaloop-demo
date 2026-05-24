export type Product = {
  id: string;
  companyId: string;
  name: string;
};

export type ProductPcf = {
  id: string;
  productId: string;
  stageName: string;
  stageOrder: number;
  emissions: number;
  description: string;
};
