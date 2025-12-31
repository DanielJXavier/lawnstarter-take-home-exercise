import { Injectable } from '@nestjs/common';

import { BASE_SWAPI_URL } from '../constants';

import { SWAPIMoviesResponse, SWAPIPeopleResponse } from '../types';

@Injectable()
export class MoviesService {
  async getMovieDetails(id: string) {
    const targetUrl = `${BASE_SWAPI_URL}/films/${id}`;

    const movieResponse = await fetch(targetUrl);

    if (!movieResponse.ok) {
      throw new Error(`Failed to fetch movie details`);
    }

    const { result } = (await movieResponse.json()) as SWAPIMoviesResponse;

    const characterIds = result.properties.characters.map((character: string) =>
      character.split('/').pop(),
    );

    const characters = await Promise.all(
      characterIds.map(async (characterId: string) => {
        const characterResponse = await fetch(
          `${BASE_SWAPI_URL}/people/${characterId}`,
        );

        const { result } =
          (await characterResponse.json()) as SWAPIPeopleResponse;

        return {
          id: result.uid,
          name: result.properties.name,
        };
      }),
    );

    return {
      id: result.uid,
      title: result.properties.title,
      opening_crawl: result.properties.opening_crawl,
      characters,
    };
  }
}
