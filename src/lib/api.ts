export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

async function apiFetch<T>(path: string, options: { method?: HttpMethod; body?: any; headers?: Record<string, string> } = {}): Promise<T> {
  const { method = "GET", body, headers = {} } = options;
  const res = await fetch(`${API_BASE_URL}${path}`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      credentials: "include",
    }
  );
  if (!res.ok) {
    let message = `Request failed: ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) message = data.error;
    } catch {}
    throw new Error(message);
  }
  return res.json() as Promise<T>;
}

export const api = {
  // Auth
  register: (payload: { name: string; email: string; password: string; role?: "admin" | "customer" }) =>
    apiFetch<{ user: any; token: string }>(`/auth/register`, { method: "POST", body: payload }),
  login: (payload: { email: string; password: string }) =>
    apiFetch<{ user: any; token: string }>(`/auth/login`, { method: "POST", body: payload }),
  logout: () => apiFetch<{ ok: boolean }>(`/auth/logout`, { method: "POST" }),

  // Products
  getProducts: (params?: { q?: string; category?: string; minPrice?: number; maxPrice?: number }) => {
    const sp = new URLSearchParams();
    if (params?.q) sp.set("q", params.q);
    if (params?.category) sp.set("category", params.category);
    if (params?.minPrice != null) sp.set("minPrice", String(params.minPrice));
    if (params?.maxPrice != null) sp.set("maxPrice", String(params.maxPrice));
    const qs = sp.toString();
    return apiFetch<{ products: any[] }>(`/products${qs ? `?${qs}` : ""}`);
  },
  getProduct: (id: string) => apiFetch<{ product: any }>(`/products/${id}`),
  createProduct: (data: any) => apiFetch<{ product: any }>(`/products`, { method: "POST", body: data }),
  updateProduct: (id: string, data: any) => apiFetch<{ product: any }>(`/products/${id}`, { method: "PUT", body: data }),
  deleteProduct: (id: string) => apiFetch<{ ok: boolean }>(`/products/${id}`, { method: "DELETE" }),

  // Orders
  createOrder: (payload: { items: { productId: string; quantity: number }[]; delivery: any }) =>
    apiFetch<{ order: any }>(`/orders`, { method: "POST", body: payload }),
  getMyOrders: () => apiFetch<{ orders: any[] }>(`/orders/me`),
};

