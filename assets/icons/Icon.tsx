/**
 * Icon Component - Helper para usar os 10,000 ícones
 *
 * Facilita o uso dos ícones organizados por categoria
 */

import React from 'react';

// Mapeamento de categorias para arquivos SVG
const ICON_CATEGORIES = {
  // 🤖 IA e Machine Learning
  'ai': 'Artificial-Intelligence-Machine-Learning.svg',
  'ai-alt': 'Artificial-Intelligence-Machine-Learning-1.svg',

  // 💻 Computadores e Dispositivos
  'computer': 'Computer-Devices.svg',
  'computer-alt': 'Computer-Devices-1.svg',

  // 🎭 Cultura
  'culture': 'Culture.svg',
  'culture-alt': 'Culture-1.svg',

  // 🎮 Entretenimento
  'entertainment': 'Entertainment.svg',
  'entertainment-alt': 'Entertainment-1.svg',

  // 🍔 Comida e Bebida
  'food': 'Food-drink.svg',
  'food-alt': 'Food-drink-1.svg',

  // 🏥 Saúde
  'health': 'Health.svg',
  'health-alt': 'Health-1.svg',

  // 📸 Imagens e Fotografia
  'image': 'Images-Photography.svg',
  'image-alt': 'Images-Photography-1.svg',

  // 🖥️ Interface Essencial (MAIS USADO)
  'interface': 'Interface-Essential.svg',
  'interface-alt': 'Interface-Essential-1.svg',

  // 📧 Email
  'mail': 'Mail.svg',
  'mail-alt': 'Mail-1.svg',

  // 🗺️ Mapas e Viagens
  'map': 'Map-Travel.svg',
  'map-alt': 'Map-Travel-1.svg',

  // 💰 Dinheiro e Compras
  'money': 'Money-Shopping.svg',
  'money-alt': 'Money-Shopping-1.svg',

  // 🌿 Natureza e Ecologia
  'nature': 'Nature-Ecology.svg',
  'nature-alt': 'Nature-Ecology-1.svg',
  'nature-alt2': 'Nature-Ecology-2.svg',

  // 📱 Telefone
  'phone': 'Phone.svg',
  'phone-alt': 'Phone-1.svg',

  // 💻 Programação
  'code': 'Programming.svg',
  'code-alt': 'Programming-1.svg',

  // 📦 Envios
  'shipping': 'Shipping.svg',
  'shipping-alt': 'Shipping-1.svg',

  // 🎓 Trabalho e Educação
  'work': 'Work-Education.svg',
  'work-alt': 'Work-Education-1.svg',
} as const;

export type IconCategory = keyof typeof ICON_CATEGORIES;

interface IconProps {
  /** Categoria do ícone */
  category: IconCategory;

  /** Descrição alternativa (acessibilidade) */
  alt?: string;

  /** Tamanho em pixels (16, 20, 24, 32, 48, 64) */
  size?: number;

  /** Cor do ícone (herda do texto por padrão) */
  color?: string;

  /** Classes CSS adicionais */
  className?: string;

  /** Estilo inline */
  style?: React.CSSProperties;

  /** Handler de clique */
  onClick?: () => void;
}

/**
 * Componente para renderizar ícones da biblioteca 10,000 Free Icons
 *
 * @example
 * ```tsx
 * // Ícone básico
 * <Icon category="interface" alt="Home" />
 *
 * // Com tamanho customizado
 * <Icon category="mail" size={32} />
 *
 * // Com cor
 * <Icon category="health" color="#ff0000" />
 *
 * // Clicável
 * <Icon category="code" onClick={() => alert('Clicked!')} />
 * ```
 */
export function Icon({
  category,
  alt = '',
  size = 24,
  color = 'currentColor',
  className = '',
  style = {},
  onClick,
}: IconProps) {
  const iconFile = ICON_CATEGORIES[category];
  const iconPath = `/assets/icons/10,000 Free Icons - Open Source Icon set (Community)/${iconFile}`;

  return (
    <img
      src={iconPath}
      alt={alt}
      width={size}
      height={size}
      className={className}
      style={{
        display: 'inline-block',
        verticalAlign: 'middle',
        color,
        ...style,
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    />
  );
}

/**
 * Badge com gradiente e ícone
 *
 * @example
 * ```tsx
 * <IconBadge category="interface" text="Novo" />
 * <IconBadge category="money" text="Premium" size="sm" />
 * ```
 */
interface IconBadgeProps {
  category: IconCategory;
  text: string;
  size?: 'sm' | 'md' | 'lg';
}

export function IconBadge({ category, text, size = 'md' }: IconBadgeProps) {
  const sizes = {
    sm: { icon: 14, padding: '2px 8px', fontSize: '12px' },
    md: { icon: 16, padding: '4px 12px', fontSize: '14px' },
    lg: { icon: 20, padding: '6px 16px', fontSize: '16px' },
  };

  const config = sizes[size];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        background: 'linear-gradient(82.44deg, #ff3b57 0%, #ffda1a 100%)',
        padding: config.padding,
        borderRadius: '20px',
        color: 'white',
        fontSize: config.fontSize,
        fontWeight: '600',
      }}
    >
      <Icon category={category} size={config.icon} alt="" />
      {text}
    </span>
  );
}

/**
 * Botão com ícone
 *
 * @example
 * ```tsx
 * <IconButton category="mail" text="Enviar Email" />
 * <IconButton category="money" text="Comprar" variant="primary" />
 * ```
 */
interface IconButtonProps {
  category: IconCategory;
  text: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
}

export function IconButton({
  category,
  text,
  onClick,
  variant = 'primary',
  disabled = false,
}: IconButtonProps) {
  const variants = {
    primary: {
      background: 'var(--color-hibiscus, #fb0049)',
      color: 'white',
      border: 'none',
    },
    secondary: {
      background: 'var(--color-sea-foam, #cff1d6)',
      color: 'var(--color-pine-green, #4e6c54)',
      border: 'none',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--color-blue, #1ea5fc)',
      border: '1px solid currentColor',
    },
  };

  const style = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 20px',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'all 0.2s ease',
        ...style,
      }}
    >
      <Icon category={category} size={20} alt="" />
      {text}
    </button>
  );
}

// Exportar constantes úteis
export const ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

// Lista de categorias mais usadas
export const POPULAR_CATEGORIES: IconCategory[] = [
  'interface',      // UI/UX elements
  'computer',       // Tech & devices
  'money',          // E-commerce
  'mail',           // Communication
  'health',         // Health & fitness
];
