import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SwapiService {
  private readonly logger = new Logger(SwapiService.name);
  private readonly baseUrl: string;

  constructor(private configService: ConfigService) {
    this.baseUrl = this.configService.get<string>('SWAPI_BASE_URL');
  }

  async fetchFromSwapi<T>(endpoint: string): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      this.logger.debug(`Fetching from SWAPI: ${url}`);
      const response = await fetch(url);

      if (response.status === 404) {
        this.logger.warn(`Resource not found: ${url}`);
        throw new HttpException('Resource not found', HttpStatus.NOT_FOUND);
      }

      if (!response.ok) {
        this.logger.error(
          `SWAPI request failed with status ${response.status}: ${url}`,
        );
        throw new HttpException(
          `SWAPI request failed: ${response.statusText}`,
          HttpStatus.BAD_GATEWAY,
        );
      }

      const data = await response.json();
      this.logger.debug(`Successfully fetched from SWAPI: ${url}`);
      return data;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      this.logger.error(`SWAPI fetch error for ${url}:`, error);
      throw new HttpException(
        'Failed to fetch data from SWAPI',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
