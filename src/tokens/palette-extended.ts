/**
 * Synkra DS - Extended Color Palette (watchOS)
 * Source: assets/Cores/design-tokens-colors.css
 * Usage: Charts, badges, tags, data visualization, accent colors
 */

export const paletteExtended = {
  reds: {
    red: "#df1125",
    neonPink: "#fb212f",
    electricPink: "#fc3644",
    hibiscus: "#fb0049",
    pink: "#fd4154",
    pinkCitrus: "#ea383a",
    pomegranate: "#d80e4f",
    dragonFruit: "#f12e6d",
    camellia: "#bf3138",
    redRose: "#ab1438",
    plum: "#81323d",
  },
  oranges: {
    orange: "#fc4e12",
    clementine: "#fd513b",
    apricot: "#fc5c42",
    papaya: "#fd7036",
    kumquat: "#fd7441",
    lightOrange: "#fd820b",
    peach: "#e0694e",
    flamingo: "#ca6f59",
    roseGold: "#e99475",
    pinkSand: "#feb69c",
    vintageRose: "#f29c98",
    grapefruit: "#fda27e",
  },
  yellows: {
    cream: "#ffe0ab",
    mellowYellow: "#f7f6af",
    canaryYellow: "#ffda3a",
    pollen: "#e8c511",
    flashLight: "#faed0b",
    lemonCream: "#ffeb6d",
    flash: "#dff81e",
  },
  greens: {
    green: "#80e220",
    spearmint: "#77ea7e",
    mint: "#a2ec8e",
    beryl: "#d0f2b1",
    seaFoam: "#cff1d6",
    turquoise: "#91cec2",
  },
  blues: {
    blue: "#1ea5fc",
    lightBlue: "#5ebad9",
    cerulean: "#87b9e7",
    surfBlue: "#1871ac",
    pacificGreen: "#0f6d8e",
    blueCobalt: "#3a6b8e",
    darkTeal: "#2c6184",
    blueHorizon: "#1e538f",
    denimBlue: "#4b709a",
    linenBlue: "#455785",
    deepNavy: "#3a4565",
    midnightBlue: "#383b65",
  },
  purples: {
    purple: "#8962f8",
    ultraViolet: "#5f41b2",
    lilac: "#a990dd",
    oceanBlue: "#6273bd",
    delftBlue: "#4662b2",
    indigo: "#474e95",
    lavenderGray: "#757397",
    lavender: "#a58998",
  },
  neutrals: {
    mistBlue: "#a7ab99",
    stormGray: "#578887",
    cactus: "#5b7971",
    pineGreen: "#4e6c54",
    cyprusGreen: "#525d49",
    northernBlue: "#638a8d",
    azure: "#788991",
    alaskanBlue: "#525c73",
  },
  earths: {
    khaki: "#7a6e49",
    darkOlive: "#7c7a66",
    softWhite: "#d8c9af",
    antiqueWhite: "#cda986",
    yellowGold: "#cc996d",
    gold: "#b08053",
    camel: "#a97d4f",
    walnut: "#a17455",
    stone: "#a28872",
    pebble: "#9f8d7e",
    cocoa: "#8b7d7d",
    coastalGray: "#715d50",
  },
} as const;

/** 10 colors optimized for charts and data visualization */
export const chartPalette = [
  "#1ea5fc", // blue
  "#D4AF37", // gold (brand)
  "#22C55E", // green
  "#8962f8", // purple
  "#fc4e12", // orange
  "#fb0049", // hibiscus
  "#91cec2", // turquoise
  "#f7f6af", // yellow
  "#a990dd", // lilac
  "#fd820b", // light orange
] as const;

/** Gradient presets */
export const gradients = {
  badge: "linear-gradient(82.44deg, #ff3b57 0%, #ffda1a 100%)",
  purpleBlue: "linear-gradient(135deg, #8962f8, #1ea5fc)",
  hibiscusDragon: "linear-gradient(135deg, #fb0049, #f12e6d)",
  greenMint: "linear-gradient(135deg, #80e220, #a2ec8e)",
  goldSunset: "linear-gradient(135deg, #D4AF37, #fc4e12)",
} as const;

export type PaletteCategory = keyof typeof paletteExtended;
export type ChartColor = (typeof chartPalette)[number];
export type GradientName = keyof typeof gradients;
