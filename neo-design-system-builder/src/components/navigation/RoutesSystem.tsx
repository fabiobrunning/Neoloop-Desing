/**
 * Routes System
 *
 * React Router integration patterns with animated transitions,
 * protected routes, breadcrumbs, and scroll restoration.
 *
 * @usage
 * ```tsx
 * import { AnimatedRoutes, ProtectedRoute, ScrollToTop } from '@/components/navigation/RoutesSystem';
 *
 * <AnimatedRoutes mode="slide">
 *   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
 * </AnimatedRoutes>
 * ```
 */

import React, { useEffect } from 'react';
import { useLocation, useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PageTransition } from '../motion/Transitions';

// ==================== TYPES ====================
interface AnimatedRoutesProps {
  children: React.ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'slideUp';
  className?: string;
}

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  isAuthenticated?: boolean;
  requiredRoles?: string[];
  userRoles?: string[];
}

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  protected?: boolean;
  roles?: string[];
  children?: RouteConfig[];
}

// ==================== SCROLL TO TOP ====================
export const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// ==================== SCROLL RESTORATION ====================
export const ScrollRestoration: React.FC<{
  enabled?: boolean;
}> = ({ enabled = true }) => {
  const location = useLocation();

  useEffect(() => {
    if (!enabled) return;

    // Save scroll position before navigation
    const handleScroll = () => {
      sessionStorage.setItem(
        `scroll-${location.pathname}`,
        JSON.stringify({
          x: window.scrollX,
          y: window.scrollY,
        })
      );
    };

    window.addEventListener('scroll', handleScroll);

    // Restore scroll position after navigation
    const savedPosition = sessionStorage.getItem(`scroll-${location.pathname}`);
    if (savedPosition) {
      const { x, y } = JSON.parse(savedPosition);
      window.scrollTo(x, y);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname, enabled]);

  return null;
};

// ==================== ANIMATED ROUTES ====================
export const AnimatedRoutes: React.FC<AnimatedRoutesProps> = ({
  children,
  mode = 'fade',
  className = '',
}) => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname} mode={mode} className={className}>
        {children}
      </PageTransition>
    </AnimatePresence>
  );
};

// ==================== PROTECTED ROUTE ====================
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  isAuthenticated = false,
  requiredRoles = [],
  userRoles = [],
}) => {
  const location = useLocation();

  // Check authentication
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Check role permissions
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some((role) => userRoles.includes(role));
    if (!hasRequiredRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

// ==================== ROUTE GUARD ====================
export const RouteGuard: React.FC<{
  children: React.ReactNode;
  condition: boolean;
  fallback: React.ReactNode;
}> = ({ children, condition, fallback }) => {
  return condition ? <>{children}</> : <>{fallback}</>;
};

// ==================== LAZY ROUTE ====================
export const LazyRoute: React.FC<{
  loader: () => Promise<{ default: React.ComponentType }>;
  fallback?: React.ReactNode;
}> = ({ loader, fallback = <div>Loading...</div> }) => {
  const LazyComponent = React.lazy(loader);

  return (
    <React.Suspense fallback={fallback}>
      <LazyComponent />
    </React.Suspense>
  );
};

// ==================== ROUTE BREADCRUMBS ====================
export const useRouteBreadcrumbs = (routes: RouteConfig[]) => {
  const location = useLocation();

  const getBreadcrumbs = (): Array<{ path: string; label: string }> => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: Array<{ path: string; label: string }> = [];

    let currentPath = '';
    let currentRoutes = routes;

    for (const segment of pathSegments) {
      currentPath += `/${segment}`;

      const route = currentRoutes.find((r) => {
        const routePath = r.path.replace(/^\//, '');
        return routePath === segment || routePath.startsWith(`:${segment}`);
      });

      if (route) {
        breadcrumbs.push({
          path: currentPath,
          label: route.label || segment,
        });

        if (route.children) {
          currentRoutes = route.children;
        }
      }
    }

    return breadcrumbs;
  };

  return getBreadcrumbs();
};

// ==================== NAVIGATION HISTORY ====================
export const useNavigationHistory = (maxHistory = 10) => {
  const location = useLocation();
  const [history, setHistory] = React.useState<string[]>([]);

  useEffect(() => {
    setHistory((prev) => {
      const newHistory = [...prev, location.pathname].slice(-maxHistory);
      return newHistory;
    });
  }, [location.pathname, maxHistory]);

  const canGoBack = history.length > 1;
  const previousPath = history[history.length - 2];

  return {
    history,
    canGoBack,
    previousPath,
  };
};

// ==================== ROUTE CHANGE TRACKER ====================
export const RouteChangeTracker: React.FC<{
  onRouteChange?: (pathname: string) => void;
  analytics?: (pathname: string) => void;
}> = ({ onRouteChange, analytics }) => {
  const location = useLocation();

  useEffect(() => {
    onRouteChange?.(location.pathname);
    analytics?.(location.pathname);

    // Example: Google Analytics page view
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', 'GA_MEASUREMENT_ID', {
        page_path: location.pathname,
      });
    }
  }, [location.pathname, onRouteChange, analytics]);

  return null;
};

// ==================== REDIRECT WITH DELAY ====================
export const DelayedRedirect: React.FC<{
  to: string;
  delay?: number;
  children?: React.ReactNode;
}> = ({ to, delay = 3000, children }) => {
  const [shouldRedirect, setShouldRedirect] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRedirect(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (shouldRedirect) {
      navigate(to);
    }
  }, [shouldRedirect, to, navigate]);

  return <>{children}</>;
};

// ==================== NOT FOUND ROUTE ====================
export const NotFoundRoute: React.FC<{
  title?: string;
  message?: string;
  redirectTo?: string;
  redirectDelay?: number;
}> = ({
  title = '404 - Page Not Found',
  message = 'The page you are looking for does not exist.',
  redirectTo = '/',
  redirectDelay,
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{message}</p>
        <button
          onClick={handleGoHome}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </button>
        {redirectDelay && (
          <DelayedRedirect to={redirectTo} delay={redirectDelay}>
            <p className="text-sm text-gray-500 mt-4">
              Redirecting in {redirectDelay / 1000} seconds...
            </p>
          </DelayedRedirect>
        )}
      </div>
    </div>
  );
};

// ==================== ROUTE LOADER ====================
export const RouteLoader: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  loader?: React.ReactNode;
}> = ({
  isLoading,
  children,
  loader = (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
}) => {
  return isLoading ? <>{loader}</> : <>{children}</>;
};

// ==================== ROUTE TRANSITION PROVIDER ====================
export const RouteTransitionProvider: React.FC<{
  children: React.ReactNode;
  mode?: 'fade' | 'slide' | 'scale' | 'slideUp';
  enableScrollRestoration?: boolean;
  enableScrollToTop?: boolean;
  onRouteChange?: (pathname: string) => void;
}> = ({
  children,
  mode = 'fade',
  enableScrollRestoration = false,
  enableScrollToTop = true,
  onRouteChange,
}) => {
  return (
    <>
      {enableScrollToTop && <ScrollToTop />}
      {enableScrollRestoration && <ScrollRestoration />}
      {onRouteChange && <RouteChangeTracker onRouteChange={onRouteChange} />}
      <AnimatedRoutes mode={mode}>{children}</AnimatedRoutes>
    </>
  );
};

// ==================== HELPER: GENERATE ROUTES ====================
export const generateRoutes = (config: RouteConfig[]): React.ReactNode => {
  return config.map((route) => {
    const element = route.protected ? (
      <ProtectedRoute requiredRoles={route.roles}>{route.element}</ProtectedRoute>
    ) : (
      route.element
    );

    return (
      <Route key={route.path} path={route.path} element={element}>
        {route.children && generateRoutes(route.children)}
      </Route>
    );
  });
};

// Usage Example:
// const routeConfig: RouteConfig[] = [
//   {
//     path: '/',
//     element: <Home />,
//     label: 'Home',
//   },
//   {
//     path: '/dashboard',
//     element: <Dashboard />,
//     label: 'Dashboard',
//     protected: true,
//     roles: ['user', 'admin'],
//   },
// ];
//
// <Routes>
//   {generateRoutes(routeConfig)}
// </Routes>

export default {
  ScrollToTop,
  ScrollRestoration,
  AnimatedRoutes,
  ProtectedRoute,
  RouteGuard,
  LazyRoute,
  useRouteBreadcrumbs,
  useNavigationHistory,
  RouteChangeTracker,
  DelayedRedirect,
  NotFoundRoute,
  RouteLoader,
  RouteTransitionProvider,
  generateRoutes,
};
