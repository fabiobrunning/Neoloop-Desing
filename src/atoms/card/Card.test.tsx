import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";

describe("Card", () => {
  it("renders Card root", () => {
    render(<Card data-testid="card">Content</Card>);
    expect(screen.getByTestId("card")).toBeDefined();
    expect(screen.getByText("Content")).toBeDefined();
  });

  it("renders full card composition", () => {
    render(
      <Card data-testid="card">
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Body content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeDefined();
    expect(screen.getByText("Description")).toBeDefined();
    expect(screen.getByText("Body content")).toBeDefined();
    expect(screen.getByText("Footer")).toBeDefined();
  });

  it("CardTitle renders as h3", () => {
    render(<CardTitle>Heading</CardTitle>);
    const heading = screen.getByText("Heading");
    expect(heading.tagName).toBe("H3");
  });

  it("passes custom className to Card", () => {
    render(
      <Card data-testid="card" className="custom-card">
        Test
      </Card>,
    );
    expect(screen.getByTestId("card").className).toContain("custom-card");
  });

  it("passes custom className to CardHeader", () => {
    render(
      <CardHeader data-testid="header" className="custom-header">
        Header
      </CardHeader>,
    );
    expect(screen.getByTestId("header").className).toContain("custom-header");
  });

  it("passes custom className to CardContent", () => {
    render(
      <CardContent data-testid="content" className="custom-content">
        Content
      </CardContent>,
    );
    expect(screen.getByTestId("content").className).toContain("custom-content");
  });

  it("passes custom className to CardFooter", () => {
    render(
      <CardFooter data-testid="footer" className="custom-footer">
        Footer
      </CardFooter>,
    );
    expect(screen.getByTestId("footer").className).toContain("custom-footer");
  });

  it("forwards ref on Card", () => {
    const refCallback = vi.fn();
    render(<Card ref={refCallback}>Ref</Card>);
    expect(refCallback).toHaveBeenCalled();
    const el = refCallback.mock.calls[0][0] as HTMLDivElement;
    expect(el.tagName).toBe("DIV");
  });
});
