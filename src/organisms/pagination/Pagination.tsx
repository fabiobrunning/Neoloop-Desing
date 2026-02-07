import * as React from "react";
import { cn } from "../../lib/utils";

/* ── Types ────────────────────────────────────────────────────────────── */

export interface PaginationProps {
  /** Current page (1-based) */
  page: number;
  /** Total number of pages */
  totalPages: number;
  /** Page change handler */
  onPageChange: (page: number) => void;
  /** Number of sibling pages to show around current */
  siblingCount?: number;
  /** Additional class names */
  className?: string;
}

/* ── Helpers ──────────────────────────────────────────────────────────── */

function range(start: number, end: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i++) result.push(i);
  return result;
}

function usePaginationRange(
  page: number,
  totalPages: number,
  siblingCount: number,
) {
  const totalPageNumbers = siblingCount * 2 + 5; // siblings + first + last + current + 2 dots

  if (totalPageNumbers >= totalPages) {
    return range(1, totalPages);
  }

  const leftSiblingIndex = Math.max(page - siblingCount, 1);
  const rightSiblingIndex = Math.min(page + siblingCount, totalPages);

  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "dots" as const, totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [1, "dots" as const, ...rightRange];
  }

  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [1, "dots" as const, ...middleRange, "dots" as const, totalPages];
}

/* ── Arrow Icons ──────────────────────────────────────────────────────── */

function ChevronLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

/* ── Pagination ───────────────────────────────────────────────────────── */

const Pagination = React.forwardRef<HTMLElement, PaginationProps>(
  ({ page, totalPages, onPageChange, siblingCount = 1, className }, ref) => {
    const pages = usePaginationRange(page, totalPages, siblingCount);

    if (totalPages <= 1) return null;

    return (
      <nav ref={ref} aria-label="pagination" className={cn("flex items-center gap-1", className)}>
        {/* Previous */}
        <button
          type="button"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm",
            "transition-colors duration-fast",
            page === 1
              ? "pointer-events-none opacity-50 text-text-muted"
              : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
          )}
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </button>

        {/* Page buttons */}
        {pages.map((p, i) =>
          p === "dots" ? (
            <span
              key={`dots-${i}`}
              className="inline-flex h-9 w-9 items-center justify-center text-text-muted text-sm"
              aria-hidden="true"
            >
              ...
            </span>
          ) : (
            <button
              key={p}
              type="button"
              className={cn(
                "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm font-medium",
                "transition-colors duration-fast",
                p === page
                  ? "bg-primary text-text-inverse"
                  : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
              )}
              onClick={() => onPageChange(p as number)}
              aria-current={p === page ? "page" : undefined}
              aria-label={`Page ${p}`}
            >
              {p}
            </button>
          ),
        )}

        {/* Next */}
        <button
          type="button"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center rounded-md text-sm",
            "transition-colors duration-fast",
            page === totalPages
              ? "pointer-events-none opacity-50 text-text-muted"
              : "text-text-secondary hover:bg-bg-surface hover:text-text-primary",
          )}
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <ChevronRight />
        </button>
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";

export { Pagination };
