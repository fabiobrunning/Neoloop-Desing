import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "../../lib/utils";

/* ── Tabs Root ────────────────────────────────────────────────────────── */

const Tabs = TabsPrimitive.Root;

/* ── TabsList ─────────────────────────────────────────────────────────── */

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center gap-1 rounded-md",
      "bg-bg-surface p-1 text-text-muted",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

/* ── TabsTrigger ──────────────────────────────────────────────────────── */

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm",
      "px-3 py-1.5 text-sm font-medium transition-all duration-fast",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      "disabled:pointer-events-none disabled:opacity-50",
      "data-[state=active]:bg-bg-elevated data-[state=active]:text-text-primary",
      "data-[state=active]:shadow-sm",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

/* ── TabsContent ──────────────────────────────────────────────────────── */

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 rounded-md p-4",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
