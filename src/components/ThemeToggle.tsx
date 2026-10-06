"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10" />; // Placeholder
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="p-2 rounded-full hover:bg-node-gray/10 transition-colors relative flex items-center justify-center text-black dark:text-white"
      aria-label="Toggle theme"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 text-yellow-400 animate-in spin-in-12 duration-500" />
      ) : (
        <Moon className="w-5 h-5 text-[#865e9c] animate-in spin-in-12 duration-500" />
      )}
    </button>
  );
}
