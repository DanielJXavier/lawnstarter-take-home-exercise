export interface QueryRecord {
  endpoint: string;
  searchType: string;
  searchTerm: string;
  timestamp: Date;
  duration: number;
}

export interface QueryStatistics {
  topQueries: Array<{
    term: string;
    count: number;
    percentage: number;
  }>;
  averageResponseTime: number;
  popularHours: Array<{
    hour: number;
    count: number;
    percentage: number;
  }>;
  searchTypeBreakdown: {
    people: number;
    movies: number;
  };
  totalQueries: number;
  lastUpdated: Date;
  nextUpdate: Date;
}
