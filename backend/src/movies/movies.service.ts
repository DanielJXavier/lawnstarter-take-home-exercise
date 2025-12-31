import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';

import { SwapiService } from '../shared/swapi.service';

import { SWAPIMoviesResponse, SWAPIPeopleResponse } from '../types';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  constructor(private readonly swapiService: SwapiService) {}

  async getMovieDetails(id: string) {
    this.logger.log(`Fetching movie details for ID: ${id}`);

    try {
      const movieResponse =
        await this.swapiService.fetchFromSwapi<SWAPIMoviesResponse>(
          `/films/${id}`,
        );

      const { result } = movieResponse;

      const characterIds = result.properties.characters.map(
        (character: string) => character.split('/').pop(),
      );

      this.logger.log(
        `Fetching ${characterIds.length} character(s) for movie: ${result.properties.title}`,
      );

      const characters = await Promise.all(
        characterIds.map(async (characterId: string) => {
          try {
            const characterResponse =
              await this.swapiService.fetchFromSwapi<SWAPIPeopleResponse>(
                `/people/${characterId}`,
              );

            return {
              id: characterResponse.result.uid,
              name: characterResponse.result.properties.name,
            };
          } catch (error) {
            this.logger.warn(
              `Failed to fetch character ${characterId} for movie ${id}`,
            );
            return null;
          }
        }),
      );

      // Filter out any failed character fetches
      const validCharacters = characters.filter((char) => char !== null);

      this.logger.log(
        `Successfully fetched movie details for: ${result.properties.title}`,
      );

      return {
        id: result.uid,
        title: result.properties.title,
        opening_crawl: result.properties.opening_crawl,
        characters: validCharacters,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Unexpected error fetching movie details for ID: ${id}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw new HttpException(
        'An unexpected error occurred while fetching movie details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
