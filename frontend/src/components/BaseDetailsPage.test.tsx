import { render, screen } from "@testing-library/react";

import BaseDetailsPage from "./BaseDetailsPage";

describe("BaseDetailsPage", () => {
  it("should render the title", () => {
    render(
      <BaseDetailsPage title="Luke Skywalker">
        <div>Test content</div>
      </BaseDetailsPage>
    );

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("should render children content", () => {
    render(
      <BaseDetailsPage title="Test Title">
        <p>Test children content</p>
      </BaseDetailsPage>
    );

    expect(screen.getByText("Test children content")).toBeInTheDocument();
  });

  it("should render with multiple children", () => {
    render(
      <BaseDetailsPage title="Character Details">
        <div>Section 1</div>
        <div>Section 2</div>
        <div>Section 3</div>
      </BaseDetailsPage>
    );

    expect(screen.getByText("Character Details")).toBeInTheDocument();
    expect(screen.getByText("Section 1")).toBeInTheDocument();
    expect(screen.getByText("Section 2")).toBeInTheDocument();
    expect(screen.getByText("Section 3")).toBeInTheDocument();
  });

  it("should render with long title", () => {
    const longTitle =
      "This is a very long title that might wrap to multiple lines";

    render(
      <BaseDetailsPage title={longTitle}>
        <div>Content</div>
      </BaseDetailsPage>
    );

    expect(screen.getByText(longTitle)).toBeInTheDocument();
  });

  it("should render title as h1 element", () => {
    render(
      <BaseDetailsPage title="Test Title">
        <div>Content</div>
      </BaseDetailsPage>
    );

    const titleElement = screen.getByText("Test Title");

    expect(titleElement.tagName).toBe("H1");
  });
});
