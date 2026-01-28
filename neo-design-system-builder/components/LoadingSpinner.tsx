import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * LoadingSpinner - Fallback component for React.lazy() Suspense
 * Used during lazy loading of heavy components like IconsView, ChartsView, etc.
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Carregando...',
  size = 'lg'
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div className="flex flex-col items-center justify-center py-24 px-8">
      <div className="relative">
        {/* Outer glow ring */}
        <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />

        {/* Spinner */}
        <div className={`relative ${sizeClasses[size]} text-blue-600`}>
          <Loader2 className="w-full h-full animate-spin" />
        </div>
      </div>

      {/* Loading text */}
      <p className={`mt-6 font-bold text-slate-700 ${textSizes[size]}`}>
        {message}
      </p>

      {/* Animated dots */}
      <div className="flex gap-1 mt-2">
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>

      {/* Skeleton preview (optional visual feedback) */}
      <div className="mt-8 w-full max-w-md space-y-3 opacity-30">
        <div className="h-4 bg-slate-200 rounded animate-pulse" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
