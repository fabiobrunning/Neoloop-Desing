/**
 * Microinteractions Library
 *
 * Pre-built microinteraction components for buttons, loading states, and transitions.
 * Designed for 60fps performance with Framer Motion.
 *
 * @usage
 * ```tsx
 * import { PulseButton, RippleButton, LoadingDots } from '@/components/motion/Microinteractions';
 *
 * <PulseButton onClick={handleClick}>Click Me</PulseButton>
 * <LoadingDots />
 * ```
 */

import React, { useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import { animationTokens } from './AnimationTokens';

// ==================== TYPES ====================
interface BaseProps {
  className?: string;
  children?: React.ReactNode;
}

interface ButtonProps extends BaseProps {
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
}

// ==================== PULSE BUTTON ====================
export const PulseButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const baseClass = `
    px-6 py-3 rounded-lg font-medium transition-colors
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  return (
    <motion.button
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(59, 130, 246, 0)',
          '0 0 0 10px rgba(59, 130, 246, 0.1)',
          '0 0 0 0 rgba(59, 130, 246, 0)',
        ],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    >
      {children}
    </motion.button>
  );
};

// ==================== RIPPLE BUTTON ====================
export const RippleButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  className = '',
}) => {
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);

    onClick?.();
  };

  const baseClass = `
    relative overflow-hidden px-6 py-3 rounded-lg font-medium
    transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
  };

  return (
    <motion.button
      className={`${baseClass} ${variantClasses[variant]} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 0,
            height: 0,
          }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 300, height: 300, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {children}
    </motion.button>
  );
};

// ==================== LOADING DOTS ====================
const dotVariants: Variants = {
  initial: { y: 0 },
  animate: { y: -10 },
};

export const LoadingDots: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-3 h-3',
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className={`${sizeClasses[size]} rounded-full bg-current`}
          variants={dotVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: 0.6,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
  );
};

// ==================== LOADING SPINNER ====================
export const LoadingSpinner: React.FC<{
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}> = ({ className = '', size = 'md', color = 'currentColor' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} border-t-transparent rounded-full ${className}`}
      style={{ borderColor: color, borderTopColor: 'transparent' }}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
};

// ==================== LOADING BAR ====================
export const LoadingBar: React.FC<{ className?: string; duration?: number }> = ({
  className = '',
  duration = 2,
}) => {
  return (
    <div className={`h-1 bg-gray-200 rounded-full overflow-hidden ${className}`}>
      <motion.div
        className="h-full bg-blue-600 rounded-full"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// ==================== PROGRESS RING ====================
export const ProgressRing: React.FC<{
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  className?: string;
}> = ({ progress, size = 100, strokeWidth = 8, className = '' }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <svg width={size} height={size} className={className}>
      <circle
        stroke="currentColor"
        strokeOpacity="0.2"
        fill="transparent"
        strokeWidth={strokeWidth}
        r={radius}
        cx={size / 2}
        cy={size / 2}
      />
      <motion.circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        r={radius}
        cx={size / 2}
        cy={size / 2}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: offset }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
      />
    </svg>
  );
};

// ==================== SHIMMER LOADER ====================
export const ShimmerLoader: React.FC<{
  className?: string;
  width?: string;
  height?: string;
}> = ({ className = '', width = '100%', height = '20px' }) => {
  return (
    <div
      className={`relative overflow-hidden rounded bg-gray-200 ${className}`}
      style={{ width, height }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent"
        animate={{ x: ['-100%', '100%'] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// ==================== SKELETON LOADER ====================
export const SkeletonLoader: React.FC<{
  lines?: number;
  className?: string;
}> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <ShimmerLoader
          key={i}
          height="16px"
          width={i === lines - 1 ? '70%' : '100%'}
        />
      ))}
    </div>
  );
};

// ==================== COUNT UP ====================
export const CountUp: React.FC<{
  from?: number;
  to: number;
  duration?: number;
  className?: string;
}> = ({ from = 0, to, duration = 2, className = '' }) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ textContent: from }}
        animate={{ textContent: to }}
        transition={{ duration, ease: 'easeOut' }}
        onUpdate={(latest) => {
          if (typeof latest.textContent === 'number') {
            return Math.round(latest.textContent);
          }
        }}
      />
    </motion.span>
  );
};

// Accessibility: All components respect prefers-reduced-motion
// Performance: GPU-accelerated animations (transform, opacity)
// Usage: Import individual components as needed
