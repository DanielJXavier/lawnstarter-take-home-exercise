import { Test, TestingModule } from '@nestjs/testing';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';

describe('PeopleController', () => {
  let controller: PeopleController;
  let service: PeopleService;

  const mockPeopleService = {
    getPersonDetails: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        {
          provide: PeopleService,
          useValue: mockPeopleService,
        },
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
    service = module.get<PeopleService>(PeopleService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPersonDetails', () => {
    it('should return person details', async () => {
      const mockPerson = {
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
      };

      mockPeopleService.getPersonDetails.mockResolvedValue(mockPerson);

      const params = { id: '1' };
      const result = await controller.getPersonDetails(params);

      expect(result).toEqual(mockPerson);
      expect(service.getPersonDetails).toHaveBeenCalledWith('1');
    });

    it('should pass the correct ID to service', async () => {
      const mockPerson = {
        id: '10',
        name: 'Obi-Wan Kenobi',
        birth_year: '57BBY',
        gender: 'male',
        eye_color: 'blue-gray',
        hair_color: 'auburn, white',
        height: '182',
        mass: '77',
        movies: [],
      };

      mockPeopleService.getPersonDetails.mockResolvedValue(mockPerson);

      const params = { id: '10' };
      await controller.getPersonDetails(params);

      expect(service.getPersonDetails).toHaveBeenCalledWith('10');
    });
  });
});
