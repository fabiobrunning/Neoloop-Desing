export const socialNames = [
  "Discord", "Facebook", "GitHub", "Google", "Instagram", "LinkedIn",
  "Messenger", "MidJourney", "OpenAI", "Pinterest", "Reddit", "Skype",
  "Snapchat", "SoundCloud", "Spotify", "Steam", "TeamViewer", "Telegram",
  "Threads", "TikTok", "Tinder", "Trello", "Tumblr", "Twitch", "Vine",
  "WhatsApp", "X", "YouTube",
] as const;

export type SocialName = (typeof socialNames)[number];
export type SocialVariant = "black" | "color" | "white";

export const paymentNames = [
  "Alipay", "Amazon", "AMEX", "ApplePay", "Bitcoin", "Etherium",
  "GooglePay", "Maestro", "Mastercard", "PayPal", "Stripe", "Visa",
] as const;

export type PaymentName = (typeof paymentNames)[number];
