export enum SearchType {
  PEOPLE = 'people',
  MOVIES = 'movies',
}

type BaseSWAPIResponse = {
  message: string;
  apiVersion: string;
  timestamp: string;
  support: {
    contact: string;
    donate: string;
    partnerDiscounts: {
      saberMasters: {
        link: string;
        details: string;
      };
      heartMath: {
        link: string;
        details: string;
      };
    };
  };
  social: {
    discord: string;
    reddit: string;
    github: string;
  };
};

type BaseResultSWAPIResponse = {
  _id: string;
  description: string;
  uid: string;
  __v: number;
};

export interface PersonResultSWAPIResponse extends BaseResultSWAPIResponse {
  properties: {
    created: string;
    edited: string;
    name: string;
    gender: string;
    skin_color: string;
    hair_color: string;
    height: string;
    eye_color: string;
    mass: string;
    homeworld: string;
    birth_year: string;
    vehicles: string[];
    starships: string[];
    films: string[];
    url: string;
  };
}

export interface MovieResultSWAPIResponse extends BaseResultSWAPIResponse {
  properties: {
    created: string;
    edited: string;
    starships: string[];
    vehicles: string[];
    planets: string[];
    producer: string;
    title: string;
    episode_id: number;
    director: string;
    release_date: string;
    opening_crawl: string;
    characters: string[];
    species: string[];
    url: string;
  };
}

export interface SWAPIPeopleResponse extends BaseSWAPIResponse {
  result: PersonResultSWAPIResponse;
}

export interface SWAPIMoviesResponse extends BaseSWAPIResponse {
  result: MovieResultSWAPIResponse;
}
