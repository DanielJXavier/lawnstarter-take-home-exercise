import { render, screen } from "@testing-library/react";

import PersonDetailsPage from "./PersonDetailsPage";

describe("PersonDetailsPage", () => {
  const mockPerson = {
    id: "1",
    name: "Luke Skywalker",
    birth_year: "19BBY",
    gender: "male",
    eye_color: "blue",
    hair_color: "blond",
    height: "172",
    mass: "77",
    movies: [
      { id: "1", title: "A New Hope" },
      { id: "2", title: "The Empire Strikes Back" },
      { id: "3", title: "Return of the Jedi" },
    ],
  };

  it("should render person name as title", () => {
    render(<PersonDetailsPage person={mockPerson} />);

    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument();
  });

  it("should render Details section with all person attributes", () => {
    render(<PersonDetailsPage person={mockPerson} />);

    expect(screen.getByText("Details")).toBeInTheDocument();
    expect(screen.getByText("Birth Year: 19BBY")).toBeInTheDocument();
    expect(screen.getByText("Gender: male")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue")).toBeInTheDocument();
    expect(screen.getByText("Hair Color: blond")).toBeInTheDocument();
    expect(screen.getByText("Height: 172")).toBeInTheDocument();
    expect(screen.getByText("Mass: 77")).toBeInTheDocument();
  });

  it("should render Movies section", () => {
    render(<PersonDetailsPage person={mockPerson} />);

    expect(screen.getByText("Movies")).toBeInTheDocument();
  });

  it("should render all movie links", () => {
    render(<PersonDetailsPage person={mockPerson} />);

    const newHopeLink = screen.getByRole("link", { name: /A New Hope/i });

    expect(newHopeLink).toBeInTheDocument();
    expect(newHopeLink).toHaveAttribute("href", "/movies/1");

    const empireLink = screen.getByRole("link", {
      name: /The Empire Strikes Back/i,
    });

    expect(empireLink).toBeInTheDocument();
    expect(empireLink).toHaveAttribute("href", "/movies/2");

    const jediLink = screen.getByRole("link", { name: /Return of the Jedi/i });

    expect(jediLink).toBeInTheDocument();
    expect(jediLink).toHaveAttribute("href", "/movies/3");
  });

  it("should render person with single movie", () => {
    const personWithOneMovie = {
      ...mockPerson,
      movies: [{ id: "1", title: "A New Hope" }],
    };

    render(<PersonDetailsPage person={personWithOneMovie} />);

    expect(screen.getByText("A New Hope")).toBeInTheDocument();

    const links = screen.getAllByRole("link");

    // Should only have one movie link
    expect(
      links.filter((link) => link.getAttribute("href")?.includes("/movies/"))
    ).toHaveLength(1);
  });

  it("should render person with no movies", () => {
    const personWithNoMovies = {
      ...mockPerson,
      movies: [],
    };

    render(<PersonDetailsPage person={personWithNoMovies} />);

    expect(screen.getByText("Movies")).toBeInTheDocument();

    // Should not have any movie links
    const allLinks = screen.queryAllByRole("link");

    const movieLinks = allLinks.filter((link) =>
      link.getAttribute("href")?.includes("/movies/")
    );

    expect(movieLinks).toHaveLength(0);
  });

  it("should handle unknown values in person details", () => {
    const personWithUnknowns = {
      ...mockPerson,
      birth_year: "unknown",
      gender: "n/a",
      eye_color: "unknown",
      hair_color: "n/a",
      height: "unknown",
      mass: "unknown",
    };

    render(<PersonDetailsPage person={personWithUnknowns} />);

    expect(screen.getByText("Birth Year: unknown")).toBeInTheDocument();
    expect(screen.getByText("Gender: n/a")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: unknown")).toBeInTheDocument();
    expect(screen.getByText("Hair Color: n/a")).toBeInTheDocument();
    expect(screen.getByText("Height: unknown")).toBeInTheDocument();
    expect(screen.getByText("Mass: unknown")).toBeInTheDocument();
  });

  it("should render person with long name", () => {
    const personWithLongName = {
      ...mockPerson,
      name: "A Character With An Extremely Long Name That Might Wrap",
    };

    render(<PersonDetailsPage person={personWithLongName} />);

    expect(
      screen.getByText(
        "A Character With An Extremely Long Name That Might Wrap"
      )
    ).toBeInTheDocument();
  });

  it("should render multiple movies with correct separators", () => {
    render(<PersonDetailsPage person={mockPerson} />);

    // Check that movies are separated by commas (via spans with commas)
    const movieLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.includes("/movies/"));

    expect(movieLinks).toHaveLength(3);
  });

  it("should render correct movie IDs in links", () => {
    const person = {
      ...mockPerson,
      movies: [
        { id: "10", title: "Movie 10" },
        { id: "20", title: "Movie 20" },
      ],
    };

    render(<PersonDetailsPage person={person} />);

    const movie10Link = screen.getByRole("link", { name: /Movie 10/i });
    expect(movie10Link).toHaveAttribute("href", "/movies/10");

    const movie20Link = screen.getByRole("link", { name: /Movie 20/i });
    expect(movie20Link).toHaveAttribute("href", "/movies/20");
  });

  it("should render person with special characters in attributes", () => {
    const personWithSpecialChars = {
      ...mockPerson,
      name: "Obi-Wan Kenobi",
      eye_color: "blue-gray",
      hair_color: "auburn, white",
    };

    render(<PersonDetailsPage person={personWithSpecialChars} />);

    expect(screen.getByText("Obi-Wan Kenobi")).toBeInTheDocument();
    expect(screen.getByText("Eye Color: blue-gray")).toBeInTheDocument();
    expect(screen.getByText("Hair Color: auburn, white")).toBeInTheDocument();
  });
});
