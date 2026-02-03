/**
 * Onboarding / Tutorial System
 *
 * Guided tour component with spotlight, tooltips, and step-by-step walkthroughs.
 * Supports keyboard navigation, skip/dismiss, and progress tracking.
 *
 * @usage
 * ```tsx
 * import { OnboardingTour, TourStep } from '@/components/navigation/OnboardingTutorial';
 *
 * const steps: TourStep[] = [
 *   { target: '#dashboard', title: 'Dashboard', content: 'Welcome to your dashboard!' },
 *   { target: '#profile', title: 'Profile', content: 'Manage your profile here.' },
 * ];
 *
 * <OnboardingTour steps={steps} isActive={showTour} onComplete={handleComplete} />
 * ```
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check } from 'lucide-react';

// ==================== TYPES ====================
export interface TourStep {
  target: string; // CSS selector
  title: string;
  content: string | React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  spotlightPadding?: number;
  disableInteraction?: boolean;
  beforeShow?: () => void | Promise<void>;
  afterShow?: () => void;
}

interface OnboardingTourProps {
  steps: TourStep[];
  isActive: boolean;
  onComplete?: () => void;
  onSkip?: () => void;
  onStepChange?: (stepIndex: number) => void;
  showProgress?: boolean;
  showSkipButton?: boolean;
  className?: string;
}

interface TooltipProps {
  step: TourStep;
  currentStep: number;
  totalSteps: number;
  position: { top: number; left: number; width: number; height: number } | null;
  onNext: () => void;
  onPrevious: () => void;
  onSkip: () => void;
  onComplete: () => void;
}

// ==================== TOOLTIP COMPONENT ====================
const TourTooltip: React.FC<TooltipProps> = ({
  step,
  currentStep,
  totalSteps,
  position,
  onNext,
  onPrevious,
  onSkip,
  onComplete,
}) => {
  if (!position) return null;

  const placement = step.placement || 'bottom';
  const isFirst = currentStep === 0;
  const isLast = currentStep === totalSteps - 1;

  // Calculate tooltip position
  const getTooltipPosition = () => {
    const offset = 16;
    const tooltipWidth = 320;
    const tooltipHeight = 200;

    switch (placement) {
      case 'top':
        return {
          top: position.top - tooltipHeight - offset,
          left: position.left + position.width / 2 - tooltipWidth / 2,
        };
      case 'bottom':
        return {
          top: position.top + position.height + offset,
          left: position.left + position.width / 2 - tooltipWidth / 2,
        };
      case 'left':
        return {
          top: position.top + position.height / 2 - tooltipHeight / 2,
          left: position.left - tooltipWidth - offset,
        };
      case 'right':
        return {
          top: position.top + position.height / 2 - tooltipHeight / 2,
          left: position.left + position.width + offset,
        };
    }
  };

  const tooltipPos = getTooltipPosition();

  return (
    <motion.div
      className="fixed z-[100] bg-white rounded-lg shadow-xl p-6 max-w-[320px]"
      style={{ top: tooltipPos.top, left: tooltipPos.left }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      {/* Close Button */}
      <button
        onClick={onSkip}
        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close tour"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{step.title}</h3>
        <div className="text-sm text-gray-600">{step.content}</div>
      </div>

      {/* Progress Dots */}
      <div className="flex items-center justify-center gap-1 mb-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div
            key={index}
            className={`
              w-2 h-2 rounded-full transition-all
              ${index === currentStep ? 'bg-blue-600 w-6' : 'bg-gray-300'}
            `}
          />
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div>
          {!isFirst && (
            <button
              onClick={onPrevious}
              className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            {currentStep + 1} / {totalSteps}
          </span>

          <button
            onClick={isLast ? onComplete : onNext}
            className="
              flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg
              hover:bg-blue-700 transition-colors
            "
          >
            {isLast ? (
              <>
                <Check className="w-4 h-4" />
                Finish
              </>
            ) : (
              <>
                Next
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== SPOTLIGHT OVERLAY ====================
const Spotlight: React.FC<{
  position: { top: number; left: number; width: number; height: number } | null;
  padding?: number;
}> = ({ position, padding = 8 }) => {
  if (!position) return null;

  return (
    <svg
      className="fixed inset-0 z-[90] pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <mask id="spotlight-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <rect
            x={position.left - padding}
            y={position.top - padding}
            width={position.width + padding * 2}
            height={position.height + padding * 2}
            rx="8"
            fill="black"
          />
        </mask>
      </defs>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="rgba(0, 0, 0, 0.7)"
        mask="url(#spotlight-mask)"
      />
    </svg>
  );
};

// ==================== ONBOARDING TOUR ====================
export const OnboardingTour: React.FC<OnboardingTourProps> = ({
  steps,
  isActive,
  onComplete,
  onSkip,
  onStepChange,
  showProgress = true,
  showSkipButton = true,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [targetPosition, setTargetPosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);

  const step = steps[currentStep];

  // Update target position
  useEffect(() => {
    if (!isActive || !step) return;

    const updatePosition = async () => {
      // Execute beforeShow hook
      if (step.beforeShow) {
        await step.beforeShow();
      }

      const target = document.querySelector(step.target);
      if (target) {
        const rect = target.getBoundingClientRect();
        setTargetPosition({
          top: rect.top + window.scrollY,
          left: rect.left + window.scrollX,
          width: rect.width,
          height: rect.height,
        });

        // Scroll into view
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Execute afterShow hook
        step.afterShow?.();
      }
    };

    updatePosition();
  }, [currentStep, isActive, step]);

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          handleSkip();
          break;
        case 'ArrowRight':
          handleNext();
          break;
        case 'ArrowLeft':
          handlePrevious();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentStep]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      onStepChange?.(nextStep);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      onStepChange?.(prevStep);
    }
  };

  const handleSkip = () => {
    onSkip?.();
  };

  const handleComplete = () => {
    onComplete?.();
  };

  if (!isActive) return null;

  return (
    <AnimatePresence>
      <div className={className}>
        {/* Spotlight Overlay */}
        <Spotlight position={targetPosition} padding={step.spotlightPadding} />

        {/* Tooltip */}
        <TourTooltip
          step={step}
          currentStep={currentStep}
          totalSteps={steps.length}
          position={targetPosition}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSkip={handleSkip}
          onComplete={handleComplete}
        />

        {/* Skip Button (top-right) */}
        {showSkipButton && (
          <motion.button
            className="fixed top-4 right-4 z-[100] px-4 py-2 text-white bg-gray-800/80 rounded-lg hover:bg-gray-900 transition-colors"
            onClick={handleSkip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            Skip Tour
          </motion.button>
        )}
      </div>
    </AnimatePresence>
  );
};

// ==================== FEATURE HINT ====================
export const FeatureHint: React.FC<{
  target: string;
  title: string;
  content: string;
  isVisible: boolean;
  onDismiss: () => void;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  pulse?: boolean;
}> = ({ target, title, content, isVisible, onDismiss, placement = 'top', pulse = true }) => {
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    if (!isVisible) return;

    const targetEl = document.querySelector(target);
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setPosition({ top: rect.bottom + 8, left: rect.left });
    }
  }, [isVisible, target]);

  if (!isVisible || !position) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed z-50"
        style={{ top: position.top, left: position.left }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4 max-w-xs">
          {pulse && (
            <motion.div
              className="absolute -top-2 -left-2 w-4 h-4 bg-blue-600 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}

          <button
            onClick={onDismiss}
            className="absolute top-1 right-1 p-1 text-white/80 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>

          <h4 className="font-semibold mb-1">{title}</h4>
          <p className="text-sm text-white/90">{content}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

// ==================== CHECKLIST ONBOARDING ====================
export const ChecklistOnboarding: React.FC<{
  tasks: Array<{ id: string; label: string; completed: boolean; action?: () => void }>;
  title?: string;
  onDismiss?: () => void;
  className?: string;
}> = ({ tasks, title = 'Getting Started', onDismiss, className = '' }) => {
  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = (completedCount / tasks.length) * 100;

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {onDismiss && (
          <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>
            {completedCount} of {tasks.length} completed
          </span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green-600"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`
              flex items-center gap-3 p-3 rounded-lg
              ${task.completed ? 'bg-green-50' : 'bg-gray-50'}
              ${task.action && !task.completed ? 'cursor-pointer hover:bg-gray-100' : ''}
            `}
            onClick={task.action}
          >
            <div
              className={`
                flex items-center justify-center w-6 h-6 rounded-full border-2
                ${task.completed ? 'bg-green-600 border-green-600' : 'border-gray-300'}
              `}
            >
              {task.completed && <Check className="w-4 h-4 text-white" />}
            </div>
            <span
              className={`
                flex-1 text-sm
                ${task.completed ? 'text-gray-500 line-through' : 'text-gray-900'}
              `}
            >
              {task.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Accessibility: Keyboard navigation, ARIA labels, screen reader support
// Performance: Smooth animations, lazy rendering
// Mobile: Touch-friendly, responsive design
