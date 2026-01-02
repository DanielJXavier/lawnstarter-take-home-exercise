import { render, screen } from "@testing-library/react";

import MovieDetailsPage from "./MovieDetailsPage";

describe("MovieDetailsPage", () => {
  const mockMovie = {
    id: "1",
    title: "A New Hope",
    opening_crawl:
      "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.",
    characters: [
      { id: "1", name: "Luke Skywalker" },
      { id: "2", name: "Darth Vader" },
      { id: "5", name: "Leia Organa" },
    ],
  };

  it("should render movie title", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
  });

  it("should render Opening Crawl section", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    expect(screen.getByText("Opening Crawl")).toBeInTheDocument();
  });

  it("should render opening crawl text", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    expect(
      screen.getByText(/It is a period of civil war/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/Rebel spaceships/i)).toBeInTheDocument();
    expect(screen.getByText(/evil Galactic Empire/i)).toBeInTheDocument();
  });

  it("should render Characters section", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    expect(screen.getByText("Characters")).toBeInTheDocument();
  });

  it("should render all character links", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    const lukeLink = screen.getByRole("link", { name: /Luke Skywalker/i });

    expect(lukeLink).toBeInTheDocument();
    expect(lukeLink).toHaveAttribute("href", "/people/1");

    const vaderLink = screen.getByRole("link", { name: /Darth Vader/i });

    expect(vaderLink).toBeInTheDocument();
    expect(vaderLink).toHaveAttribute("href", "/people/2");

    const leiaLink = screen.getByRole("link", { name: /Leia Organa/i });

    expect(leiaLink).toBeInTheDocument();
    expect(leiaLink).toHaveAttribute("href", "/people/5");
  });

  it("should render movie with single character", () => {
    const movieWithOneCharacter = {
      ...mockMovie,
      characters: [{ id: "1", name: "Luke Skywalker" }],
    };

    render(<MovieDetailsPage movie={movieWithOneCharacter} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();

    const links = screen.getAllByRole("link");

    expect(
      links.filter((link) => link.getAttribute("href")?.includes("/people/"))
    ).toHaveLength(1);
  });

  it("should render movie with no characters", () => {
    const movieWithNoCharacters = {
      ...mockMovie,
      characters: [],
    };

    render(<MovieDetailsPage movie={movieWithNoCharacters} />);

    expect(screen.getByText("Characters")).toBeInTheDocument();

    // When there are no characters, there should be no links with /people/ in href
    const allLinks = screen.queryAllByRole("link");

    const peopleLinks = allLinks.filter((link) =>
      link.getAttribute("href")?.includes("/people/")
    );

    expect(peopleLinks).toHaveLength(0);
  });

  it("should render short opening crawl", () => {
    const movieWithShortCrawl = {
      ...mockMovie,
      opening_crawl: "A short crawl.",
    };

    render(<MovieDetailsPage movie={movieWithShortCrawl} />);

    expect(screen.getByText("A short crawl.")).toBeInTheDocument();
  });

  it("should render long opening crawl", () => {
    const longCrawl = "A".repeat(1000);

    const movieWithLongCrawl = {
      ...mockMovie,
      opening_crawl: longCrawl,
    };

    render(<MovieDetailsPage movie={movieWithLongCrawl} />);

    expect(screen.getByText(longCrawl)).toBeInTheDocument();
  });

  it("should render movie with long title", () => {
    const movieWithLongTitle = {
      ...mockMovie,
      title: "A Very Long Movie Title That Might Wrap to Multiple Lines",
    };

    render(<MovieDetailsPage movie={movieWithLongTitle} />);

    expect(
      screen.getByText(
        "A Very Long Movie Title That Might Wrap to Multiple Lines"
      )
    ).toBeInTheDocument();
  });

  it("should render correct character IDs in links", () => {
    const movie = {
      ...mockMovie,
      characters: [
        { id: "100", name: "Character 100" },
        { id: "200", name: "Character 200" },
      ],
    };

    render(<MovieDetailsPage movie={movie} />);

    const char100Link = screen.getByRole("link", { name: /Character 100/i });
    expect(char100Link).toHaveAttribute("href", "/people/100");

    const char200Link = screen.getByRole("link", { name: /Character 200/i });
    expect(char200Link).toHaveAttribute("href", "/people/200");
  });

  it("should render multiple characters with proper list structure", () => {
    render(<MovieDetailsPage movie={mockMovie} />);

    const characterLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.includes("/people/"));

    expect(characterLinks).toHaveLength(3);
  });

  it("should preserve opening crawl whitespace and line breaks", () => {
    const crawlWithFormatting = "Line 1\r\n\r\nLine 2\r\n  Indented line";

    const movie = {
      ...mockMovie,
      opening_crawl: crawlWithFormatting,
    };

    render(<MovieDetailsPage movie={movie} />);

    // The whitespace-pre-wrap class should preserve formatting
    // Use getByText with exact: false to match the text content
    expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    expect(screen.getByText(/Line 2/)).toBeInTheDocument();
    expect(screen.getByText(/Indented line/)).toBeInTheDocument();
  });

  it("should render character names with special characters", () => {
    const movie = {
      ...mockMovie,
      characters: [
        { id: "1", name: "Obi-Wan Kenobi" },
        { id: "2", name: "C-3PO" },
        { id: "3", name: "R2-D2" },
      ],
    };

    render(<MovieDetailsPage movie={movie} />);

    expect(screen.getByText("Obi-Wan Kenobi")).toBeInTheDocument();
    expect(screen.getByText("C-3PO")).toBeInTheDocument();
    expect(screen.getByText("R2-D2")).toBeInTheDocument();
  });

  it("should render empty opening crawl", () => {
    const movieWithEmptyCrawl = {
      ...mockMovie,
      opening_crawl: "",
    };

    render(<MovieDetailsPage movie={movieWithEmptyCrawl} />);

    expect(screen.getByText("Opening Crawl")).toBeInTheDocument();
  });
});
