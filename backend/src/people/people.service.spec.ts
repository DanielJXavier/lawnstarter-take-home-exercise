import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { PeopleService } from './people.service';
import { SwapiService } from '../shared/swapi.service';

describe('PeopleService', () => {
  let service: PeopleService;
  let swapiService: SwapiService;

  const mockSwapiService = {
    fetchFromSwapi: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PeopleService,
        {
          provide: SwapiService,
          useValue: mockSwapiService,
        },
      ],
    }).compile();

    service = module.get<PeopleService>(PeopleService);
    swapiService = module.get<SwapiService>(SwapiService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getPersonDetails', () => {
    it('should return person details with movies', async () => {
      const mockPersonResponse = {
        result: {
          uid: '1',
          properties: {
            name: 'Luke Skywalker',
            birth_year: '19BBY',
            gender: 'male',
            eye_color: 'blue',
            hair_color: 'blond',
            height: '172',
            mass: '77',
            films: [
              'https://swapi.tech/api/films/1',
              'https://swapi.tech/api/films/2',
            ],
          },
        },
      };

      const mockMovie1Response = {
        result: {
          uid: '1',
          properties: { title: 'A New Hope' },
        },
      };

      const mockMovie2Response = {
        result: {
          uid: '2',
          properties: { title: 'The Empire Strikes Back' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockPersonResponse)
        .mockResolvedValueOnce(mockMovie1Response)
        .mockResolvedValueOnce(mockMovie2Response);

      const result = await service.getPersonDetails('1');

      expect(result).toEqual({
        id: '1',
        name: 'Luke Skywalker',
        birth_year: '19BBY',
        gender: 'male',
        eye_color: 'blue',
        hair_color: 'blond',
        height: '172',
        mass: '77',
        movies: [
          { id: '1', title: 'A New Hope' },
          { id: '2', title: 'The Empire Strikes Back' },
        ],
      });

      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/people/1');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/films/1');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/films/2');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledTimes(3);
    });

    it('should handle people with no movies', async () => {
      const mockPersonResponse = {
        result: {
          uid: '1',
          properties: {
            name: 'Test Character',
            birth_year: 'unknown',
            gender: 'n/a',
            eye_color: 'unknown',
            hair_color: 'unknown',
            height: 'unknown',
            mass: 'unknown',
            films: [],
          },
        },
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockPersonResponse);

      const result = await service.getPersonDetails('1');

      expect(result.movies).toEqual([]);
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledTimes(1);
    });

    it('should filter out failed movie fetches', async () => {
      const mockPersonResponse = {
        result: {
          uid: '1',
          properties: {
            name: 'Luke Skywalker',
            birth_year: '19BBY',
            gender: 'male',
            eye_color: 'blue',
            hair_color: 'blond',
            height: '172',
            mass: '77',
            films: [
              'https://swapi.tech/api/films/1',
              'https://swapi.tech/api/films/999', // This will fail
            ],
          },
        },
      };

      const mockMovie1Response = {
        result: {
          uid: '1',
          properties: { title: 'A New Hope' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockPersonResponse)
        .mockResolvedValueOnce(mockMovie1Response)
        .mockRejectedValueOnce(
          new HttpException('Not found', HttpStatus.NOT_FOUND),
        );

      const result = await service.getPersonDetails('1');

      expect(result.movies).toEqual([{ id: '1', title: 'A New Hope' }]);
      expect(result.movies).toHaveLength(1);
    });

    it('should extract movie IDs from URLs correctly', async () => {
      const mockPersonResponse = {
        result: {
          uid: '1',
          properties: {
            name: 'Test Character',
            birth_year: 'unknown',
            gender: 'n/a',
            eye_color: 'unknown',
            hair_color: 'unknown',
            height: 'unknown',
            mass: 'unknown',
            films: ['https://swapi.tech/api/films/42'],
          },
        },
      };

      const mockMovieResponse = {
        result: {
          uid: '42',
          properties: { title: 'Test Movie' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockPersonResponse)
        .mockResolvedValueOnce(mockMovieResponse);

      await service.getPersonDetails('1');

      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/films/42');
    });

    it('should return all person properties', async () => {
      const mockPersonResponse = {
        result: {
          uid: '10',
          properties: {
            name: 'Obi-Wan Kenobi',
            birth_year: '57BBY',
            gender: 'male',
            eye_color: 'blue-gray',
            hair_color: 'auburn, white',
            height: '182',
            mass: '77',
            films: [],
          },
        },
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockPersonResponse);

      const result = await service.getPersonDetails('10');

      expect(result.name).toBe('Obi-Wan Kenobi');
      expect(result.birth_year).toBe('57BBY');
      expect(result.gender).toBe('male');
      expect(result.eye_color).toBe('blue-gray');
      expect(result.hair_color).toBe('auburn, white');
      expect(result.height).toBe('182');
      expect(result.mass).toBe('77');
    });
  });

  describe('Error handling', () => {
    it('should propagate HttpException from SwapiService', async () => {
      const httpException = new HttpException(
        'Resource not found',
        HttpStatus.NOT_FOUND,
      );

      mockSwapiService.fetchFromSwapi.mockRejectedValue(httpException);

      await expect(service.getPersonDetails('999')).rejects.toThrow(
        httpException,
      );
    });

    it('should wrap non-HttpException errors', async () => {
      mockSwapiService.fetchFromSwapi.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(service.getPersonDetails('1')).rejects.toThrow(
        new HttpException(
          'An unexpected error occurred while fetching person details',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
