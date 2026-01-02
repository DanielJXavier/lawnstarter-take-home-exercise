export type BasePerson = {
  id: string;
  name: string;
};

export type BaseMovie = {
  id: string;
  title: string;
};

export interface Person extends BasePerson {
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  movies: BaseMovie[];
}

export interface Movie extends BaseMovie {
  opening_crawl: string;
  characters: BasePerson[];
}

export interface Statistics {
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
