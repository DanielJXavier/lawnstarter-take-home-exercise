export enum SearchType {
  PEOPLE = 'people',
  MOVIES = 'movies',
}

type BaseResult = {
  _id: string;
  description: string;
  uid: string;
  __v: number;
};

export interface PersonResult extends BaseResult {
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

export interface MovieResult extends BaseResult {
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
