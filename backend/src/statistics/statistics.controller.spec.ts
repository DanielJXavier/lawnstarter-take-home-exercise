import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let service: StatisticsService;

  const mockStatisticsService = {
    getStatistics: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: StatisticsService,
          useValue: mockStatisticsService,
        },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    service = module.get<StatisticsService>(StatisticsService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatistics', () => {
    it('should return statistics', () => {
      const mockStats = {
        topQueries: [{ term: 'luke', count: 5, percentage: 50 }],
        averageResponseTime: 150,
        popularHours: [{ hour: 14, count: 10, percentage: 25 }],
        searchTypeBreakdown: { people: 30, movies: 10 },
        totalQueries: 40,
        lastUpdated: new Date(),
        nextUpdate: new Date(),
      };

      mockStatisticsService.getStatistics.mockReturnValue(mockStats);

      const result = controller.getStatistics();

      expect(result).toEqual(mockStats);
      expect(service.getStatistics).toHaveBeenCalled();
    });
  });
});
