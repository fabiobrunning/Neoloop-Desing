/**
 * Synkra DS - Logo & Brand Icon Registry
 * Social media and payment method logos in SVG format
 */

export const socialLogos = [
  "Discord",
  "Facebook",
  "GitHub",
  "Google",
  "Instagram",
  "LinkedIn",
  "Messenger",
  "MidJourney",
  "OpenAI",
  "Pinterest",
  "Reddit",
  "Skype",
  "Snapchat",
  "SoundCloud",
  "Spotify",
  "Steam",
  "TeamViewer",
  "Telegram",
  "Threads",
  "TikTok",
  "Tinder",
  "Trello",
  "Tumblr",
  "Twitch",
  "Vine",
  "WhatsApp",
  "X",
  "YouTube",
] as const;

export const paymentLogos = [
  "AMEX",
  "Alipay",
  "Amazon",
  "ApplePay",
  "Bitcoin",
  "Etherium",
  "GooglePay",
  "Maestro",
  "Mastercard",
  "PayPal",
  "Stripe",
  "Visa",
] as const;

export type SocialLogoName = (typeof socialLogos)[number];
export type PaymentLogoName = (typeof paymentLogos)[number];
export type LogoVariant = "color" | "white" | "black";

/**
 * Get the path to a social media logo SVG
 * @param name - Logo name (e.g., "Discord", "GitHub")
 * @param variant - Color variant: "color", "white", or "black"
 */
export function getSocialLogoPath(
  name: SocialLogoName,
  variant: LogoVariant = "color",
): string {
  return `@synkra-ds/assets/logos/social/${variant}/${name}.svg`;
}

/**
 * Get the path to a payment method logo SVG
 * @param name - Payment method (e.g., "Visa", "Mastercard")
 */
export function getPaymentLogoPath(name: PaymentLogoName): string {
  return `@synkra-ds/assets/logos/payment/Size=large, Payment method=${name}.svg`;
}
