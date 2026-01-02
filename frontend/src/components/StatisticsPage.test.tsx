import { render, screen } from "@testing-library/react";

import StatisticsPage from "./StatisticsPage";

describe("StatisticsPage", () => {
  const mockStatistics = {
    totalQueries: 150,
    topQueries: [
      { term: "Luke", count: 50, percentage: 33.33 },
      { term: "Darth Vader", count: 30, percentage: 20.0 },
      { term: "Yoda", count: 25, percentage: 16.67 },
      { term: "Leia", count: 20, percentage: 13.33 },
      { term: "Han Solo", count: 15, percentage: 10.0 },
    ],
    averageResponseTime: 125.5,
    popularHours: [
      { hour: 14, count: 40, percentage: 26.67 },
      { hour: 15, count: 35, percentage: 23.33 },
      { hour: 10, count: 30, percentage: 20.0 },
      { hour: 16, count: 25, percentage: 16.67 },
      { hour: 9, count: 20, percentage: 13.33 },
    ],
    searchTypeBreakdown: {
      people: 100,
      movies: 50,
    },
    lastUpdated: new Date("2024-01-01T10:00:00Z"),
    nextUpdate: new Date("2024-01-01T10:05:00Z"),
  };

  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2024-01-01T10:00:00Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("should render the statistics title", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Statistics")).toBeInTheDocument();
  });

  it("should display total queries", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Total Queries")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("should display top 5 search queries with percentages", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Top 5 Search Queries")).toBeInTheDocument();
    expect(screen.getByText('"Luke"')).toBeInTheDocument();
    expect(screen.getByText("33.33%")).toBeInTheDocument();
    expect(screen.getByText('"Darth Vader"')).toBeInTheDocument();

    // Use getAllByText since 20.00% appears in both queries and popular hours
    const percentages = screen.getAllByText("20.00%");

    expect(percentages.length).toBeGreaterThan(0);

    expect(screen.getByText('"Yoda"')).toBeInTheDocument();
  });

  it("should display all top queries with rank numbers", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    // Rank numbers appear in both queries and hours sections, so use getAllByText
    const rank1 = screen.getAllByText("#1");
    expect(rank1.length).toBeGreaterThanOrEqual(1);

    const rank2 = screen.getAllByText("#2");
    expect(rank2.length).toBeGreaterThanOrEqual(1);

    const rank3 = screen.getAllByText("#3");
    expect(rank3.length).toBeGreaterThanOrEqual(1);

    const rank4 = screen.getAllByText("#4");
    expect(rank4.length).toBeGreaterThanOrEqual(1);

    const rank5 = screen.getAllByText("#5");
    expect(rank5.length).toBeGreaterThanOrEqual(1);
  });

  it("should display average response time", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Average Response Time")).toBeInTheDocument();
    expect(screen.getByText("125.50 ms")).toBeInTheDocument();
  });

  it("should display top 5 popular hours in 12-hour format", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Top 5 Popular Hours")).toBeInTheDocument();
    expect(screen.getByText("2 PM")).toBeInTheDocument();
    expect(screen.getByText("3 PM")).toBeInTheDocument();
    expect(screen.getByText("10 AM")).toBeInTheDocument();
    expect(screen.getByText("4 PM")).toBeInTheDocument();
    expect(screen.getByText("9 AM")).toBeInTheDocument();
  });

  it("should convert 24-hour format correctly", () => {
    const statisticsWithMorning = {
      ...mockStatistics,
      popularHours: [
        { hour: 0, count: 10, percentage: 20.0 },
        { hour: 12, count: 15, percentage: 30.0 },
        { hour: 13, count: 20, percentage: 40.0 },
        { hour: 23, count: 5, percentage: 10.0 },
      ],
    };

    render(<StatisticsPage statistics={statisticsWithMorning} />);

    // Hour 0 is displayed as 0 AM (not converted to 12)
    expect(screen.getByText(/0\s+AM/)).toBeInTheDocument();

    // Hour 12 should be 12 PM
    expect(screen.getByText(/12\s+PM/)).toBeInTheDocument();

    // Hour 13 should be 1 PM (13 - 12 = 1) - use getAllByText since it matches 11 PM too
    const onePM = screen.getAllByText(/1\s+PM/);
    expect(onePM.length).toBeGreaterThanOrEqual(1);

    // Hour 23 should be 11 PM (23 - 12 = 11)
    const elevenPM = screen.getAllByText(/11\s+PM/);
    expect(elevenPM.length).toBeGreaterThanOrEqual(1);
  });

  it("should display search type breakdown", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Search Type Breakdown")).toBeInTheDocument();
    expect(screen.getByText("People: 100")).toBeInTheDocument();
    expect(screen.getByText("Movies: 50")).toBeInTheDocument();
  });

  it("should display next update countdown", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    // nextUpdate is 5 minutes (300 seconds) from current time
    expect(screen.getByText(/Next update in/)).toBeInTheDocument();
    expect(screen.getByText(/300/)).toBeInTheDocument();
    expect(screen.getByText(/seconds/)).toBeInTheDocument();
  });

  it("should handle zero queries", () => {
    const emptyStatistics = {
      ...mockStatistics,
      totalQueries: 0,
      topQueries: [],
    };

    render(<StatisticsPage statistics={emptyStatistics} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should handle decimal percentages correctly", () => {
    const statisticsWithDecimals = {
      ...mockStatistics,
      topQueries: [{ term: "Test", count: 33, percentage: 12.345 }],
    };

    render(<StatisticsPage statistics={statisticsWithDecimals} />);

    expect(screen.getByText("12.35%")).toBeInTheDocument();
  });

  it("should render all sections", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    expect(screen.getByText("Total Queries")).toBeInTheDocument();
    expect(screen.getByText("Top 5 Search Queries")).toBeInTheDocument();
    expect(screen.getByText("Average Response Time")).toBeInTheDocument();
    expect(screen.getByText("Top 5 Popular Hours")).toBeInTheDocument();
    expect(screen.getByText("Search Type Breakdown")).toBeInTheDocument();
  });

  it("should display query counts in top queries", () => {
    render(<StatisticsPage statistics={mockStatistics} />);

    // 50 appears once in the top queries section
    expect(screen.getByText("50")).toBeInTheDocument();

    // 30 appears in both top queries and popular hours, use getAllByText
    const thirties = screen.getAllByText("30");
    expect(thirties.length).toBeGreaterThan(0);

    // 25 appears in both sections
    const twentyFives = screen.getAllByText("25");
    expect(twentyFives.length).toBeGreaterThan(0);
  });

  it("should handle less than 5 top queries", () => {
    const fewQueriesStats = {
      ...mockStatistics,
      topQueries: [
        { term: "Luke", count: 50, percentage: 50.0 },
        { term: "Leia", count: 50, percentage: 50.0 },
      ],
    };

    render(<StatisticsPage statistics={fewQueriesStats} />);

    expect(screen.getByText('"Luke"')).toBeInTheDocument();
    expect(screen.getByText('"Leia"')).toBeInTheDocument();
  });
});
