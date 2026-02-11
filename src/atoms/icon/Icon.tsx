import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { iconRegistry, type IconName } from "../../icons";

const iconVariants = cva("shrink-0", {
  variants: {
    size: {
      xs: "h-3 w-3",
      sm: "h-4 w-4",
      md: "h-5 w-5",
      lg: "h-6 w-6",
      xl: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

/** Numeric pixel values for each size preset */
const sizeMap = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
} as const;

export type { IconName };

export interface IconProps
  extends Omit<React.SVGAttributes<SVGSVGElement>, "name">,
    VariantProps<typeof iconVariants> {
  /** Name of a registered icon (e.g. "House", "Settings", "User") */
  name: IconName;
  /** Size preset from the design system */
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Accessible label. If omitted, the icon is treated as decorative (aria-hidden). */
  label?: string;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = "md", label, className, ...props }, ref) => {
    const IconComponent = iconRegistry[name];

    if (!IconComponent) {
      return null;
    }

    return (
      <IconComponent
        ref={ref}
        size={sizeMap[size]}
        className={cn(iconVariants({ size, className }))}
        aria-hidden={label ? undefined : true}
        aria-label={label}
        role={label ? "img" : undefined}
        {...props}
      />
    );
  },
);

Icon.displayName = "Icon";

export { Icon, iconVariants };
