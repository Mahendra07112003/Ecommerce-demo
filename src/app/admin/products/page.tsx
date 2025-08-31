"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/redux/hooks";
import { api } from "@/lib/api";

export default function AdminProductsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const [items, setItems] = useState<any[]>([]);
  const [form, setForm] = useState({ title: "", price: 0, imageUrl: "", category: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | undefined>();

  const canAccess = user?.role === "admin";

  useEffect(() => {
    api.getProducts().then((res) => setItems(res.products));
  }, []);

  if (!canAccess) return <div className="text-center py-20">Admin only</div>;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await api.updateProduct(editingId, form);
        setItems((arr) => arr.map((p) => ((p as any)._id === editingId ? res.product : p)));
        setEditingId(null);
      } else {
        const res = await api.createProduct(form);
        setItems((arr) => [res.product, ...arr]);
      }
      setForm({ title: "", price: 0, imageUrl: "", category: "", description: "" });
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onEdit = (p: any) => {
    setEditingId(p._id);
    setForm({ title: p.title, price: p.price, imageUrl: p.imageUrl, category: p.category, description: p.description });
  };

  const onDelete = async (id: string) => {
    await api.deleteProduct(id);
    setItems((arr) => arr.filter((p) => (p as any)._id !== id));
  };

  return (
    <div className="grid gap-6">
      <div className="bg-white rounded-md border p-4">
        <h2 className="font-semibold mb-3">{editingId ? "Edit Product" : "Add Product"}</h2>
        {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <input className="border rounded px-3 py-2" type="number" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: Number(e.target.value) })} />
          <input className="border rounded px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Image URL" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} />
          <textarea className="md:col-span-2 border rounded px-3 py-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="md:col-span-2 flex gap-2">
            <button className="rounded-md text-white px-4 py-2" style={{ backgroundColor: "var(--primary-dark)" }}>{editingId ? "Update" : "Create"}</button>
            {editingId && (
              <button type="button" onClick={() => setEditingId(null)} className="border rounded-md px-4 py-2">Cancel</button>
            )}
          </div>
        </form>
      </div>

      <div className="grid gap-3">
        {items.map((p) => (
          <div key={(p as any)._id} className="bg-white rounded-md border p-3 flex items-center justify-between">
            <div>
              <div className="font-semibold">{p.title}</div>
              <div className="text-sm text-gray-600">${p.price} · {p.category}</div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(p)} className="border rounded-md px-3 py-1">Edit</button>
              <button onClick={() => onDelete((p as any)._id)} className="border rounded-md px-3 py-1 text-red-600">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

