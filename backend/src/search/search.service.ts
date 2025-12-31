import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { BASE_SWAPI_URL } from '../constants';

import {
  SearchType,
  MovieResultSWAPIResponse,
  PersonResultSWAPIResponse,
} from '../types';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  async getSearchResults(type: SearchType, term: string) {
    const isPeople = type === SearchType.PEOPLE;

    const targetUrl = isPeople
      ? `${BASE_SWAPI_URL}/people/?name=${term}`
      : `${BASE_SWAPI_URL}/films/?title=${term}`;

    this.logger.log(`Searching for ${type} with term: "${term}"`);

    try {
      const response = await fetch(targetUrl);

      if (!response.ok) {
        this.logger.error(
          `SWAPI request failed with status ${response.status} for ${type} search: ${term}`,
        );
        throw new HttpException(
          `Failed to fetch ${type} from SWAPI`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      const { result } = await response.json();

      if (!result || !Array.isArray(result)) {
        this.logger.warn(`No results found for ${type} search: ${term}`);
        return [];
      }

      this.logger.log(
        `Successfully found ${result.length} result(s) for ${type} search: ${term}`,
      );

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
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Unexpected error during ${type} search: ${term}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw new HttpException(
        'An unexpected error occurred while searching',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
