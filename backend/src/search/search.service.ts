import { Injectable } from '@nestjs/common';

import { SearchType } from '../types';

import { BASE_SWAPI_URL } from '../constants';

import { MovieResultSWAPIResponse, PersonResultSWAPIResponse } from '../types';

@Injectable()
export class SearchService {
  async getSearchResults(type: string, term: string): Promise<any> {
    const isPeople = type === SearchType.PEOPLE;

    const targetUrl = isPeople
      ? `${BASE_SWAPI_URL}/people/?name=${term}`
      : `${BASE_SWAPI_URL}/films/?title=${term}`;

    const response = await fetch(targetUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch ${type}`);
    }

    const { result } = await response.json();

    if (isPeople) {
      return result.map((result: PersonResultSWAPIResponse) => ({
        type: SearchType.PEOPLE,
        id: result.uid,
        name: result.properties.name,
      }));
    } else {
      return result.map((result: MovieResultSWAPIResponse) => ({
        type: SearchType.MOVIES,
        id: result.uid,
        title: result.properties.title,
      }));
    }
  }
}
