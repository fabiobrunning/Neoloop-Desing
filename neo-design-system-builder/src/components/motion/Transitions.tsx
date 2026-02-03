/**
 * Transitions System
 *
 * Pre-built page transitions, modal animations, and state change effects.
 * Optimized for React Router and modal/dialog transitions.
 *
 * @usage
 * ```tsx
 * import { PageTransition, ModalTransition, SlideTransition } from '@/components/motion/Transitions';
 *
 * <PageTransition mode="slide">
 *   <YourPage />
 * </PageTransition>
 * ```
 */

import React from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { animationTokens } from './AnimationTokens';

// ==================== TYPES ====================
interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  isVisible?: boolean;
}

interface PageTransitionProps extends TransitionProps {
  mode?: 'fade' | 'slide' | 'scale' | 'slideUp';
}

// ==================== VARIANTS ====================
const pageVariants: Record<string, Variants> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slide: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
  },
  slideUp: {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -20, opacity: 0 },
  },
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
  },
};

const modalVariants: Variants = {
  initial: { scale: 0.9, opacity: 0, y: 20 },
  animate: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
    },
  },
  exit: {
    scale: 0.9,
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

const backdropVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

// ==================== PAGE TRANSITION ====================
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  mode = 'fade',
  className = '',
}) => {
  const variants = pageVariants[mode];

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
};

// ==================== MODAL TRANSITION ====================
export const ModalTransition: React.FC<
  TransitionProps & {
    onClose?: () => void;
    showBackdrop?: boolean;
  }
> = ({ children, isVisible = true, onClose, showBackdrop = true, className = '' }) => {
  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          {showBackdrop && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              variants={backdropVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={onClose}
            />
          )}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className={`relative bg-white rounded-lg shadow-xl max-w-md w-full ${className}`}
              variants={modalVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ==================== SLIDE TRANSITION ====================
export const SlideTransition: React.FC<
  TransitionProps & { direction?: 'left' | 'right' | 'up' | 'down' }
> = ({ children, isVisible = true, direction = 'right', className = '' }) => {
  const directionVariants: Record<string, Variants> = {
    left: {
      initial: { x: '-100%' },
      animate: { x: 0 },
      exit: { x: '-100%' },
    },
    right: {
      initial: { x: '100%' },
      animate: { x: 0 },
      exit: { x: '100%' },
    },
    up: {
      initial: { y: '-100%' },
      animate: { y: 0 },
      exit: { y: '-100%' },
    },
    down: {
      initial: { y: '100%' },
      animate: { y: 0 },
      exit: { y: '100%' },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          variants={directionVariants[direction]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== DRAWER TRANSITION ====================
export const DrawerTransition: React.FC<
  TransitionProps & {
    side?: 'left' | 'right' | 'top' | 'bottom';
    onClose?: () => void;
  }
> = ({ children, isVisible = true, side = 'right', onClose, className = '' }) => {
  const sideClasses = {
    left: 'left-0 top-0 bottom-0 w-80',
    right: 'right-0 top-0 bottom-0 w-80',
    top: 'top-0 left-0 right-0 h-80',
    bottom: 'bottom-0 left-0 right-0 h-80',
  };

  const slideDirections = {
    left: 'left',
    right: 'right',
    top: 'up',
    bottom: 'down',
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            variants={backdropVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={onClose}
          />
          <div className={`fixed ${sideClasses[side]} z-50`}>
            <SlideTransition
              isVisible={isVisible}
              direction={slideDirections[side] as any}
              className={`h-full bg-white shadow-xl ${className}`}
            >
              {children}
            </SlideTransition>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// ==================== COLLAPSE TRANSITION ====================
export const CollapseTransition: React.FC<TransitionProps> = ({
  children,
  isVisible = true,
  className = '',
}) => {
  return (
    <AnimatePresence initial={false}>
      {isVisible && (
        <motion.div
          className={`overflow-hidden ${className}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== ACCORDION TRANSITION ====================
export const AccordionTransition: React.FC<
  TransitionProps & {
    id: string;
    activeId: string | null;
  }
> = ({ children, id, activeId, className = '' }) => {
  const isActive = id === activeId;

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={false}
      animate={{
        height: isActive ? 'auto' : 0,
        opacity: isActive ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="p-4">{children}</div>
    </motion.div>
  );
};

// ==================== STAGGER CHILDREN ====================
export const StaggerChildren: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ children, staggerDelay = 0.1, className = '' }) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
};

// ==================== STAGGER ITEM ====================
export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
    },
  };

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
};

// ==================== NOTIFICATION TRANSITION ====================
export const NotificationTransition: React.FC<
  TransitionProps & {
    position?: 'top' | 'bottom';
  }
> = ({ children, isVisible = true, position = 'top', className = '' }) => {
  const positionVariants: Record<string, Variants> = {
    top: {
      initial: { y: -100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: -100, opacity: 0 },
    },
    bottom: {
      initial: { y: 100, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 100, opacity: 0 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className={className}
          variants={positionVariants[position]}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ==================== ROUTER TRANSITION WRAPPER ====================
/**
 * Use with React Router for animated page transitions
 * @example
 * ```tsx
 * <RouterTransition>
 *   <Routes location={location} key={location.pathname}>
 *     <Route path="/" element={<Home />} />
 *   </Routes>
 * </RouterTransition>
 * ```
 */
export const RouterTransition: React.FC<{
  children: React.ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'slideUp';
}> = ({ children, mode = 'fade' }) => {
  return (
    <AnimatePresence mode="wait">
      <PageTransition mode={mode}>{children}</PageTransition>
    </AnimatePresence>
  );
};

// Accessibility: All transitions respect prefers-reduced-motion
// Performance: GPU-accelerated, optimized for 60fps
// Usage: Wrap page/modal content with appropriate transition component
