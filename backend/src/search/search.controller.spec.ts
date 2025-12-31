import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SearchType } from '../types';

describe('SearchController', () => {
  let controller: SearchController;
  let service: SearchService;

  const mockSearchService = {
    getSearchResults: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: SearchService,
          useValue: mockSearchService,
        },
      ],
    }).compile();

    controller = module.get<SearchController>(SearchController);
    service = module.get<SearchService>(SearchService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSearchResults', () => {
    it('should return people search results', async () => {
      const mockResults = [
        { type: SearchType.PEOPLE, id: '1', name: 'Luke Skywalker' },
      ];

      mockSearchService.getSearchResults.mockResolvedValue(mockResults);

      const query = { type: SearchType.PEOPLE, term: 'luke' };
      const result = await controller.getSearchResults(query);

      expect(result).toEqual(mockResults);
      expect(service.getSearchResults).toHaveBeenCalledWith(
        SearchType.PEOPLE,
        'luke',
      );
    });

    it('should return movie search results', async () => {
      const mockResults = [
        { type: SearchType.MOVIES, id: '1', title: 'A New Hope' },
      ];

      mockSearchService.getSearchResults.mockResolvedValue(mockResults);

      const query = { type: SearchType.MOVIES, term: 'hope' };
      const result = await controller.getSearchResults(query);

      expect(result).toEqual(mockResults);
      expect(service.getSearchResults).toHaveBeenCalledWith(
        SearchType.MOVIES,
        'hope',
      );
    });

    it('should return empty array when no results found', async () => {
      mockSearchService.getSearchResults.mockResolvedValue([]);

      const query = { type: SearchType.PEOPLE, term: 'nonexistent' };
      const result = await controller.getSearchResults(query);

      expect(result).toEqual([]);
    });
  });
});
