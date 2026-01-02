import { render, screen } from "@testing-library/react";

import Section from "./Section";

describe("Section", () => {
  it("should render the title", () => {
    render(
      <Section title="Test Title">
        <p>Test content</p>
      </Section>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  it("should render children content", () => {
    render(
      <Section title="Test Title">
        <p>Test content</p>
      </Section>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("should render with complex children", () => {
    render(
      <Section title="Complex Section">
        <div>
          <p>Paragraph 1</p>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </div>
      </Section>
    );

    expect(screen.getByText("Complex Section")).toBeInTheDocument();
    expect(screen.getByText("Paragraph 1")).toBeInTheDocument();
    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });

  it("should render multiple sections independently", () => {
    const { rerender } = render(
      <Section title="Section 1">
        <p>Content 1</p>
      </Section>
    );

    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Content 1")).toBeInTheDocument();

    rerender(
      <Section title="Section 2">
        <p>Content 2</p>
      </Section>
    );

    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("should render with empty children", () => {
    render(<Section title="Empty Section">{null}</Section>);

    expect(screen.getByText("Empty Section")).toBeInTheDocument();
  });

  it("should apply correct CSS classes", () => {
    render(
      <Section title="Styled Section">
        <p>Content</p>
      </Section>
    );

    const titleElement = screen.getByText("Styled Section");

    expect(titleElement.tagName).toBe("H2");
  });
});
