import {
  Injectable,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import { SwapiService } from '../shared/swapi.service';

import { SWAPIMoviesResponse, SWAPIPeopleResponse } from '../types';

@Injectable()
export class PeopleService {
  private readonly logger = new Logger(PeopleService.name);

  constructor(private readonly swapiService: SwapiService) {}

  async getPersonDetails(id: string) {
    this.logger.log(`Fetching person details for ID: ${id}`);

    try {
      const personResponse =
        await this.swapiService.fetchFromSwapi<SWAPIPeopleResponse>(
          `/people/${id}`,
        );

      const { result } = personResponse;

      const movieIds = result.properties.films.map((film: string) =>
        film.split('/').pop(),
      );

      this.logger.log(
        `Fetching ${movieIds.length} movie(s) for person: ${result.properties.name}`,
      );

      const movies = await Promise.all(
        movieIds.map(async (movieId: string) => {
          try {
            const movieResponse =
              await this.swapiService.fetchFromSwapi<SWAPIMoviesResponse>(
                `/films/${movieId}`,
              );

            return {
              id: movieResponse.result.uid,
              title: movieResponse.result.properties.title,
            };
          } catch (error) {
            this.logger.warn(
              `Failed to fetch movie ${movieId} for person ${id}`,
            );
            return null;
          }
        }),
      );

      // Filter out any failed movie fetches
      const validMovies = movies.filter((movie) => movie !== null);

      this.logger.log(
        `Successfully fetched person details for: ${result.properties.name}`,
      );

      return {
        id: result.uid,
        name: result.properties.name,
        birth_year: result.properties.birth_year,
        gender: result.properties.gender,
        eye_color: result.properties.eye_color,
        hair_color: result.properties.hair_color,
        height: result.properties.height,
        mass: result.properties.mass,
        movies: validMovies,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(
        `Unexpected error fetching person details for ID: ${id}`,
        error instanceof Error ? error.stack : String(error),
      );

      throw new HttpException(
        'An unexpected error occurred while fetching person details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
