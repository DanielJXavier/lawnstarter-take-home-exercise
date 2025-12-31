import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { BASE_SWAPI_URL } from '../constants';

import { SWAPIMoviesResponse, SWAPIPeopleResponse } from '../types';

@Injectable()
export class MoviesService {
  private readonly logger = new Logger(MoviesService.name);

  async getMovieDetails(id: string) {
    this.logger.log(`Fetching movie details for ID: ${id}`);

    try {
      const targetUrl = `${BASE_SWAPI_URL}/films/${id}`;
      const movieResponse = await fetch(targetUrl);

      if (movieResponse.status === 404) {
        this.logger.warn(`Movie not found with ID: ${id}`);
        throw new NotFoundException(`Movie with ID ${id} not found`);
      }

      if (!movieResponse.ok) {
        this.logger.error(
          `SWAPI request failed with status ${movieResponse.status} for movie ID: ${id}`,
        );
        throw new HttpException(
          'Failed to fetch movie details from SWAPI',
          HttpStatus.BAD_GATEWAY,
        );
      }

      const { result } = (await movieResponse.json()) as SWAPIMoviesResponse;

      const characterIds = result.properties.characters.map(
        (character: string) => character.split('/').pop(),
      );

      this.logger.log(
        `Fetching ${characterIds.length} character(s) for movie: ${result.properties.title}`,
      );

      const characters = await Promise.all(
        characterIds.map(async (characterId: string) => {
          try {
            const characterResponse = await fetch(
              `${BASE_SWAPI_URL}/people/${characterId}`,
            );

            if (!characterResponse.ok) {
              this.logger.warn(
                `Failed to fetch character ${characterId} for movie ${id}`,
              );
              return null;
            }

            const { result } =
              (await characterResponse.json()) as SWAPIPeopleResponse;

            return {
              id: result.uid,
              name: result.properties.name,
            };
          } catch (error) {
            this.logger.error(
              `Error fetching character ${characterId}`,
              error instanceof Error ? error.stack : String(error),
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
