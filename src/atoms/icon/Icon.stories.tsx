import React, { useState, useMemo } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Icon } from "./Icon";
import { iconRegistry, lineIconRegistry, solidIconRegistry } from "../../icons";

const meta: Meta<typeof Icon> = {
  title: "Atoms/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: { control: "select", options: Object.keys(iconRegistry) },
    size: { control: "number" },
  },
};
export default meta;

type Story = StoryObj<typeof Icon>;

export const Default: Story = { args: { name: "accessibility", size: 24 } };

/* ─────────────────────────────────────────────
 * Categories prioritized for web systems
 * ───────────────────────────────────────────── */

const categories: Record<string, string[]> = {
  "Navigation & Actions": [
    "arrow-up", "arrow-down-2", "arrow-round-left", "arrow-round-right",
    "arrow-expand", "arrow-shrink", "arrow-move", "arrow-reload-horizontal",
    "arrow-reload-vertical", "arrow-transfer-diagonal", "arrow-roadmap",
    "navigation-arrow-on", "navigation-arrow-off", "arrow-cursor", "arrow-cursor-2",
    "hand-cursor", "cursor-click", "expand", "expand-horizontal",
    "shrink-horizontal", "shuffle", "loop", "reorder", "sort-descending",
    "ascending-number-order", "descending-number-order",
    "check", "check-square", "add", "add-circle", "add-square",
    "subtract", "subtract-circle", "subtract-square", "delete",
    "permanently-delete", "sign-cross-square",
    "login", "logout", "return-2", "send", "import-input", "export-output",
    "download-box", "download-circle", "download-file", "download-computer",
    "upload-box", "upload-circle", "upload-file", "upload-computer",
    "copy-paste", "cut", "replace-all", "replace-text",
  ],
  "Interface & Layout": [
    "layout-window", "layout-window-2", "layout-window-8", "layout-window-11",
    "header", "footer", "header-footer", "split-horizontal", "split-vertical", "split-window",
    "horizontal-menu-circle", "categories", "widget", "dashboard-3", "dashboard-circle",
    "insert-side", "insert-top-left", "insert-top-right",
    "input-box", "horizontal-text-box", "vertical-text-box",
    "vertical-slider-square", "module-puzzle", "module-puzzle-3", "module-three",
    "browser-website", "browser-add", "browser-block", "browser-build",
    "browser-check", "browser-delete", "browser-hash", "browser-lock",
    "browser-multiple-window", "browser-remove", "browser-wifi",
    "minimize-window-2", "expand-window-2", "dark-dislay-mode",
    "orientation-landscape", "orientation-portrait",
  ],
  "Forms & Input": [
    "checklist-rule", "list-check", "list-add", "list-cross", "list-minus",
    "bullet-list", "list-1-to-9", "list-9-to", "list-a-to-z", "list-z-to-a",
    "task-list", "checkbox" as never, "select-circle-area",
    "spell-check", "text-style", "text-square", "text-speech",
    "paragraph", "underline-text", "word-count", "word-art",
    "heading-1-paragraph-styles-heading", "heading-2-paragraph-styles-heading",
    "heading-3-paragraph-styles-heading", "quotation-2",
    "scanner-bar-code", "qr-code", "magnifying-glass", "magnifying-glass-circle",
    "filter-2", "search-visual", "search-dollar",
    "calendar-add", "calendar-edit", "calendar-jump-to-date", "calendar-star",
    "blank-calendar", "waiting-appointments-calendar",
    "keyboard", "keyboard-virtual", "keyboard-wireless-2", "delete-keyboard",
  ],
  "Notifications & Feedback": [
    "ringing-bell-notification", "add-bell-notification", "block-bell-notification",
    "disable-bell-notification", "notification-alarm-2",
    "notification-application", "notification-application-2", "notification-message-alert",
    "information-circle", "help-question", "help-chat-2",
    "warning-triangle", "warning-octagon", "warning-off",
    "error-checking", "dangerous", "dangerous-zone-sign",
    "smiley-happy", "smiley-angry", "smiley-crying", "smiley-surprised",
    "smiley-cool", "smiley-cute", "smiley-sparks",
    "happy-face", "sad-face", "straight-face",
    "like", "heart", "disable-heart", "half-star", "star", "star-2",
  ],
  "User & Authentication": [
    "user-single-neutral-male", "user-circle-single", "user-group",
    "user-multiple-group", "user-multiple-circle",
    "user-add-plus", "user-remove-subtract", "user-check-validate",
    "user-identifier-card", "user-profile-focus", "user-protection-2",
    "user-speaking", "user-sync-online-in-person",
    "face-scan", "face-scan-circle", "fingerprint", "fingerprint-2",
    "voice-scan-2", "key", "keyhole-lock-circle",
    "padlock-square", "temporary-lock", "lock-rotation",
    "shield", "shield-2", "shield-check", "shield-cross",
    "incognito-mode", "invisible", "invisible-2", "visible", "eye-optic",
    "passport", "business-card", "business-user-curriculum",
  ],
  "Communication": [
    "mail", "mail-incoming", "mail-search", "mail-send-email-message",
    "mail-send-envelope", "mail-send-reply-all", "send-email",
    "chat-bubble-oval", "chat-bubble-oval-notification", "chat-bubble-oval-smiley",
    "chat-bubble-square-write", "chat-bubble-text-square",
    "chat-bubble-typing-oval", "chat-two-bubbles-oval",
    "chat-bubble-square-block", "chat-bubble-square-question", "chat-bubble-square-warning",
    "discussion-converstion-reply", "recording-tape-bubble-circle", "recording-tape-bubble-square",
    "phone", "phone-ringing", "phone-ringing-2", "phone-mobile-phone",
    "incoming-call", "outgoing-call", "missed-call",
    "call-hang-up", "call-time-duration", "hang-up", "hang-up-2", "retro-phone",
    "voice-mail", "voice-mail-off",
    "annoncement-megaphone", "megaphone-2",
    "group-meeting-call", "call-center-support-service",
    "customer-support", "information-desk", "information-desk-customer",
    "desktop-chat",
  ],
  "Data & Analytics": [
    "graph", "graph-arrow-decrease", "graph-arrow-increase",
    "graph-bar-decrease", "graph-bar-increase", "graph-dot",
    "pie-chart", "stock", "trending-content",
    "business-progress-bar-2", "optimization",
    "hierarchy-2", "hierarchy-4", "hierarchy-7", "hierarchy-10", "hierarchy-13", "hierarchy-14",
    "database", "database-check", "database-lock", "database-refresh",
    "database-remove", "database-server", "database-server-2", "database-setting",
    "log", "code-analysis", "code-monitor", "code-monitor-2",
    "steps-number", "strategy-tasks",
  ],
  "Files & Documents": [
    "new-file", "file-add-alternate", "file-delete-alternate", "file-remove-alternate",
    "file-code", "file-doc", "file-txt", "file-xls", "file-ppt",
    "file-jpg", "file-png", "file-gif", "file-mp3", "file-mp4",
    "file-zip", "file-rar", "file-dmg", "convert-pdf-2",
    "multiple-file-2", "blank-notepad", "new-sticky-note", "open-book",
    "manual-book", "book-reading", "dictionary-language-book", "definition-search-book",
    "empty-clipboard", "clipboard-add", "clipboard-check", "clipboard-remove",
    "folder-add", "folder-check", "folder-delete", "new-folder", "open-folder",
    "local-storage-folder", "music-folder-song", "pictures-folder-memories", "play-list-folder",
    "archive-box", "save-as", "floppy-disk",
  ],
  "Commerce & Finance": [
    "shopping-cart", "shopping-cart-2", "shopping-cart-3",
    "shopping-cart-add", "shopping-cart-check", "shopping-cart-subtract",
    "shopping-basket", "shopping-basket-2", "shopping-bag-hand-bag-2",
    "store", "store-2", "store-computer",
    "receipt", "receipt-add", "receipt-check", "receipt-subtract",
    "bill", "bill-2", "bill-4", "bill-cashless",
    "credit-card", "credit-card-2", "wallet", "wallet-purse",
    "dollar-coin", "euro", "yuan", "yuan-circle",
    "coins-stack", "coin-share", "piggy-bank",
    "bag-dollar", "bag-pound", "bag-rupee", "bag-yen",
    "briefcase-dollar", "money-shopping", "business-idea-money",
    "gift", "gift-2", "gift-card", "give-gift",
    "discount-percent-badge", "discount-percent-circle",
    "discount-percent-coupon", "discount-percent-cutout", "discount-percent-fire",
    "tag", "ticket", "tickets",
    "payment-10", "payment-cash-out-3", "subscription-cashflow", "investment-selection",
    "bitcoin", "ethereum", "ethereum-circle", "binance-circle", "xrp-circle",
  ],
  "Media & Creative": [
    "camera", "camera-disabled", "camera-loading", "camera-square", "camera-video",
    "front-camera", "back-camera", "video-swap-camera",
    "images-photography", "image-in-circle", "edit-image-photo",
    "image-blur", "image-saturation", "landscape-2", "landscape-setting",
    "film-roll", "film-slate", "live-video",
    "music-note", "music-note-2", "music-note-off", "music-note-off-2",
    "music-equalizer", "song-recommendation",
    "button-play", "button-pause-2", "button-stop",
    "button-next", "button-previous", "button-fast-forward", "button-rewind",
    "button-record-3", "button-power",
    "play-list-4", "play-list-5", "play-list-8", "play-list-9",
    "volume-down", "volume-level-high", "volume-level-low", "volume-level-off",
    "volume-mute", "volume-off", "speaker", "speaker-2",
    "color-palette", "color-picker", "color-swatches",
    "paint-bucket", "paint-palette", "paintbrush", "paintbrush-2",
    "pen-3", "pen-draw", "pen-tool", "pencil", "spray-paint",
    "crop-selection", "lasso-tool", "magic-wand-2", "drop-shadow", "inner-shadow",
  ],
  "Devices & Hardware": [
    "computer-pc-desktop", "computer-devices", "laptop-camera", "laptop-charging",
    "phone-mobile-phone", "phone-qr",
    "screen", "screen-2", "screen-broadcast", "screen-curve",
    "desktop-code", "desktop-check", "desktop-delete", "desktop-dollar",
    "desktop-emoji", "desktop-favorite-star", "desktop-game", "desktop-help",
    "mouse", "mouse-wireless", "keyboard", "keyboard-wireless-2",
    "webcam", "webcam-video", "webcam-video-circle", "webcam-video-off",
    "printer", "scanner", "scanner-3",
    "hard-disk", "hard-drive", "usb-drive",
    "computer-chip", "computer-chip-2",
    "battery-full", "battery-medium", "battery-low", "battery-empty",
    "battery-charging", "battery-alert",
    "earpods", "controller", "controller-wireless",
    "watch", "watch-2", "vision-pro", "vr-headset", "vr-headset-2",
    "drone", "drone-2", "satellite-dish",
  ],
  "Network & Connectivity": [
    "wifi", "wifi-antenna", "wifi-disabled", "wifi-horizontal", "wifi-router",
    "bluetooth", "bluetooth-disabled", "bluetooth-searching",
    "signal-full", "signal-medium", "signal-low", "signal-loading", "signal-none",
    "cellular-network-4g", "cellular-network-5g", "cellular-network-lte",
    "cloud", "cloud-add", "cloud-block", "cloud-check",
    "cloud-data-transfer", "cloud-refresh", "cloud-share", "cloud-warning", "cloud-wifi",
    "network", "vpn-connection", "wave-signal", "wave-signal-square",
    "link-chain", "broken-link-2", "share-link", "rss-square", "rss-symbol",
    "earth", "earth-airplane", "web", "globe" as never,
    "device-database-encryption", "device-database-encryption-1",
  ],
  "AI & Technology": [
    "ai-chip-spark", "ai-cloud-spark", "ai-edit-spark",
    "ai-email-generator-spark", "ai-gaming-spark",
    "ai-generate-landscape-image-spark", "ai-generate-music-spark",
    "ai-generate-portrait-image-spark", "ai-generate-variation-spark",
    "ai-navigation-spark", "ai-network-spark", "ai-prompt-spark",
    "ai-redo-spark", "ai-science-spark", "ai-settings-spark",
    "ai-technology-spark", "ai-upscale-spark", "ai-vehicle-spark",
    "artificial-intelligence", "artificial-intelligence-spark",
    "brain", "brain-cognitive", "cyborg", "cyborg-2",
    "ar-environment", "virtual-reality",
    "programming", "curly-brackets", "bracket",
    "braces-circle", "square-brackets-circle",
    "css-three", "markdown-circle-programming", "markdown-document-programming",
    "bug", "bug-antivirus-debugging", "bug-antivirus-shield",
    "bug-virus-browser", "bug-virus-document", "bug-virus-folder",
    "virus-antivirus", "threat-browser", "threat-document", "threat-folder",
    "container", "cog",
  ],
  "Maps & Location": [
    "location-pin-3", "location-pin-disabled", "location-target", "location-compass",
    "compass-navigator", "map-fold", "map-travel", "earth", "earth-airplane",
    "north", "south", "street-road", "street-sign", "signage-3", "signage-4",
    "parking-sign", "traffic-cone",
    "airplane", "airplane-disabled", "airplane-enabled",
    "airport-plane", "airport-plane-transit", "airport-security",
    "bus", "school-bus-side", "car-taxi", "high-speed-train-front",
    "bicycle-bike", "transfer-motorcycle", "transfer-van", "shipping-truck",
    "sail-ship", "take-off",
    "gas-station-fuel-petroleum", "steering-wheel",
  ],
  "Social & Brands": [
    "facebook", "instagram", "twitter", "x-twitter-logo", "linkedin",
    "whatsapp", "telegram", "discord", "slack", "tiktok", "tinder",
    "spotify", "netflix", "youtube" as never,
    "google", "google-drive", "gmail", "chrome",
    "apple", "android", "windows",
    "amazon", "dropbox", "figma", "meta", "meta-thread-logo",
    "adobe", "paypal",
    "play-store", "app-store", "epic-games",
    "play-station", "xbox", "nintendo-switch", "gameboy",
  ],
  "Settings & Tools": [
    "cog", "wrench", "page-setting",
    "auto-fit-column-width", "auto-fit-row-height", "column-width", "row-height",
    "equal-height", "equal-width", "size",
    "spacing-horizontal", "spacing-vertical",
    "fit-to-height-square",
    "align-left", "align-center", "align-right", "align-back", "align-front",
    "bring-forward", "bring-to-front", "send-to-back",
    "rotate-angle-45", "rotate-content-left", "rotate-content-right",
    "flip-vertical-arrow-2", "flip-vertical-circle", "flip-vertical-square-2",
    "layers", "layers-2", "add-layer-2",
    "pathfinder-divide", "pathfinder-exclude", "pathfinder-intersect",
    "pathfinder-merge", "pathfinder-minus-front", "pathfinder-union", "pathfinder-trim",
    "combine", "cross-reference",
    "flash", "flash-2", "flash-3", "flash-off",
    "lightbulb", "brightness", "brightness-2", "brightness-3",
    "focus-points", "target", "target-3",
  ],
  "Security & Privacy": [
    "shield", "shield-2", "shield-check", "shield-cross",
    "padlock-square", "temporary-lock", "lock-rotation",
    "key", "keyhole-lock-circle",
    "fingerprint", "fingerprint-2", "face-scan", "face-scan-circle",
    "incognito-mode", "invisible", "invisible-2", "visible", "eye-optic",
    "safe-vault", "insurance-hand",
    "bug-antivirus-debugging", "bug-antivirus-shield",
    "virus-antivirus", "threat-browser", "threat-document", "threat-folder",
    "device-database-encryption", "device-database-encryption-1",
    "vpn-connection", "radioactive-2",
    "dangerous", "dangerous-zone-sign", "skull", "bomb",
  ],
};

/* ─────────────────────────────────────────────
 * Shared grid component
 * ───────────────────────────────────────────── */

function IconGrid({
  icons,
  variant,
}: {
  icons: string[];
  variant: "line" | "solid" | "all";
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categoryNames = Object.keys(categories);

  const filtered = useMemo(() => {
    let list = icons;

    if (selectedCategory !== "all") {
      const catIcons = categories[selectedCategory] || [];
      const catSet = new Set(
        variant === "solid"
          ? catIcons.map((n) => `${n}-solid`)
          : catIcons,
      );
      list = list.filter((n) => catSet.has(n));
    }

    if (search) {
      const q = search.toLowerCase();
      list = list.filter((n) => n.includes(q));
    }

    return list;
  }, [icons, search, selectedCategory, variant]);

  return (
    <div className="flex flex-col gap-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3 sticky top-0 z-10 bg-[var(--color-background)] py-3 border-b border-[var(--color-border)]">
        <input
          type="text"
          placeholder={`Search ${icons.length} icons...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm w-64 text-[var(--color-foreground)]"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm text-[var(--color-foreground)]"
        >
          <option value="all">All Categories</option>
          {categoryNames.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <span className="text-xs text-[var(--color-muted-foreground)]">
          {filtered.length} icon{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-sm text-[var(--color-muted-foreground)] py-8 text-center">
          No icons found.
        </p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2">
          {filtered.map((name) => (
            <div
              key={name}
              className="flex flex-col items-center gap-1.5 p-3 rounded-lg hover:bg-[var(--color-surface)] transition-colors cursor-default"
              title={name}
            >
              <Icon name={name as never} size={22} />
              <span className="text-[10px] leading-tight text-center text-[var(--color-muted-foreground)] break-all max-w-full">
                {name.replace(/-solid$/, "")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Category browser (for the "By Category" story)
 * ───────────────────────────────────────────── */

function CategoryBrowser({ variant }: { variant: "line" | "solid" }) {
  const [search, setSearch] = useState("");
  const registry = variant === "solid" ? solidIconRegistry : lineIconRegistry;
  const allNames = Object.keys(registry);

  const q = search.toLowerCase();

  return (
    <div className="flex flex-col gap-6">
      <div className="sticky top-0 z-10 bg-[var(--color-background)] py-3 border-b border-[var(--color-border)]">
        <input
          type="text"
          placeholder={`Search across all categories (${allNames.length} icons)...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm w-80 text-[var(--color-foreground)]"
        />
      </div>

      {Object.entries(categories).map(([category, iconNames]) => {
        const resolved = variant === "solid"
          ? iconNames.map((n) => `${n}-solid`).filter((n) => n in registry)
          : iconNames.filter((n) => n in registry);

        const visible = search
          ? resolved.filter((n) => n.includes(q))
          : resolved;

        if (visible.length === 0) return null;

        return (
          <div key={category}>
            <h3 className="text-sm font-semibold text-[var(--color-foreground)] mb-3 flex items-center gap-2">
              {category}
              <span className="text-xs font-normal text-[var(--color-muted-foreground)]">
                ({visible.length})
              </span>
            </h3>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(90px,1fr))] gap-1.5">
              {visible.map((name) => (
                <div
                  key={name}
                  className="flex flex-col items-center gap-1 p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
                  title={name}
                >
                  <Icon name={name as never} size={20} />
                  <span className="text-[9px] leading-tight text-center text-[var(--color-muted-foreground)] break-all">
                    {name.replace(/-solid$/, "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────
 * Stories — Line Icons
 * ───────────────────────────────────────────── */

const lineNames = Object.keys(lineIconRegistry);
const solidNames = Object.keys(solidIconRegistry);

export const LineIcons: Story = {
  name: "Line Icons",
  render: () => <IconGrid icons={lineNames} variant="line" />,
};

export const SolidIcons: Story = {
  name: "Solid Icons",
  render: () => <IconGrid icons={solidNames} variant="solid" />,
};

export const LineByCategory: Story = {
  name: "Line — By Category",
  render: () => <CategoryBrowser variant="line" />,
};

export const SolidByCategory: Story = {
  name: "Solid — By Category",
  render: () => <CategoryBrowser variant="solid" />,
};

/* ─────────────────────────────────────────────
 * Comparison: Line vs Solid side by side
 * ───────────────────────────────────────────── */

function ComparisonView() {
  const [search, setSearch] = useState("");
  const baseNames = lineNames.map((n) => n);
  const filtered = search
    ? baseNames.filter((n) => n.includes(search.toLowerCase()))
    : baseNames.slice(0, 200);

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 z-10 bg-[var(--color-background)] py-3 border-b border-[var(--color-border)]">
        <input
          type="text"
          placeholder="Search to compare Line vs Solid..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-3 py-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-sm w-80 text-[var(--color-foreground)]"
        />
        <span className="ml-3 text-xs text-[var(--color-muted-foreground)]">
          {filtered.length} pairs {!search && "(showing first 200 — search for more)"}
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-3">
        {filtered.map((name) => {
          const solidName = `${name}-solid`;
          const hasSolid = solidName in solidIconRegistry;
          return (
            <div
              key={name}
              className="flex flex-col items-center gap-2 p-3 rounded-lg border border-[var(--color-border)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center gap-1">
                  <Icon name={name as never} size={22} />
                  <span className="text-[8px] text-[var(--color-muted-foreground)]">Line</span>
                </div>
                {hasSolid && (
                  <div className="flex flex-col items-center gap-1">
                    <Icon name={solidName as never} size={22} />
                    <span className="text-[8px] text-[var(--color-muted-foreground)]">Solid</span>
                  </div>
                )}
              </div>
              <span className="text-[9px] text-center text-[var(--color-muted-foreground)] break-all">
                {name}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const Comparison: Story = {
  name: "Line vs Solid",
  render: () => <ComparisonView />,
};
