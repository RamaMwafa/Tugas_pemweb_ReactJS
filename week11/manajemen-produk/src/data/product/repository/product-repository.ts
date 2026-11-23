import type { Product, ProductPayload } from "../model/product.model";
import { productSource } from "../source/product.source";

function extractData(raw: unknown): unknown {
  if (typeof raw === "object" && raw !== null && "data" in raw) {
    return (raw as { data: unknown }).data;
  }
  return raw;
}

function mapToProduct(item: unknown): Product {
  const obj = item as Record<string, unknown>;
  return {
    id: Number(obj.id),
    name: String(obj.name ?? obj.nama ?? ""),
    price: Number(obj.price ?? obj.harga ?? 0),
    description: typeof obj.description === "string" ? obj.description : undefined,
  };
}

export const productRepository = {
  async getProducts(): Promise<Product[]> {
    const raw = await productSource.fetchAll();
    const extracted = extractData(raw);
    if (!Array.isArray(extracted)) return [];
    return extracted.map(mapToProduct);
  },

  async getProductById(id: number | string): Promise<Product | null> {
    const raw = await productSource.fetchById(id);
    const extracted = extractData(raw);
    if (!extracted || typeof extracted !== "object") return null;
    return mapToProduct(extracted);
  },

  async createProduct(payload: ProductPayload): Promise<Product> {
    const raw = await productSource.create(payload);
    const extracted = extractData(raw);
    return mapToProduct(extracted);
  },

  async updateProduct(id: number | string, payload: ProductPayload): Promise<Product> {
    const raw = await productSource.update(id, payload);
    const extracted = extractData(raw);
    return mapToProduct(extracted);
  },

  async deleteProduct(id: number | string): Promise<void> {
    await productSource.remove(id);
  },
};