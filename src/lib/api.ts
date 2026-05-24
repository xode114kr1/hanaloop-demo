import { mockCompanies } from "@/mocks/companies";
import { mockProductPcfs } from "@/mocks/product-pcfs";
import { mockProducts } from "@/mocks/products";
import { mockPosts } from "@/mocks/posts";
import type { Company } from "@/types/company";
import type { Post } from "@/types/post";
import type { Product, ProductPcf } from "@/types/product";

const _companies: Company[] = [...mockCompanies];
const _products: Product[] = [...mockProducts];
const _productPcfs: ProductPcf[] = [...mockProductPcfs];
let _posts: Post[] = [...mockPosts];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const jitter = () => 200 + Math.random() * 600;
const maybeFail = () => Math.random() < 0.15;

export type CompanyInfo = {
  companyId: string;
  companyName: string;
  totalEmissions: number;
  currentMonthEmissions: number;
  currentYearMonth: string | null;
  highestEmissionProduct: {
    id: string;
    name: string;
    emissions: number;
  } | null;
  productCount: number;
};

export async function fetchCompanies() {
  await delay(jitter());
  return [..._companies];
}

export async function fetchProducts() {
  await delay(jitter());
  return [..._products];
}

export async function fetchProductPcfs() {
  await delay(jitter());
  return [..._productPcfs];
}

export async function fetchPosts() {
  await delay(jitter());
  return [..._posts];
}

export async function fetchCompanyInfo(
  companyId = _companies[0]?.id ?? "",
): Promise<CompanyInfo> {
  await delay(jitter());

  const company = _companies.find((item) => item.id === companyId);
  if (!company) throw new Error("Company not found");

  const companyProducts = _products.filter(
    (product) => product.companyId === company.id,
  );
  const totalEmissions = company.emissions.reduce(
    (sum, emission) => sum + emission.emissions,
    0,
  );
  const currentYearMonth =
    company.emissions.map((emission) => emission.yearMonth).sort().at(-1) ??
    null;
  const currentMonthEmissions = company.emissions
    .filter((emission) => emission.yearMonth === currentYearMonth)
    .reduce((sum, emission) => sum + emission.emissions, 0);
  const highestEmissionProduct =
    companyProducts
      .map((product) => {
        const emissions = _productPcfs
          .filter((pcf) => pcf.productId === product.id)
          .reduce((sum, pcf) => sum + pcf.emissions, 0);

        return { id: product.id, name: product.name, emissions };
      })
      .sort((a, b) => b.emissions - a.emissions)[0] ?? null;

  return {
    companyId: company.id,
    companyName: company.name,
    totalEmissions,
    currentMonthEmissions,
    currentYearMonth,
    highestEmissionProduct,
    productCount: companyProducts.length,
  };
}

export async function createOrUpdatePost(p: Omit<Post, "id"> & { id?: string }) {
  await delay(jitter());
  if (maybeFail()) throw new Error("Save failed");

  if (p.id) {
    const updated = p as Post;
    _posts = _posts.map((post) => (post.id === updated.id ? updated : post));
    return updated;
  }

  const created = { ...p, id: crypto.randomUUID() };
  _posts = [..._posts, created];
  return created;
}
