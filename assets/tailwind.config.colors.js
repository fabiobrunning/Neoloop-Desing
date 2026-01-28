/**
 * Tailwind CSS Configuration - watchOS Colors
 * Exportado do Figma via plugin Design Tokens
 *
 * Como usar:
 * 1. Copie este objeto para seu tailwind.config.js dentro de theme.extend.colors
 * 2. Ou importe: const watchOSColors = require('./assets/tailwind.config.colors')
 */

const watchOSColors = {
  // Vermelhos e Rosas
  'red': '#df1125',
  'neon-pink': '#fb212f',
  'electric-pink': '#fc3644',
  'hibiscus': '#fb0049',
  'pink': '#fd4154',
  'pink-citrus': '#ea383a',
  'pomegranate': '#d80e4f',
  'dragon-fruit': '#f12e6d',
  'camellia': '#bf3138',
  'red-rose': '#ab1438',
  'plum': '#81323d',

  // Laranjas
  'orange': '#fc4e12',
  'clementine': '#fd513b',
  'apricot': '#fc5c42',
  'papaya': '#fd7036',
  'kumquat': '#fd7441',
  'light-orange': '#fd820b',
  'peach': '#e0694e',
  'flamingo': '#ca6f59',
  'rose-gold': '#e99475',
  'pink-sand': '#feb69c',
  'vintage-rose': '#f29c98',
  'grapefruit': '#fda27e',

  // Amarelos
  'cream': '#ffe0ab',
  'mellow-yellow': '#f7f6af',
  'canary-yellow': '#ffda3a',
  'pollen': '#e8c511',
  'flash-light': '#faed0b',
  'lemon-cream': '#ffeb6d',
  'flash': '#dff81e',

  // Verdes
  'green': '#80e220',
  'spearmint': '#77ea7e',
  'mint': '#a2ec8e',
  'beryl': '#d0f2b1',
  'sea-foam': '#cff1d6',
  'turquoise': '#91cec2',

  // Azuis
  'blue': '#1ea5fc',
  'light-blue': '#5ebad9',
  'cerulian': '#87b9e7',
  'surf-blue': '#1871ac',
  'pacific-green': '#0f6d8e',
  'blue-cobalt': '#3a6b8e',
  'dark-teal': '#2c6184',
  'blue-horizon': '#1e538f',
  'denim-blue': '#4b709a',
  'linen-blue': '#455785',
  'deep-navy': '#3a4565',
  'midnight-blue': '#383b65',

  // Roxos
  'purple': '#8962f8',
  'ultra-violet': '#5f41b2',
  'lilac': '#a990dd',
  'ocean-blue': '#6273bd',
  'delft-blue': '#4662b2',
  'indigo': '#474e95',
  'lavender-gray': '#757397',
  'lavender': '#a58998',

  // Cinzas e Verdes Escuros
  'mist-blue': '#a7ab99',
  'storm-gray': '#578887',
  'cactus': '#5b7971',
  'pine-green': '#4e6c54',
  'cyprus-green': '#525d49',
  'northern-blue': '#638a8d',
  'azure': '#788991',
  'alaskan-blue': '#525c73',

  // Marrons e Dourados
  'khaki': '#7a6e49',
  'dark-olive': '#7c7a66',
  'soft-white': '#d8c9af',
  'antique-white': '#cda986',
  'yellow-gold': '#cc996d',
  'gold': '#b08053',
  'camel': '#a97d4f',
  'walnut': '#a17455',
  'stone': '#a28872',
  'pebble': '#9f8d7e',
  'cocoa': '#8b7d7d',
  'coastal-gray': '#715d50',
};

module.exports = watchOSColors;

/**
 * Exemplo de uso no tailwind.config.js:
 *
 * const watchOSColors = require('./assets/tailwind.config.colors');
 *
 * module.exports = {
 *   theme: {
 *     extend: {
 *       colors: {
 *         // Adiciona todas as cores do watchOS
 *         ...watchOSColors,
 *
 *         // Ou organize em um namespace
 *         watchos: watchOSColors,
 *       },
 *       fontFamily: {
 *         'title': ['SF UI Display', 'sans-serif'],
 *         'value': ['SF Mono', 'monospace'],
 *       }
 *     }
 *   }
 * }
 *
 * Uso no código:
 * <div className="bg-hibiscus text-white">...</div>
 * <div className="bg-watchos-hibiscus">...</div> (se usar namespace)
 * <h1 className="font-title text-2xl">Título</h1>
 */
