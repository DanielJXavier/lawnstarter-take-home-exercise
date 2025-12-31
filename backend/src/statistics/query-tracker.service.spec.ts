import { Test, TestingModule } from '@nestjs/testing';
import { QueryTrackerService } from './query-tracker.service';

describe('QueryTrackerService', () => {
  let service: QueryTrackerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QueryTrackerService],
    }).compile();

    service = module.get<QueryTrackerService>(QueryTrackerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('trackQuery', () => {
    it('should track a query', () => {
      service.trackQuery('/search', 'people', 'luke', 150);

      const queries = service.getQueries();
      expect(queries).toHaveLength(1);
      expect(queries[0]).toMatchObject({
        endpoint: '/search',
        searchType: 'people',
        searchTerm: 'luke',
        duration: 150,
      });
      expect(queries[0].timestamp).toBeInstanceOf(Date);
    });

    it('should normalize search terms to lowercase', () => {
      service.trackQuery('/search', 'people', 'LUKE SKYWALKER', 150);

      const queries = service.getQueries();
      expect(queries[0].searchTerm).toBe('luke skywalker');
    });

    it('should trim whitespace from search terms', () => {
      service.trackQuery('/search', 'people', '  luke  ', 150);

      const queries = service.getQueries();
      expect(queries[0].searchTerm).toBe('luke');
    });

    it('should track multiple queries', () => {
      service.trackQuery('/search', 'people', 'luke', 150);
      service.trackQuery('/search', 'movies', 'hope', 200);
      service.trackQuery('/search', 'people', 'vader', 100);

      expect(service.getQueriesCount()).toBe(3);
    });
  });

  describe('clearOldQueries', () => {
    it('should clear queries older than specified hours', () => {
      // Track a recent query
      service.trackQuery('/search', 'people', 'luke', 150);

      // Manually add an old query
      const oldDate = new Date(Date.now() - 25 * 60 * 60 * 1000); // 25 hours ago
      service['queries'].push({
        endpoint: '/search',
        searchType: 'people',
        searchTerm: 'old',
        timestamp: oldDate,
        duration: 100,
      });

      expect(service.getQueriesCount()).toBe(2);

      service.clearOldQueries(24);

      const queries = service.getQueries();
      expect(queries).toHaveLength(1);
      expect(queries[0].searchTerm).toBe('luke');
    });

    it('should not clear recent queries', () => {
      service.trackQuery('/search', 'people', 'luke', 150);
      service.trackQuery('/search', 'movies', 'hope', 200);

      service.clearOldQueries(24);

      expect(service.getQueriesCount()).toBe(2);
    });
  });

  describe('getQueries', () => {
    it('should return a copy of queries array', () => {
      service.trackQuery('/search', 'people', 'luke', 150);

      const queries1 = service.getQueries();
      const queries2 = service.getQueries();

      expect(queries1).toEqual(queries2);
      expect(queries1).not.toBe(queries2); // Different array instances
    });

    it('should return empty array when no queries tracked', () => {
      expect(service.getQueries()).toEqual([]);
    });
  });
});
