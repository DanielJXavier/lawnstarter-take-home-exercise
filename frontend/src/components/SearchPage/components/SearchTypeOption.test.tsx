import { render, screen } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { SearchProvider } from "@/context/SearchContext";
import { SearchType } from "@/context/SearchContext.types";

import SearchTypeOption from "./SearchTypeOption";

describe("SearchTypeOption", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SearchProvider>{children}</SearchProvider>
  );

  it("should render radio input for People option", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /People/i });

    expect(radio).toBeInTheDocument();
  });

  it("should render radio input for Movies option", () => {
    render(<SearchTypeOption option={SearchType.MOVIES} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /Movies/i });

    expect(radio).toBeInTheDocument();
  });

  it("should render label with capitalized text for people", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    expect(screen.getByText("People")).toBeInTheDocument();
  });

  it("should render label with capitalized text for movies", () => {
    render(<SearchTypeOption option={SearchType.MOVIES} />, { wrapper });

    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  it("should have People option checked by default", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /People/i });

    expect(radio).toBeChecked();
  });

  it("should have Movies option unchecked by default", () => {
    render(<SearchTypeOption option={SearchType.MOVIES} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /Movies/i });

    expect(radio).not.toBeChecked();
  });

  it("should check Movies option when clicked", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTypeOption option={SearchType.PEOPLE} />
        <SearchTypeOption option={SearchType.MOVIES} />
      </>,
      { wrapper }
    );

    const moviesRadio = screen.getByRole("radio", { name: /Movies/i });

    await user.click(moviesRadio);

    // After clicking, Movies should be checked
    expect(moviesRadio).toBeChecked();
  });

  it("should check People option when clicked", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTypeOption option={SearchType.PEOPLE} />
        <SearchTypeOption option={SearchType.MOVIES} />
      </>,
      { wrapper }
    );

    const moviesRadio = screen.getByRole("radio", { name: /Movies/i });
    const peopleRadio = screen.getByRole("radio", { name: /People/i });

    // Click movies first
    await user.click(moviesRadio);

    expect(moviesRadio).toBeChecked();

    // Then click people
    await user.click(peopleRadio);

    expect(peopleRadio).toBeChecked();
    expect(moviesRadio).not.toBeChecked();
  });

  it("should associate label with radio input", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const label = screen.getByText("People");
    const radio = screen.getByRole("radio", { name: /People/i });

    expect(label).toHaveAttribute("for", SearchType.PEOPLE);
    expect(radio).toHaveAttribute("id", SearchType.PEOPLE);
  });

  it("should allow label click to select option", async () => {
    const user = userEvent.setup();

    render(<SearchTypeOption option={SearchType.MOVIES} />, { wrapper });

    const label = screen.getByText("Movies");
    const radio = screen.getByRole("radio", { name: /Movies/i });

    await user.click(label);

    expect(radio).toBeChecked();
  });

  it("should have radio type attribute", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /People/i });

    expect(radio).toHaveAttribute("type", "radio");
  });

  it("should have correct name attribute", () => {
    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /People/i });

    expect(radio).toHaveAttribute("name", SearchType.PEOPLE);
  });

  it("should render both options together in a radio group", () => {
    render(
      <>
        <SearchTypeOption option={SearchType.PEOPLE} />
        <SearchTypeOption option={SearchType.MOVIES} />
      </>,
      { wrapper }
    );

    const peopleRadio = screen.getByRole("radio", { name: /People/i });
    const moviesRadio = screen.getByRole("radio", { name: /Movies/i });

    expect(peopleRadio).toBeInTheDocument();
    expect(moviesRadio).toBeInTheDocument();
    expect(peopleRadio).toBeChecked();
    expect(moviesRadio).not.toBeChecked();
  });

  it("should only have one option checked at a time", async () => {
    const user = userEvent.setup();

    render(
      <>
        <SearchTypeOption option={SearchType.PEOPLE} />
        <SearchTypeOption option={SearchType.MOVIES} />
      </>,
      { wrapper }
    );

    const peopleRadio = screen.getByRole("radio", { name: /People/i });
    const moviesRadio = screen.getByRole("radio", { name: /Movies/i });

    // Initially people is checked
    expect(peopleRadio).toBeChecked();
    expect(moviesRadio).not.toBeChecked();

    // Click movies
    await user.click(moviesRadio);

    expect(peopleRadio).not.toBeChecked();
    expect(moviesRadio).toBeChecked();

    // Click people again
    await user.click(peopleRadio);

    expect(peopleRadio).toBeChecked();
    expect(moviesRadio).not.toBeChecked();
  });

  it("should maintain checked state after multiple clicks on same option", async () => {
    const user = userEvent.setup();

    render(<SearchTypeOption option={SearchType.PEOPLE} />, { wrapper });

    const radio = screen.getByRole("radio", { name: /People/i });

    expect(radio).toBeChecked();

    await user.click(radio);

    expect(radio).toBeChecked();

    await user.click(radio);

    expect(radio).toBeChecked();
  });
});
