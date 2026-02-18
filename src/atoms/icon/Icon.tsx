import * as React from "react";
import { iconRegistry, type IconName, type IconProps } from "../../icons";

export interface IconComponentProps extends IconProps {
  name: IconName;
}

const Icon = React.forwardRef<SVGSVGElement, IconComponentProps>(
  ({ name, ...props }, ref) => {
    const IconComp = iconRegistry[name];
    return <IconComp ref={ref} {...props} />;
  },
);
Icon.displayName = "Icon";

export { Icon };
