"use client";

import { useState } from "react";
import { loginAdmin } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    const formData = new FormData(e.currentTarget);
    const result = await loginAdmin(formData);
    
    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-espresso flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-cream/5 backdrop-blur-md p-10 border border-cream/10 rounded-2xl shadow-2xl flex flex-col items-center">
        <h1 className="font-serif text-5xl text-latte tracking-tighter mb-2">Node.</h1>
        <p className="font-sans text-sm text-cream/50 tracking-widest uppercase mb-10">Admin Dashboard</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-sans text-cream/70 uppercase tracking-widest font-bold">Email</label>
            <input 
              name="email"
              type="email" 
              required
              defaultValue="admin@thenodecafe.com"
              className="w-full p-4 bg-transparent border border-cream/20 rounded-lg text-cream focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-sans text-cream/70 uppercase tracking-widest font-bold">Password</label>
            <input 
              name="password"
              type="password" 
              required
              defaultValue="admin123"
              className="w-full p-4 bg-transparent border border-cream/20 rounded-lg text-cream focus:outline-none focus:border-terracotta transition-colors"
            />
          </div>

          {error && <p className="text-terracotta text-sm text-center font-bold">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 bg-terracotta text-cream font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-cream hover:text-espresso transition-all duration-300 rounded-sm shadow-[0_0_15px_rgba(181,83,47,0.2)] disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
