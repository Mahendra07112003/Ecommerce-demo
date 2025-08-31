"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { register } from "@/store/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector((s) => s.auth.status);
  const error = useAppSelector((s) => s.auth.error);
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const action = await dispatch(register({ name, email, password }));
    if (register.fulfilled.match(action)) router.push("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md border p-6">
      <h1 className="text-xl font-semibold mb-4">Register</h1>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input className="w-full border rounded px-3 py-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="w-full border rounded px-3 py-2" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button disabled={status === "loading"} className="rounded-md text-white px-4 py-2" style={{ backgroundColor: "var(--primary-dark)" }}>
          {status === "loading" ? "Creating account…" : "Register"}
        </button>
      </form>
    </div>
  );
}

