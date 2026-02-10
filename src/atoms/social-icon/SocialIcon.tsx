import * as React from "react";
import { cn } from "../../lib/utils";

const SOCIAL_NETWORKS = [
  "Discord", "Facebook", "GitHub", "Google", "Instagram", "LinkedIn",
  "Messenger", "MidJourney", "OpenAI", "Pinterest", "Reddit", "Skype",
  "Snapchat", "SoundCloud", "Spotify", "Steam", "TeamViewer", "Telegram",
  "Threads", "TikTok", "Tinder", "Trello", "Tumblr", "Twitch",
  "Vine", "WhatsApp", "X", "YouTube",
] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];
export type SocialIconVariant = "colorida" | "black" | "white";

export interface SocialIconProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** Social network name */
  network: SocialNetwork;
  /** Icon variant: colorida (default), black, or white */
  variant?: SocialIconVariant;
  /** Size in pixels */
  size?: number;
}

const VARIANT_PATH: Record<SocialIconVariant, string> = {
  colorida: "Colorida",
  black: "black",
  white: "white",
};

function SocialIcon({
  network,
  variant = "colorida",
  size = 24,
  className,
  alt,
  ...props
}: SocialIconProps) {
  const folder = VARIANT_PATH[variant];
  const src = `/assets/Logos/social/${folder}/${network}.svg`;

  return (
    <img
      src={src}
      alt={alt ?? network}
      width={size}
      height={size}
      className={cn("inline-block shrink-0", className)}
      loading="lazy"
      {...props}
    />
  );
}

SocialIcon.displayName = "SocialIcon";

export { SocialIcon, SOCIAL_NETWORKS };
