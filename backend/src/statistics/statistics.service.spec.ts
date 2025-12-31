import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { StatisticsService } from './statistics.service';
import { QueryTrackerService } from './query-tracker.service';

describe('StatisticsService', () => {
  let service: StatisticsService;
  let queryTracker: QueryTrackerService;
  let eventEmitter: EventEmitter2;

  const mockQueryTracker = {
    getQueries: jest.fn().mockReturnValue([]), // Default to empty array
    clearOldQueries: jest.fn(),
  };

  const mockEventEmitter = {
    emit: jest.fn(),
  };

  beforeEach(async () => {
    // Reset mocks
    jest.clearAllMocks();
    mockQueryTracker.getQueries.mockReturnValue([]); // Reset to empty

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatisticsService,
        {
          provide: QueryTrackerService,
          useValue: mockQueryTracker,
        },
        {
          provide: EventEmitter2,
          useValue: mockEventEmitter,
        },
      ],
    }).compile();

    service = module.get<StatisticsService>(StatisticsService);
    queryTracker = module.get<QueryTrackerService>(QueryTrackerService);
    eventEmitter = module.get<EventEmitter2>(EventEmitter2);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('computeStatistics', () => {
    it('should compute statistics from queries', async () => {
      const mockQueries = [
        {
          endpoint: '/search',
          searchType: 'people',
          searchTerm: 'luke',
          timestamp: new Date('2025-12-31T14:30:00Z'),
          duration: 100,
        },
        {
          endpoint: '/search',
          searchType: 'people',
          searchTerm: 'luke',
          timestamp: new Date('2025-12-31T14:35:00Z'),
          duration: 150,
        },
        {
          endpoint: '/search',
          searchType: 'movies',
          searchTerm: 'hope',
          timestamp: new Date('2025-12-31T15:00:00Z'),
          duration: 200,
        },
      ];

      mockQueryTracker.getQueries.mockReturnValue(mockQueries);

      await service.computeStatistics();

      const stats = service.getStatistics();

      expect(stats.totalQueries).toBe(3);
      expect(stats.averageResponseTime).toBe(150); // (100 + 150 + 200) / 3
      expect(stats.topQueries).toHaveLength(2);
      expect(stats.topQueries[0].term).toBe('luke');
      expect(stats.topQueries[0].count).toBe(2);
      expect(stats.searchTypeBreakdown.people).toBe(2);
      expect(stats.searchTypeBreakdown.movies).toBe(1);
      expect(eventEmitter.emit).toHaveBeenCalledWith(
        'statistics.computed',
        stats,
      );
    });

    it('should return empty stats when no queries', async () => {
      mockQueryTracker.getQueries.mockReturnValue([]);

      await service.computeStatistics();

      const stats = service.getStatistics();

      expect(stats.totalQueries).toBe(0);
      expect(stats.topQueries).toEqual([]);
      expect(stats.averageResponseTime).toBe(0);
    });

    it('should calculate top queries with percentages', async () => {
      const mockQueries = Array(10)
        .fill(null)
        .map((_, i) => ({
          endpoint: '/search',
          searchType: 'people',
          searchTerm: i < 5 ? 'luke' : i < 8 ? 'vader' : 'leia',
          timestamp: new Date(),
          duration: 100,
        }));

      mockQueryTracker.getQueries.mockReturnValue(mockQueries);

      await service.computeStatistics();

      const stats = service.getStatistics();

      expect(stats.topQueries[0].term).toBe('luke');
      expect(stats.topQueries[0].count).toBe(5);
      expect(stats.topQueries[0].percentage).toBe(50);

      expect(stats.topQueries[1].term).toBe('vader');
      expect(stats.topQueries[1].count).toBe(3);
      expect(stats.topQueries[1].percentage).toBe(30);
    });

    it('should limit top queries to 5', async () => {
      const mockQueries = Array(10)
        .fill(null)
        .map((_, i) => ({
          endpoint: '/search',
          searchType: 'people',
          searchTerm: `term${i}`,
          timestamp: new Date(),
          duration: 100,
        }));

      mockQueryTracker.getQueries.mockReturnValue(mockQueries);

      await service.computeStatistics();

      const stats = service.getStatistics();

      expect(stats.topQueries).toHaveLength(5);
    });

    it('should calculate popular hours', async () => {
      const now = new Date();
      const baseTime = new Date(now);
      baseTime.setMinutes(0);
      baseTime.setSeconds(0);
      baseTime.setMilliseconds(0);

      const mockQueries = [
        {
          endpoint: '/search',
          searchType: 'people',
          searchTerm: 'luke',
          timestamp: new Date(baseTime.getTime()), // Same hour
          duration: 100,
        },
        {
          endpoint: '/search',
          searchType: 'people',
          searchTerm: 'vader',
          timestamp: new Date(baseTime.getTime() + 30 * 60 * 1000), // Same hour, 30 min later
          duration: 100,
        },
        {
          endpoint: '/search',
          searchType: 'movies',
          searchTerm: 'hope',
          timestamp: new Date(baseTime.getTime() + 60 * 60 * 1000), // Next hour
          duration: 100,
        },
      ];

      mockQueryTracker.getQueries.mockReturnValue(mockQueries);

      await service.computeStatistics();

      const stats = service.getStatistics();

      expect(stats.popularHours[0].hour).toBe(baseTime.getHours());
      expect(stats.popularHours[0].count).toBe(2);
      expect(stats.popularHours[0].percentage).toBeCloseTo(66.67, 1);
    });

    it('should clear old queries after computation', async () => {
      const mockQueries = [
        {
          endpoint: '/search',
          searchType: 'people',
          searchTerm: 'luke',
          timestamp: new Date(),
          duration: 100,
        },
      ];

      mockQueryTracker.getQueries.mockReturnValue(mockQueries);

      await service.computeStatistics();

      expect(queryTracker.clearOldQueries).toHaveBeenCalledWith(24);
    });
  });

  describe('getStatistics', () => {
    it('should return computed stats', () => {
      const stats = service.getStatistics();

      expect(stats.totalQueries).toBe(0);
      expect(stats.topQueries).toEqual([]);
      expect(stats.lastUpdated).toBeInstanceOf(Date);
      expect(stats.nextUpdate).toBeInstanceOf(Date);
    });
  });
});
