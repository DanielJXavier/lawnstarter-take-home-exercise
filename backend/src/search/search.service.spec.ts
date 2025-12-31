import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SearchService } from './search.service';
import { SwapiService } from '../shared/swapi.service';
import { SearchType } from '../types';

describe('SearchService', () => {
  let service: SearchService;
  let swapiService: SwapiService;

  const mockSwapiService = {
    fetchFromSwapi: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SearchService,
        {
          provide: SwapiService,
          useValue: mockSwapiService,
        },
      ],
    }).compile();

    service = module.get<SearchService>(SearchService);
    swapiService = module.get<SwapiService>(SwapiService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSearchResults - People', () => {
    it('should return people search results', async () => {
      const mockResponse = {
        result: [
          {
            uid: '1',
            properties: { name: 'Luke Skywalker' },
          },
          {
            uid: '2',
            properties: { name: 'Luke Cage' },
          },
        ],
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockResponse);

      const result = await service.getSearchResults(SearchType.PEOPLE, 'luke');

      expect(result).toEqual([
        { type: SearchType.PEOPLE, id: '1', name: 'Luke Skywalker' },
        { type: SearchType.PEOPLE, id: '2', name: 'Luke Cage' },
      ]);
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith(
        '/people/?name=luke',
      );
    });

    it('should return empty array when no people results found', async () => {
      const mockResponse = {
        result: [],
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockResponse);

      const result = await service.getSearchResults(
        SearchType.PEOPLE,
        'nonexistent',
      );

      expect(result).toEqual([]);
    });

    it('should return empty array when result is null', async () => {
      const mockResponse = {
        result: null,
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockResponse);

      const result = await service.getSearchResults(SearchType.PEOPLE, 'test');

      expect(result).toEqual([]);
    });
  });

  describe('getSearchResults - Movies', () => {
    it('should return movies search results', async () => {
      const mockResponse = {
        result: [
          {
            uid: '1',
            properties: { title: 'A New Hope' },
          },
          {
            uid: '4',
            properties: { title: 'The Phantom Menace' },
          },
        ],
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockResponse);

      const result = await service.getSearchResults(SearchType.MOVIES, 'hope');

      expect(result).toEqual([
        { type: SearchType.MOVIES, id: '1', title: 'A New Hope' },
        { type: SearchType.MOVIES, id: '4', title: 'The Phantom Menace' },
      ]);
      expect(swapiService.fetchFromSwapi).toHaveBeenCalledWith(
        '/films/?title=hope',
      );
    });

    it('should return empty array when no movie results found', async () => {
      const mockResponse = {
        result: [],
      };

      mockSwapiService.fetchFromSwapi.mockResolvedValue(mockResponse);

      const result = await service.getSearchResults(
        SearchType.MOVIES,
        'nonexistent',
      );

      expect(result).toEqual([]);
    });
  });

  describe('Error handling', () => {
    it('should propagate HttpException from SwapiService', async () => {
      const httpException = new HttpException(
        'SWAPI unavailable',
        HttpStatus.BAD_GATEWAY,
      );

      mockSwapiService.fetchFromSwapi.mockRejectedValue(httpException);

      await expect(
        service.getSearchResults(SearchType.PEOPLE, 'luke'),
      ).rejects.toThrow(httpException);
    });

    it('should wrap non-HttpException errors', async () => {
      mockSwapiService.fetchFromSwapi.mockRejectedValue(
        new Error('Unexpected error'),
      );

      await expect(
        service.getSearchResults(SearchType.PEOPLE, 'luke'),
      ).rejects.toThrow(
        new HttpException(
          'An unexpected error occurred while searching',
          HttpStatus.INTERNAL_SERVER_ERROR,
        ),
      );
    });
  });
});
