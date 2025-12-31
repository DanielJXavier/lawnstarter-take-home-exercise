import { Injectable } from '@nestjs/common';

import { BASE_SWAPI_URL } from 'src/constants';

import { MovieResult, PersonResult, SearchType } from 'src/types';

@Injectable()
export class SearchService {
  async getSearchResults(
    type: string,
    term: string,
  ): Promise<PersonResult[] | MovieResult[]> {
    const isPeople = type === SearchType.PEOPLE;

    const targetUrl = isPeople
      ? `${BASE_SWAPI_URL}/people/?name=${term}`
      : `${BASE_SWAPI_URL}/films/?title=${term}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}`);
    }

    const { message, result } = await response.json();

    if (message !== 'ok') {
      return Promise.resolve([]);
    }

    if (isPeople) {
      return result.map((result: PersonResult) => ({
        type: SearchType.PEOPLE,
        uid: result.uid,
        name: result.properties.name,
      }));
    } else {
      return result.map((result: MovieResult) => ({
        type: SearchType.MOVIES,
        uid: result.uid,
        title: result.properties.title,
      }));
    }
  }
}
