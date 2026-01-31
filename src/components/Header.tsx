import { Moon, Sun } from "lucide-react";
import useTheme from "../hooks/UseTheme";

export default function Header() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo / Icons */}
        <div className="flex items-center gap-2 text-2xl">
          <span>📊</span>
          <span>💸</span>
        </div>

        {/* Center: Title */}
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">
          Finance Tracker
        </h1>

        {/* Right: Actions */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:scale-105 transition"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
}
