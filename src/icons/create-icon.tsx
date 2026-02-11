import * as React from "react";

export interface IconComponentProps extends React.SVGAttributes<SVGSVGElement> {
  /** Pixel size (width & height) */
  size?: number | string;
}

/**
 * Factory to create an icon component from raw SVG children.
 * All icons use 24x24 viewBox, stroke-based, with `currentColor`.
 */
export function createIcon(
  displayName: string,
  children: React.ReactNode,
  { viewBox = "0 0 24 24", fill = "none" }: { viewBox?: string; fill?: string } = {},
) {
  const Component = React.forwardRef<SVGSVGElement, IconComponentProps>(
    ({ size = 24, className, ...props }, ref) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox={viewBox}
        fill={fill}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        {...props}
      >
        {children}
      </svg>
    ),
  );

  Component.displayName = displayName;
  return Component;
}
