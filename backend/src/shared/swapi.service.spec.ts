import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SwapiService } from './swapi.service';

describe('SwapiService', () => {
  let service: SwapiService;
  let configService: ConfigService;

  const mockConfigService = {
    get: jest.fn().mockReturnValue('https://swapi.tech/api'),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SwapiService,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<SwapiService>(SwapiService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get base URL from config service on initialization', () => {
    expect(configService.get).toHaveBeenCalledWith('SWAPI_BASE_URL');
  });

  describe('fetchFromSwapi', () => {
    it('should successfully fetch data from SWAPI', async () => {
      const mockData = { result: { uid: '1', properties: { name: 'Luke' } } };
      const mockResponse = {
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValue(mockData),
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      const result = await service.fetchFromSwapi('/people/1');

      expect(result).toEqual(mockData);
      expect(global.fetch).toHaveBeenCalledWith(
        'https://swapi.tech/api/people/1',
      );
    });

    it('should throw NotFoundException when resource is not found (404)', async () => {
      const mockResponse = {
        ok: false,
        status: 404,
        statusText: 'Not Found',
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(service.fetchFromSwapi('/people/999')).rejects.toThrow(
        new HttpException('Resource not found', HttpStatus.NOT_FOUND),
      );
    });

    it('should throw BAD_GATEWAY exception when SWAPI returns non-404 error', async () => {
      const mockResponse = {
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      };

      global.fetch = jest.fn().mockResolvedValue(mockResponse);

      await expect(service.fetchFromSwapi('/people/1')).rejects.toThrow(
        new HttpException(
          'SWAPI request failed: Internal Server Error',
          HttpStatus.BAD_GATEWAY,
        ),
      );
    });

    it('should throw BAD_GATEWAY exception when fetch fails', async () => {
      global.fetch = jest.fn().mockRejectedValue(new Error('Network error'));

      await expect(service.fetchFromSwapi('/people/1')).rejects.toThrow(
        new HttpException(
          'Failed to fetch data from SWAPI',
          HttpStatus.BAD_GATEWAY,
        ),
      );
    });
  });
});
