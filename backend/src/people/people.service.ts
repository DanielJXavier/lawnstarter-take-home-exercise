import { Injectable } from '@nestjs/common';

import { BASE_SWAPI_URL } from '../constants';
import { SWAPIMoviesResponse, SWAPIPeopleResponse } from '../types';

@Injectable()
export class PeopleService {
  async getPersonDetails(id: string): Promise<any> {
    const targetUrl = `${BASE_SWAPI_URL}/people/${id}`;

    const personResponse = await fetch(targetUrl);

    if (!personResponse.ok) {
      throw new Error(`Failed to fetch person details`);
    }

    const { result } = (await personResponse.json()) as SWAPIPeopleResponse;

    const moviesIds = result.properties.films.map((film: string) =>
      film.split('/').pop(),
    );

    const movies = await Promise.all(
      moviesIds.map(async (movieId: string) => {
        const movieResponse = await fetch(`${BASE_SWAPI_URL}/films/${movieId}`);

        const { result } = (await movieResponse.json()) as SWAPIMoviesResponse;

        return {
          id: result.uid,
          title: result.properties.title,
        };
      }),
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
      movies,
    };
  }
}
