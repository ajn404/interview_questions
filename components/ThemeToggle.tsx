"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ThemeType = "light" | "dark" | "system";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "flex w-16 h-8 p-1 rounded-full cursor-pointer transition-all duration-300 fixed right-4 top-4",
        isDark
          ? "bg-zinc-950 border border-zinc-800"
          : "bg-white border border-zinc-200",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      role="button"
      tabIndex={0}
    >
      <div className="flex justify-between items-center w-full">
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark
              ? "transform translate-x-0 bg-zinc-800"
              : "transform translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="w-4 h-4 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="w-4 h-4 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex justify-center items-center w-6 h-6 rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "transform -translate-x-8"
          )}
        >
          {isDark ? (
            <Sun className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="w-4 h-4 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}

export function ThemeSwitcher({
  value,
  onChange,
  defaultValue,
  className,
}: {
  value?: ThemeType;
  onChange?: (theme: ThemeType) => void;
  defaultValue?: ThemeType;
  className?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const themes = [
    {
      key: "system",
      icon: Monitor,
      label: "系统",
    },
    {
      key: "light",
      icon: Sun,
      label: "亮色",
    },
    {
      key: "dark",
      icon: Moon,
      label: "暗色",
    },
  ];

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = value || (theme as ThemeType) || "system";

  const handleThemeChange = (newTheme: ThemeType) => {
    setTheme(newTheme);
    if (onChange) {
      onChange(newTheme);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-8 rounded-full bg-background p-1 ring-1 ring-border",
        className
      )}
    >
      {themes.map(({ key, icon: Icon, label }) => {
        const isActive = currentTheme === key;

        return (
          <button
            type="button"
            key={key}
            className="relative h-6 w-6 rounded-full"
            onClick={() => handleThemeChange(key as ThemeType)}
            aria-label={label}
          >
            {isActive && (
              <motion.div
                layoutId="activeTheme"
                className="absolute inset-0 rounded-full bg-secondary"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <Icon
              className={cn(
                "relative m-auto h-4 w-4",
                isActive ? "text-foreground" : "text-muted-foreground"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}