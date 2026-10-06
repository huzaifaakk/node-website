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
    <div className="min-h-screen bg-page-bg flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-card p-10 border border-node-gray/20 rounded-2xl shadow-xl flex flex-col items-center">
        <h1 className="font-serif text-5xl text-node-purple tracking-tighter mb-2">Node.</h1>
        <p className="font-sans text-sm text-node-gray tracking-widest uppercase mb-10">Admin Dashboard</p>

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-sans text-node-gray uppercase tracking-widest font-bold">Email</label>
            <input 
              name="email"
              type="email" 
              required
              defaultValue="admin@thenodecafe.com"
              className="w-full p-4 bg-page-bg border border-node-gray/20 rounded-lg text-text-main focus:outline-none focus:border-node-purple transition-colors"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-sans text-node-gray uppercase tracking-widest font-bold">Password</label>
            <input 
              name="password"
              type="password" 
              required
              defaultValue="admin123"
              className="w-full p-4 bg-page-bg border border-node-gray/20 rounded-lg text-text-main focus:outline-none focus:border-node-purple transition-colors"
            />
          </div>

          {error && <p className="text-node-purple text-sm text-center font-bold">{error}</p>}

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 py-4 bg-node-purple text-white font-sans uppercase tracking-[0.2em] text-xs font-bold hover:bg-node-dark transition-all duration-300 rounded-lg shadow-[0_0_15px_rgba(134,94,156,0.3)] disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Login to Dashboard"}
          </button>
        </form>
      </div>
    </div>
  );
}
