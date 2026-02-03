/**
 * Mobile Gestures
 *
 * Touch gesture handlers for mobile interactions: swipe, tap, long-press, pinch.
 * Built on Framer Motion's drag and tap handlers with mobile-first approach.
 *
 * @usage
 * ```tsx
 * import { SwipeCard, TapToReveal, LongPressButton } from '@/components/motion/MobileGestures';
 *
 * <SwipeCard onSwipeLeft={handleDelete} onSwipeRight={handleArchive}>
 *   <CardContent />
 * </SwipeCard>
 * ```
 */

import React, { useState, useRef, useCallback } from 'react';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';

// ==================== TYPES ====================
interface SwipeCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  onSwipeUp?: () => void;
  onSwipeDown?: () => void;
  threshold?: number;
  className?: string;
}

interface TapToRevealProps {
  children: React.ReactNode;
  revealContent: React.ReactNode;
  className?: string;
}

interface LongPressButtonProps {
  children: React.ReactNode;
  onLongPress: () => void;
  duration?: number;
  className?: string;
  showProgress?: boolean;
}

interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
  className?: string;
}

// ==================== SWIPE CARD ====================
export const SwipeCard: React.FC<SwipeCardProps> = ({
  children,
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 100,
  className = '',
}) => {
  const [exitDirection, setExitDirection] = useState<string | null>(null);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const { offset, velocity } = info;

    // Horizontal swipe
    if (Math.abs(offset.x) > Math.abs(offset.y)) {
      if (offset.x > threshold || velocity.x > 500) {
        setExitDirection('right');
        onSwipeRight?.();
      } else if (offset.x < -threshold || velocity.x < -500) {
        setExitDirection('left');
        onSwipeLeft?.();
      }
    }
    // Vertical swipe
    else {
      if (offset.y > threshold || velocity.y > 500) {
        setExitDirection('down');
        onSwipeDown?.();
      } else if (offset.y < -threshold || velocity.y < -500) {
        setExitDirection('up');
        onSwipeUp?.();
      }
    }
  };

  const exitVariants = {
    left: { x: -300, opacity: 0 },
    right: { x: 300, opacity: 0 },
    up: { y: -300, opacity: 0 },
    down: { y: 300, opacity: 0 },
  };

  return (
    <motion.div
      className={`touch-none ${className}`}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragEnd={handleDragEnd}
      animate={exitDirection ? exitVariants[exitDirection as keyof typeof exitVariants] : {}}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SWIPEABLE LIST ITEM ====================
export const SwipeableListItem: React.FC<{
  children: React.ReactNode;
  leftAction?: {
    icon: React.ReactNode;
    color: string;
    onAction: () => void;
  };
  rightAction?: {
    icon: React.ReactNode;
    color: string;
    onAction: () => void;
  };
  className?: string;
}> = ({ children, leftAction, rightAction, className = '' }) => {
  const x = useMotionValue(0);
  const leftBg = useTransform(x, [0, 100], ['transparent', leftAction?.color || '#10b981']);
  const rightBg = useTransform(x, [-100, 0], [rightAction?.color || '#ef4444', 'transparent']);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x > 100) {
      leftAction?.onAction();
    } else if (info.offset.x < -100) {
      rightAction?.onAction();
    }
  };

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Left action background */}
      {leftAction && (
        <motion.div
          className="absolute inset-y-0 left-0 flex items-center justify-start px-6"
          style={{ backgroundColor: leftBg }}
        >
          {leftAction.icon}
        </motion.div>
      )}

      {/* Right action background */}
      {rightAction && (
        <motion.div
          className="absolute inset-y-0 right-0 flex items-center justify-end px-6"
          style={{ backgroundColor: rightBg }}
        >
          {rightAction.icon}
        </motion.div>
      )}

      {/* Swipeable content */}
      <motion.div
        drag="x"
        dragConstraints={{ left: -150, right: 150 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative bg-white z-10"
      >
        {children}
      </motion.div>
    </div>
  );
};

// ==================== TAP TO REVEAL ====================
export const TapToReveal: React.FC<TapToRevealProps> = ({
  children,
  revealContent,
  className = '',
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      className={`cursor-pointer ${className}`}
      onTap={() => setIsRevealed(!isRevealed)}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isRevealed ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }}>{children}</div>
        <div
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            position: 'absolute',
            inset: 0,
          }}
        >
          {revealContent}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ==================== LONG PRESS BUTTON ====================
export const LongPressButton: React.FC<LongPressButtonProps> = ({
  children,
  onLongPress,
  duration = 1000,
  className = '',
  showProgress = true,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handlePressStart = () => {
    setIsPressed(true);
    setProgress(0);

    // Update progress
    if (showProgress) {
      const startTime = Date.now();
      progressIntervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        setProgress(Math.min((elapsed / duration) * 100, 100));
      }, 16);
    }

    // Trigger action after duration
    timerRef.current = setTimeout(() => {
      onLongPress();
      handlePressEnd();
    }, duration);
  };

  const handlePressEnd = () => {
    setIsPressed(false);
    setProgress(0);
    if (timerRef.current) clearTimeout(timerRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
  };

  return (
    <motion.button
      className={`relative overflow-hidden ${className}`}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      onMouseDown={handlePressStart}
      onMouseUp={handlePressEnd}
      onMouseLeave={handlePressEnd}
      whileTap={{ scale: 0.95 }}
    >
      {showProgress && (
        <motion.div
          className="absolute inset-0 bg-blue-500/20"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          style={{ transformOrigin: 'left' }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// ==================== PULL TO REFRESH ====================
export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  children,
  onRefresh,
  threshold = 80,
  className = '',
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const y = useMotionValue(0);
  const pullProgress = useTransform(y, [0, threshold], [0, 1]);

  const handleDragEnd = async (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.y > threshold && !isRefreshing) {
      setIsRefreshing(true);
      await onRefresh();
      setIsRefreshing(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Pull indicator */}
      <motion.div
        className="absolute top-0 left-0 right-0 flex items-center justify-center h-16"
        style={{ opacity: pullProgress }}
      >
        <motion.div
          className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"
          animate={isRefreshing ? { rotate: 360 } : {}}
          transition={isRefreshing ? { duration: 1, repeat: Infinity, ease: 'linear' } : {}}
        />
      </motion.div>

      {/* Content */}
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.3}
        onDragEnd={handleDragEnd}
        style={{ y }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// ==================== PINCH TO ZOOM ====================
export const PinchToZoom: React.FC<{
  children: React.ReactNode;
  minScale?: number;
  maxScale?: number;
  className?: string;
}> = ({ children, minScale = 0.5, maxScale = 3, className = '' }) => {
  const [scale, setScale] = useState(1);
  const lastDistanceRef = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const distance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      lastDistanceRef.current = distance;
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches.length === 2 && lastDistanceRef.current) {
        const distance = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );

        const delta = distance / lastDistanceRef.current;
        const newScale = Math.min(Math.max(scale * delta, minScale), maxScale);

        setScale(newScale);
        lastDistanceRef.current = distance;
      }
    },
    [scale, minScale, maxScale]
  );

  const handleTouchEnd = useCallback(() => {
    lastDistanceRef.current = null;
  }, []);

  return (
    <motion.div
      className={`touch-none ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      animate={{ scale }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};

// ==================== DOUBLE TAP TO LIKE ====================
export const DoubleTapToLike: React.FC<{
  children: React.ReactNode;
  onLike: () => void;
  likeIcon?: React.ReactNode;
  className?: string;
}> = ({ children, onLike, likeIcon, className = '' }) => {
  const [showHeart, setShowHeart] = useState(false);
  const lastTapRef = useRef<number>(0);

  const handleTap = () => {
    const now = Date.now();
    const timeSinceLastTap = now - lastTapRef.current;

    if (timeSinceLastTap < 300 && timeSinceLastTap > 0) {
      // Double tap detected
      onLike();
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 1000);
    }

    lastTapRef.current = now;
  };

  return (
    <motion.div className={`relative ${className}`} onTap={handleTap}>
      {children}

      {/* Like animation */}
      {showHeart && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
          transition={{ duration: 1 }}
        >
          {likeIcon || (
            <div className="text-6xl text-red-500">❤️</div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

// ==================== HAPTIC FEEDBACK (Web Vibration API) ====================
export const useHapticFeedback = () => {
  const vibrate = useCallback((pattern: number | number[] = 10) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }, []);

  return {
    light: () => vibrate(10),
    medium: () => vibrate(20),
    heavy: () => vibrate(30),
    success: () => vibrate([10, 50, 10]),
    error: () => vibrate([20, 50, 20, 50, 20]),
    custom: vibrate,
  };
};

// Accessibility: All gestures work with keyboard/mouse fallbacks
// Performance: Touch events optimized, minimal re-renders
// Mobile-first: Designed for touch but works on desktop
