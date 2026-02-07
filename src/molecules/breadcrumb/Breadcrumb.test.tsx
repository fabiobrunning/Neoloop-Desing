import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "./Breadcrumb";

describe("Breadcrumb", () => {
  const renderBreadcrumb = () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Components</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  // ── Rendering ──────────────────────────────────────────────────────────

  it("renders all breadcrumb links", () => {
    render(renderBreadcrumb());
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Docs")).toBeDefined();
    expect(screen.getByText("Components")).toBeDefined();
  });

  it("renders navigation landmark", () => {
    render(renderBreadcrumb());
    expect(screen.getByRole("navigation")).toBeDefined();
  });

  it("has aria-label breadcrumb", () => {
    render(renderBreadcrumb());
    expect(screen.getByLabelText("breadcrumb")).toBeDefined();
  });

  // ── Links ──────────────────────────────────────────────────────────────

  it("renders links with correct href", () => {
    render(renderBreadcrumb());
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink?.getAttribute("href")).toBe("/");
    const docsLink = screen.getByText("Docs").closest("a");
    expect(docsLink?.getAttribute("href")).toBe("/docs");
  });

  // ── Current Page ───────────────────────────────────────────────────────

  it("marks current page with aria-current", () => {
    render(renderBreadcrumb());
    const currentPage = screen.getByText("Components");
    expect(currentPage.getAttribute("aria-current")).toBe("page");
  });

  it("marks current page as aria-disabled", () => {
    render(renderBreadcrumb());
    const currentPage = screen.getByText("Components");
    expect(currentPage.getAttribute("aria-disabled")).toBe("true");
  });

  // ── Separators ─────────────────────────────────────────────────────────

  it("renders separators as presentation role", () => {
    render(renderBreadcrumb());
    const separators = screen.getAllByRole("presentation", { hidden: true });
    expect(separators.length).toBe(2);
  });

  // ── Ellipsis ───────────────────────────────────────────────────────────

  it("renders ellipsis component", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Current</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    expect(screen.getByText("More")).toBeDefined();
  });

  // ── Custom className ───────────────────────────────────────────────────

  it("passes custom className to list", () => {
    render(
      <Breadcrumb>
        <BreadcrumbList className="custom-list">
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>,
    );
    const list = screen.getByRole("list");
    expect(list.className).toContain("custom-list");
  });
});
