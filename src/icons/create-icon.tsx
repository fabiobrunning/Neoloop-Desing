import * as React from "react";
import { cn } from "../lib/utils";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  size?: number | string;
}

export function createIcon(
  displayName: string,
  path: React.ReactNode,
) {
  const Icon = React.forwardRef<SVGSVGElement, IconProps>(
    ({ size = 24, className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("shrink-0", className)}
        {...props}
      >
        {path}
      </svg>
    ),
  );
  Icon.displayName = displayName;
  return Icon;
}
