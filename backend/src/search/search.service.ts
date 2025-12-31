import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { SwapiService } from '../shared/swapi.service';

import {
  SearchType,
  MovieResultSWAPIResponse,
  PersonResultSWAPIResponse,
} from '../types';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);

  constructor(private readonly swapiService: SwapiService) {}

  async getSearchResults(type: SearchType, term: string) {
    const isPeople = type === SearchType.PEOPLE;

    const endpoint = isPeople
      ? `/people/?name=${term}`
      : `/films/?title=${term}`;

    this.logger.log(`Searching for ${type} with term: "${term}"`);

    try {
      const response = await this.swapiService.fetchFromSwapi<{
        result: Array<PersonResultSWAPIResponse | MovieResultSWAPIResponse>;
      }>(endpoint);

      const { result } = response;

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
