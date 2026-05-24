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
