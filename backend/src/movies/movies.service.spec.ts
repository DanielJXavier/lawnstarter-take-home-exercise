import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { SwapiService } from '../shared/swapi.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let swapiService: SwapiService;

  const mockSwapiService = {
    fetchFromSwapi: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: SwapiService,
          useValue: mockSwapiService,
        },
      ],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    swapiService = module.get<SwapiService>(SwapiService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMovieDetails', () => {
    it('should return movie details with characters', async () => {
      const mockMovieResponse = {
        result: {
          uid: '1',
          properties: {
            title: 'A New Hope',
            opening_crawl: 'It is a period of civil war...',
            characters: [
              'https://swapi.tech/api/people/1',
              'https://swapi.tech/api/people/2',
            ],
          },
        },
      };

      const mockCharacter1Response = {
        result: {
          uid: '1',
          properties: { name: 'Luke Skywalker' },
        },
      };

      const mockCharacter2Response = {
        result: {
          uid: '2',
          properties: { name: 'C-3PO' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockMovieResponse)
        .mockResolvedValueOnce(mockCharacter1Response)
        .mockResolvedValueOnce(mockCharacter2Response);

      const result = await service.getMovieDetails('1');

      expect(result).toEqual({
        id: '1',
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
        characters: [
          { id: '1', name: 'Luke Skywalker' },
          { id: '2', name: 'C-3PO' },
        ],
      });

      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/films/1');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/people/1');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/people/2');
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledTimes(3);
    });

    it('should handle movies with no characters', async () => {
      const mockMovieResponse = {
        result: {
          uid: '1',
          properties: {
            title: 'A New Hope',
            opening_crawl: 'It is a period of civil war...',
            characters: [],
          },
        },
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockMovieResponse);

      const result = await service.getMovieDetails('1');

      expect(result.characters).toEqual([]);
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledTimes(1);
    });

    it('should filter out failed character fetches', async () => {
      const mockMovieResponse = {
        result: {
          uid: '1',
          properties: {
            title: 'A New Hope',
            opening_crawl: 'It is a period of civil war...',
            characters: [
              'https://swapi.tech/api/people/1',
              'https://swapi.tech/api/people/999', // This will fail
            ],
          },
        },
      };

      const mockCharacter1Response = {
        result: {
          uid: '1',
          properties: { name: 'Luke Skywalker' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockMovieResponse)
        .mockResolvedValueOnce(mockCharacter1Response)
        .mockRejectedValueOnce(
          new HttpException('Not found', HttpStatus.NOT_FOUND),
        );

      const result = await service.getMovieDetails('1');

      expect(result.characters).toEqual([{ id: '1', name: 'Luke Skywalker' }]);
      expect(result.characters).toHaveLength(1);
    });

    it('should extract character IDs from URLs correctly', async () => {
      const mockMovieResponse = {
        result: {
          uid: '1',
          properties: {
            title: 'A New Hope',
            opening_crawl: 'It is a period of civil war...',
            characters: ['https://swapi.tech/api/people/42'],
          },
        },
      };

      const mockCharacterResponse = {
        result: {
          uid: '42',
          properties: { name: 'Test Character' },
        },
      };

      mockSwapiService.fetchFromSwapi
        .mockResolvedValueOnce(mockMovieResponse)
        .mockResolvedValueOnce(mockCharacterResponse);

      await service.getMovieDetails('1');

      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith('/people/42');
    });
  });

  describe('Error handling', () => {
    it('should propagate HttpException from SwapiService', async () => {
      const httpException = new HttpException(
        'Resource not found',
        HttpStatus.NOT_FOUND,
      );

      mockSwapiService.fetchFromSwapi.mockRejectedValue(httpException);

      await expect(service.getMovieDetails('999')).rejects.toThrow(
        httpException,
      );
    });

    it('should wrap non-HttpException errors', async () => {
      mockSwapiService.fetchFromSwapi.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(service.getMovieDetails('1')).rejects.toThrow(
        new HttpException(
          'An unexpected error occurred while fetching movie details',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
