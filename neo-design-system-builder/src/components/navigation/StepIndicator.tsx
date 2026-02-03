/**
 * Step Indicator
 *
 * Multi-step form/wizard progress indicator with validation states.
 * Supports linear and non-linear flows, keyboard navigation.
 *
 * @usage
 * ```tsx
 * import { StepIndicator, Step } from '@/components/navigation/StepIndicator';
 *
 * <StepIndicator
 *   currentStep={2}
 *   steps={[
 *     { label: 'Account', description: 'Create your account' },
 *     { label: 'Profile', description: 'Setup your profile' },
 *     { label: 'Settings', description: 'Configure settings' },
 *   ]}
 * />
 * ```
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, AlertCircle } from 'lucide-react';

// ==================== TYPES ====================
export interface Step {
  label: string;
  description?: string;
  icon?: React.ReactNode;
  optional?: boolean;
  error?: boolean;
  disabled?: boolean;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  orientation?: 'horizontal' | 'vertical';
  allowClickableSteps?: boolean;
  showStepNumbers?: boolean;
  className?: string;
}

interface StepItemProps {
  step: Step;
  index: number;
  currentStep: number;
  isLast: boolean;
  orientation: 'horizontal' | 'vertical';
  allowClickable: boolean;
  showNumbers: boolean;
  onClick?: (index: number) => void;
}

// ==================== STEP STATUS ====================
type StepStatus = 'completed' | 'current' | 'upcoming' | 'error';

const getStepStatus = (
  stepIndex: number,
  currentStep: number,
  hasError: boolean
): StepStatus => {
  if (hasError) return 'error';
  if (stepIndex < currentStep) return 'completed';
  if (stepIndex === currentStep) return 'current';
  return 'upcoming';
};

// ==================== STEP ITEM COMPONENT ====================
const StepItem: React.FC<StepItemProps> = ({
  step,
  index,
  currentStep,
  isLast,
  orientation,
  allowClickable,
  showNumbers,
  onClick,
}) => {
  const status = getStepStatus(index, currentStep, step.error || false);
  const isClickable = allowClickable && !step.disabled && index < currentStep;

  const statusConfig = {
    completed: {
      color: 'bg-green-600 text-white border-green-600',
      lineColor: 'bg-green-600',
      textColor: 'text-gray-900',
      icon: <Check className="w-4 h-4" />,
    },
    current: {
      color: 'bg-blue-600 text-white border-blue-600',
      lineColor: 'bg-gray-300',
      textColor: 'text-blue-600 font-semibold',
      icon: showNumbers ? index + 1 : <Circle className="w-4 h-4 fill-current" />,
    },
    upcoming: {
      color: 'bg-gray-100 text-gray-500 border-gray-300',
      lineColor: 'bg-gray-300',
      textColor: 'text-gray-500',
      icon: showNumbers ? index + 1 : <Circle className="w-4 h-4" />,
    },
    error: {
      color: 'bg-red-600 text-white border-red-600',
      lineColor: 'bg-red-600',
      textColor: 'text-red-600',
      icon: <AlertCircle className="w-4 h-4" />,
    },
  };

  const config = statusConfig[status];

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick(index);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`flex ${orientation === 'horizontal' ? 'flex-col items-center' : 'flex-row'} flex-1`}
    >
      {/* Step Circle and Connector */}
      <div className={`flex ${orientation === 'horizontal' ? 'flex-col items-center w-full' : 'flex-col items-center'}`}>
        <div className="flex items-center">
          {/* Step Circle */}
          <motion.div
            className={`
              flex items-center justify-center
              w-10 h-10 rounded-full border-2
              transition-all duration-300
              ${config.color}
              ${isClickable ? 'cursor-pointer hover:scale-110' : step.disabled ? 'opacity-50' : ''}
            `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            tabIndex={isClickable ? 0 : -1}
            role="button"
            aria-label={`Step ${index + 1}: ${step.label}`}
            aria-current={status === 'current' ? 'step' : undefined}
            aria-disabled={step.disabled}
            whileHover={isClickable ? { scale: 1.1 } : {}}
            whileTap={isClickable ? { scale: 0.95 } : {}}
          >
            {config.icon}
          </motion.div>

          {/* Connector Line */}
          {!isLast && orientation === 'horizontal' && (
            <div className="flex-1 h-0.5 mx-2 min-w-[40px]">
              <motion.div
                className={`h-full ${config.lineColor}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: status === 'completed' ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>
          )}
        </div>

        {/* Vertical Connector */}
        {!isLast && orientation === 'vertical' && (
          <div className="w-0.5 h-12 ml-5 my-1">
            <motion.div
              className={`h-full ${config.lineColor}`}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: status === 'completed' ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ transformOrigin: 'top' }}
            />
          </div>
        )}
      </div>

      {/* Step Label */}
      <div
        className={`
          ${orientation === 'horizontal' ? 'text-center mt-3' : 'ml-4 flex-1'}
        `}
      >
        <div className={`text-sm font-medium ${config.textColor}`}>
          {step.label}
          {step.optional && (
            <span className="ml-2 text-xs text-gray-400">(Optional)</span>
          )}
        </div>
        {step.description && (
          <div className="text-xs text-gray-500 mt-1">{step.description}</div>
        )}
      </div>
    </div>
  );
};

// ==================== STEP INDICATOR COMPONENT ====================
export const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep,
  onStepClick,
  orientation = 'horizontal',
  allowClickableSteps = false,
  showStepNumbers = false,
  className = '',
}) => {
  return (
    <nav
      aria-label="Progress"
      className={`
        ${orientation === 'horizontal' ? 'flex items-center' : 'flex flex-col'}
        ${className}
      `}
    >
      {steps.map((step, index) => (
        <StepItem
          key={index}
          step={step}
          index={index}
          currentStep={currentStep}
          isLast={index === steps.length - 1}
          orientation={orientation}
          allowClickable={allowClickableSteps}
          showNumbers={showStepNumbers}
          onClick={onStepClick}
        />
      ))}
    </nav>
  );
};

// ==================== COMPACT STEP INDICATOR ====================
export const CompactStepIndicator: React.FC<{
  totalSteps: number;
  currentStep: number;
  className?: string;
}> = ({ totalSteps, currentStep, className = '' }) => {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Progress Bar */}
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-blue-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Step Counter */}
      <div className="flex justify-between text-sm text-gray-600">
        <span>
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
    </div>
  );
};

// ==================== DOT INDICATOR ====================
export const DotStepIndicator: React.FC<{
  totalSteps: number;
  currentStep: number;
  onDotClick?: (index: number) => void;
  className?: string;
}> = ({ totalSteps, currentStep, onDotClick, className = '' }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <motion.button
          key={index}
          className={`
            w-2 h-2 rounded-full transition-all
            ${index === currentStep ? 'bg-blue-600 w-8' : 'bg-gray-300'}
            ${onDotClick ? 'cursor-pointer hover:bg-blue-400' : ''}
          `}
          onClick={() => onDotClick?.(index)}
          aria-label={`Go to step ${index + 1}`}
          aria-current={index === currentStep ? 'step' : undefined}
          whileHover={onDotClick ? { scale: 1.2 } : {}}
          whileTap={onDotClick ? { scale: 0.9 } : {}}
        />
      ))}
    </div>
  );
};

// ==================== WIZARD NAVIGATION ====================
export const WizardNavigation: React.FC<{
  currentStep: number;
  totalSteps: number;
  onNext?: () => void;
  onPrevious?: () => void;
  onCancel?: () => void;
  isNextDisabled?: boolean;
  isPreviousDisabled?: boolean;
  nextLabel?: string;
  previousLabel?: string;
  finishLabel?: string;
  className?: string;
}> = ({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onCancel,
  isNextDisabled = false,
  isPreviousDisabled = false,
  nextLabel = 'Next',
  previousLabel = 'Previous',
  finishLabel = 'Finish',
  className = '',
}) => {
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Previous / Cancel */}
      <div>
        {isFirstStep ? (
          onCancel && (
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              Cancel
            </button>
          )
        ) : (
          <button
            onClick={onPrevious}
            disabled={isPreviousDisabled}
            className="
              px-4 py-2 text-gray-700 hover:text-gray-900
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors
            "
          >
            {previousLabel}
          </button>
        )}
      </div>

      {/* Next / Finish */}
      <button
        onClick={onNext}
        disabled={isNextDisabled}
        className="
          px-6 py-2 bg-blue-600 text-white rounded-lg
          hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
        "
      >
        {isLastStep ? finishLabel : nextLabel}
      </button>
    </div>
  );
};

// Accessibility: ARIA labels, keyboard navigation, screen reader support
// Performance: Framer Motion animations GPU-accelerated
// Mobile: Touch-friendly, responsive design
