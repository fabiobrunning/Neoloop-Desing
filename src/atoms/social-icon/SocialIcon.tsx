import * as React from "react";
import { cn } from "../../lib/utils";
import type { SocialName, SocialVariant } from "../../assets/logos";

export interface SocialIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name: SocialName;
  variant?: SocialVariant;
  size?: number;
}

const SocialIcon = React.forwardRef<HTMLImageElement, SocialIconProps>(
  ({ name, variant = "color", size = 24, className, alt, ...props }, ref) => {
    const src = new URL(
      `../../assets/logos/social/${variant}/${name}.svg`,
      import.meta.url,
    ).href;

    return (
      <img
        ref={ref}
        src={src}
        alt={alt || name}
        width={size}
        height={size}
        className={cn("inline-block", className)}
        {...props}
      />
    );
  },
);
SocialIcon.displayName = "SocialIcon";

export { SocialIcon };
