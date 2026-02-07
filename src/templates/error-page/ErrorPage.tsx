import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface ErrorPageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** HTTP status code */
  statusCode?: number;
  /** Error title */
  title?: string;
  /** Error description */
  description?: string;
  /** Custom illustration or icon */
  illustration?: React.ReactNode;
  /** Primary action (e.g., "Go Home" button) */
  primaryAction?: React.ReactNode;
  /** Secondary action (e.g., "Go Back" button) */
  secondaryAction?: React.ReactNode;
}

/* ── Default Illustrations ────────────────────────────────────────────── */

function Default404() {
  return (
    <div className="text-8xl font-display font-bold text-primary/20" aria-hidden="true">
      404
    </div>
  );
}

function Default500() {
  return (
    <div className="text-8xl font-display font-bold text-error/20" aria-hidden="true">
      500
    </div>
  );
}

function defaultIllustration(code?: number) {
  if (code === 500) return <Default500 />;
  return <Default404 />;
}

function defaultTitle(code?: number) {
  if (code === 500) return "Internal Server Error";
  if (code === 403) return "Forbidden";
  return "Page Not Found";
}

function defaultDescription(code?: number) {
  if (code === 500)
    return "Something went wrong on our end. Please try again later.";
  if (code === 403)
    return "You don't have permission to access this page.";
  return "The page you're looking for doesn't exist or has been moved.";
}

/* ── ErrorPage ────────────────────────────────────────────────────────── */

const ErrorPage = React.forwardRef<HTMLDivElement, ErrorPageProps>(
  (
    {
      statusCode = 404,
      title,
      description,
      illustration,
      primaryAction,
      secondaryAction,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedTitle = title ?? defaultTitle(statusCode);
    const resolvedDescription = description ?? defaultDescription(statusCode);
    const resolvedIllustration = illustration ?? defaultIllustration(statusCode);

    return (
      <div
        ref={ref}
        className={cn(
          "flex min-h-screen flex-col items-center justify-center bg-bg-base px-6 text-center",
          className,
        )}
        role="alert"
        {...props}
      >
        {/* Illustration */}
        <div className="mb-6">{resolvedIllustration}</div>

        {/* Text */}
        <h1 className="text-3xl font-semibold text-text-primary mb-2">
          {resolvedTitle}
        </h1>
        <p className="max-w-md text-text-muted mb-8">{resolvedDescription}</p>

        {/* Actions */}
        {(primaryAction || secondaryAction) && (
          <div className="flex items-center gap-3">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    );
  },
);

ErrorPage.displayName = "ErrorPage";

export { ErrorPage };
