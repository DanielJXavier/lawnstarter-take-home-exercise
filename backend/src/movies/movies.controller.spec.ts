import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

describe('MoviesController', () => {
  let controller: MoviesController;
  let service: MoviesService;

  const mockMoviesService = {
    getMovieDetails: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: mockMoviesService,
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    service = module.get<MoviesService>(MoviesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getMovieDetails', () => {
    it('should return movie details', async () => {
      const mockMovie = {
        id: '1',
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
        characters: [
          { id: '1', name: 'Luke Skywalker' },
          { id: '2', name: 'C-3PO' },
        ],
      };

      mockMoviesService.getMovieDetails.mockResolvedValue(mockMovie);

      const params = { id: '1' };
      const result = await controller.getMovieDetails(params);

      expect(result).toEqual(mockMovie);
      expect(service.getMovieDetails).toHaveBeenCalledWith('1');
    });

    it('should pass the correct ID to service', async () => {
      const mockMovie = {
        id: '5',
        title: 'The Empire Strikes Back',
        opening_crawl: 'Test...',
        characters: [],
      };

      mockMoviesService.getMovieDetails.mockResolvedValue(mockMovie);

      const params = { id: '5' };
      await controller.getMovieDetails(params);

      expect(service.getMovieDetails).toHaveBeenCalledWith('5');
    });
  });
});
