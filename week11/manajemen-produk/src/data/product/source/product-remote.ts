import type { ProductPayload } from "../model/product.model";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";
const PRODUCTS_ENDPOINT = `${BASE_URL}/products`;

async function handleResponse(response: Response): Promise<unknown> {
  const json: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      typeof json === "object" &&
      json !== null &&
      "message" in json &&
      typeof (json as { message: unknown }).message === "string"
        ? (json as { message: string }).message
        : `Request gagal dengan status ${response.status}`;
    throw new Error(message);
  }

  return json;
}

export const productSource = {
  async fetchAll(): Promise<unknown> {
    const response = await fetch(PRODUCTS_ENDPOINT);
    return handleResponse(response);
  },

  async fetchById(id: number | string): Promise<unknown> {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`);
    return handleResponse(response);
  },

  async create(payload: ProductPayload): Promise<unknown> {
    const response = await fetch(PRODUCTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async update(id: number | string, payload: ProductPayload): Promise<unknown> {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return handleResponse(response);
  },

  async remove(id: number | string): Promise<unknown> {
    const response = await fetch(`${PRODUCTS_ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    return handleResponse(response);
  },
};