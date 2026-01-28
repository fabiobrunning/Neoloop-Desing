
export enum ViewType {
  COLOR_TOKENS = 'Cores',
  TYPOGRAPHY = 'Tipografia',
  TYPOGRAPHY_VALIDATOR = 'Typography Validator',
  SPACING = 'Espaçamento',
  ELEVATIONS = 'Elevações',
  ICONS = 'Ícones',
  CHARTS = 'Gráficos',
  UI_BUTTONS = 'Buttons',
  UI_FORMS = 'Forms & Controls',
  UI_CARDS = 'Cards',
  ANIMATIONS = 'Animações'
}

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

export interface DesignSystem {
  name: string;
  version: string;
  colors: ColorToken[];
  typography: TypographyToken[];
  spacing: SpacingToken[];
  borderRadius: number[];
  breakpoints: Record<string, string>;
}
