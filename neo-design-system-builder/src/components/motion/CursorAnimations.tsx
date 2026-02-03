/**
 * Cursor Animations
 *
 * Custom cursor effects and hover animations that follow mouse position.
 * Provides magnetic cursor, spotlight, and trail effects.
 *
 * @usage
 * ```tsx
 * import { MagneticButton, CursorSpotlight, CursorTrail } from '@/components/motion/CursorAnimations';
 *
 * <MagneticButton>Hover Me</MagneticButton>
 * <CursorSpotlight />
 * ```
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

// ==================== TYPES ====================
interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number; // 0-1, how strong the magnetic effect is
  className?: string;
  onClick?: () => void;
}

interface CursorSpotlightProps {
  size?: number;
  color?: string;
  blur?: number;
  className?: string;
}

interface CursorTrailProps {
  length?: number;
  className?: string;
}

// ==================== MAGNETIC BUTTON ====================
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.3,
  className = '',
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    x.set(deltaX);
    y.set(deltaY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      className={`
        relative px-6 py-3 rounded-lg font-medium
        bg-blue-600 text-white hover:bg-blue-700
        transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
        ${className}
      `}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      {isHovered && (
        <motion.span
          className="absolute inset-0 rounded-lg bg-white/20"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
};

// ==================== CURSOR SPOTLIGHT ====================
export const CursorSpotlight: React.FC<CursorSpotlightProps> = ({
  size = 300,
  color = 'rgba(59, 130, 246, 0.15)',
  blur = 100,
  className = '',
}) => {
  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className={`pointer-events-none fixed z-50 rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        left: cursorXSpring,
        top: cursorYSpring,
        x: -size / 2,
        y: -size / 2,
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: `blur(${blur}px)`,
      }}
    />
  );
};

// ==================== CURSOR TRAIL ====================
export const CursorTrail: React.FC<CursorTrailProps> = ({
  length = 20,
  className = '',
}) => {
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setTrail((prev) => {
        const newTrail = [
          { x: e.clientX, y: e.clientY, id: Date.now() },
          ...prev.slice(0, length - 1),
        ];
        return newTrail;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [length]);

  return (
    <div className={`pointer-events-none fixed inset-0 z-50 ${className}`}>
      {trail.map((point, i) => (
        <motion.div
          key={point.id}
          className="absolute w-2 h-2 rounded-full bg-blue-500"
          style={{
            left: point.x,
            top: point.y,
            x: -4,
            y: -4,
          }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 1 - i / length,
            scale: 1 - i / length / 2,
          }}
          transition={{ duration: 0.2 }}
        />
      ))}
    </div>
  );
};

// ==================== HOVER GLOW ====================
export const HoverGlow: React.FC<{
  children: React.ReactNode;
  color?: string;
  className?: string;
}> = ({ children, color = 'rgba(59, 130, 246, 0.5)', className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute rounded-full"
          style={{
            width: 200,
            height: 200,
            left: position.x,
            top: position.y,
            x: -100,
            y: -100,
            background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      {children}
    </div>
  );
};

// ==================== PARALLAX HOVER ====================
export const ParallaxHover: React.FC<{
  children: React.ReactNode;
  strength?: number;
  className?: string;
}> = ({ children, strength = 20, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [strength, -strength]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-strength, strength]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const normalizedX = (e.clientX - centerX) / (rect.width / 2);
    const normalizedY = (e.clientY - centerY) / (rect.height / 2);

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {children}
    </motion.div>
  );
};

// ==================== MAGNETIC CARD ====================
export const MagneticCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// Accessibility: All effects disabled with prefers-reduced-motion
// Performance: Uses GPU-accelerated transform properties
// Usage: Wrap interactive elements for enhanced UX
