"use client";

import * as React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { cn } from "../lib/utils";

const CYCLE: Array<"system" | "light" | "dark"> = ["system", "light", "dark"];

const LABELS: Record<string, string> = {
  system: "System theme",
  light: "Light theme",
  dark: "Dark theme",
};

const ICONS: Record<string, typeof Sun> = {
  system: Monitor,
  light: Sun,
  dark: Moon,
};

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  const next = () => {
    const idx = CYCLE.indexOf(theme);
    setTheme(CYCLE[(idx + 1) % CYCLE.length]);
  };

  const Icon = ICONS[theme];
  const label = LABELS[theme];

  return (
    <button
      type="button"
      onClick={next}
      aria-label={label}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md",
        "text-text-secondary bg-transparent",
        "hover:bg-border-subtle hover:text-text-primary",
        "active:bg-border",
        "transition-colors duration-fast ease-in-out",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        className,
      )}
    >
      <Icon size={20} />
    </button>
  );
}
