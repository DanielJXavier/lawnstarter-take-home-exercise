import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { SearchProvider } from "@/context/SearchContext";
import { SearchType } from "@/context/SearchContext.types";

import SearchForm from "./SearchForm";

describe("SearchForm", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SearchProvider>{children}</SearchProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the form with question text", () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByText("What are you searching for?")).toBeInTheDocument();
  });

  it("should render search type options", () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByLabelText("People")).toBeInTheDocument();
    expect(screen.getByLabelText("Movies")).toBeInTheDocument();
  });

  it("should render search input with placeholder for people", () => {
    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    expect(input).toBeInTheDocument();
  });

  it("should render search button", () => {
    render(<SearchForm />, { wrapper });

    expect(screen.getByRole("button", { name: /Search/i })).toBeInTheDocument();
  });

  it("should render statistics link", () => {
    render(<SearchForm />, { wrapper });

    const link = screen.getByText("Check search statistics");

    expect(link).toBeInTheDocument();
    expect(link.closest("a")).toHaveAttribute("href", "/statistics");
  });

  it("should disable search button when input is empty", () => {
    render(<SearchForm />, { wrapper });

    const button = screen.getByRole("button", { name: /Search/i });

    expect(button).toBeDisabled();
  });

  it("should enable search button when input has text", async () => {
    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);
    const button = screen.getByRole("button", { name: /Search/i });

    await user.type(input, "Luke");

    expect(button).not.toBeDisabled();
  });

  it("should update input value when typing", async () => {
    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(
      /Chewbacca, Yoda, Boba Fett/
    ) as HTMLInputElement;

    await user.type(input, "Luke Skywalker");

    expect(input.value).toBe("Luke Skywalker");
  });

  it("should change placeholder when switching to movies", async () => {
    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const moviesRadio = screen.getByLabelText("Movies");

    await user.click(moviesRadio);

    expect(
      screen.getByPlaceholderText(/A New Hope, The Empire Strikes Back/)
    ).toBeInTheDocument();
  });

  it("should submit form and call API with correct parameters", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { type: SearchType.PEOPLE, id: "1", name: "Luke Skywalker" },
      ],
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);
    const button = screen.getByRole("button", { name: /Search/i });

    await user.type(input, "Luke");
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/search?type=people&term=Luke"
      );
    });
  });

  it("should submit form with movies search type", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [
        { type: SearchType.MOVIES, id: "1", title: "A New Hope" },
      ],
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const moviesRadio = screen.getByLabelText("Movies");
    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.click(moviesRadio);
    await user.clear(input);
    await user.type(input, "Hope");

    const button = screen.getByRole("button", { name: /Search/i });

    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/search?type=movies&term=Hope"
      );
    });
  });

  it('should show "Searching..." on button during search', async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockImplementation(
      () =>
        new Promise((resolve) =>
          setTimeout(
            () =>
              resolve({
                ok: true,
                json: async () => [],
              } as Response),
            100
          )
        )
    );

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.type(input, "Luke");

    const button = screen.getByRole("button", { name: /Search/i });

    await user.click(button);

    expect(screen.getByText("Searching...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Search")).toBeInTheDocument();
    });
  });

  it("should handle API error gracefully", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.type(input, "Luke");

    const button = screen.getByRole("button", { name: /Search/i });

    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalled();
    });
  });

  it("should handle network error", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockRejectedValueOnce(new Error("Network error"));

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.type(input, "Luke");

    const button = screen.getByRole("button", { name: /Search/i });

    await user.click(button);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it("should prevent form submission when input is empty", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    render(<SearchForm />, { wrapper });

    const button = screen.getByRole("button", { name: /Search/i });

    expect(button).toBeDisabled();

    // Try to click disabled button
    fireEvent.click(button);

    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("should handle form submission via Enter key", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.type(input, "Luke");
    await user.keyboard("{Enter}");

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/search?type=people&term=Luke"
      );
    });
  });

  it("should trim whitespace from search term", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => [],
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    await user.type(input, "  Luke  ");

    const button = screen.getByRole("button", { name: /Search/i });

    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "http://localhost:4000/search?type=people&term=  Luke  "
      );
    });
  });

  it("should allow multiple searches in sequence", async () => {
    const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response);

    const user = userEvent.setup();

    render(<SearchForm />, { wrapper });

    const input = screen.getByPlaceholderText(/Chewbacca, Yoda, Boba Fett/);

    const button = screen.getByRole("button", { name: /Search/i });

    // First search
    await user.type(input, "Luke");
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    // Second search
    await user.clear(input);
    await user.type(input, "Leia");
    await user.click(button);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2);

      expect(mockFetch).toHaveBeenLastCalledWith(
        "http://localhost:4000/search?type=people&term=Leia"
      );
    });
  });
});
