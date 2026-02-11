import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { cn } from "../../lib/utils";

export interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  /** Visual size */
  size?: "sm" | "md";
}

const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, size = "md", ...props }, ref) => (
  <SwitchPrimitive.Root
    className={cn(
      "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent",
      "transition-colors duration-fast ease-in-out",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-emphasis focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "data-[state=checked]:bg-active data-[state=unchecked]:bg-border",
      size === "sm" ? "h-5 w-9" : "h-6 w-11",
      className,
    )}
    ref={ref}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        "pointer-events-none block rounded-full bg-text-primary shadow-sm",
        "transition-transform duration-fast ease-in-out",
        size === "sm"
          ? "h-4 w-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          : "h-5 w-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0",
      )}
    />
  </SwitchPrimitive.Root>
));

Switch.displayName = "Switch";

export { Switch };
