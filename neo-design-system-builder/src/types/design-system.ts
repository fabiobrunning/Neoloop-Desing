// View Types
export enum ViewType {
  COLOR_TOKENS = 'Cores',
  TYPOGRAPHY = 'Tipografia',
  SPACING = 'Espaçamento',
  ELEVATIONS = 'Elevações',
  BORDER_RADIUS = 'Border Radius',
  BREAKPOINTS = 'Breakpoints',
  ICONS = 'Ícones',
  ICONS_CUSTOM = 'UI Icons Library',
  ICONS_LIBRARY = 'Icons Library (3.8k)',
  SOCIAL_LOGOS = 'Social Logos',
  PAYMENT_METHODS = 'Payment Methods',
  CHARTS = 'Gráficos',
  CHARTS_LIBRARY = 'Charts Library',
  BACKGROUNDS = 'Backgrounds',
  UI_BUTTONS = 'Buttons',
  UI_FORMS = 'Forms & Controls',
  UI_CARDS = 'Cards',
  ANIMATIONS = 'Animações'
}

// Design Token Types
export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  group: string;
}

export interface TypographyToken {
  id: string;
  name: string;
  size: string;
  weight: string;
  lineHeight: string;
}

export interface SpacingToken {
  id: string;
  name: string;
  value: number;
}

export interface ShadowToken {
  id: string;
  name: string;
  value: string;
}

export interface IconToken {
  id: string;
  name: string;
  category: string;
  svg: string;
}

export interface AnimationToken {
  id: string;
  name: string;
  duration: string;
  easing: string;
  keyframes: string;
}

// Design System
export interface DesignSystem {
  name: string;
  version: string;
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  shadows?: ShadowToken[];
  icons?: IconToken[];
  animations?: AnimationToken[];
  borderRadius: number[];
  breakpoints: Record<string, string>;
}

// Action Types
export type DesignSystemAction =
  | { type: 'UPDATE_COLOR'; payload: ColorToken }
  | { type: 'ADD_COLOR'; payload: ColorToken }
  | { type: 'DELETE_COLOR'; payload: string }
  | { type: 'UPDATE_TYPOGRAPHY'; payload: TypographyToken }
  | { type: 'ADD_TYPOGRAPHY'; payload: TypographyToken }
  | { type: 'DELETE_TYPOGRAPHY'; payload: string }
  | { type: 'UPDATE_SPACING'; payload: SpacingToken }
  | { type: 'ADD_SPACING'; payload: SpacingToken }
  | { type: 'DELETE_SPACING'; payload: string }
  | { type: 'UPDATE_SHADOW'; payload: ShadowToken }
  | { type: 'ADD_SHADOW'; payload: ShadowToken }
  | { type: 'DELETE_SHADOW'; payload: string }
  | { type: 'UPDATE_ICON'; payload: IconToken }
  | { type: 'ADD_ICON'; payload: IconToken }
  | { type: 'DELETE_ICON'; payload: string }
  | { type: 'UPDATE_ANIMATION'; payload: AnimationToken }
  | { type: 'ADD_ANIMATION'; payload: AnimationToken }
  | { type: 'DELETE_ANIMATION'; payload: string }
  | { type: 'RESTORE_STATE'; payload: DesignSystem };
