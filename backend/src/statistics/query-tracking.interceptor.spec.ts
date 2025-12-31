import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { QueryTrackingInterceptor } from './query-tracking.interceptor';
import { QueryTrackerService } from './query-tracker.service';

describe('QueryTrackingInterceptor', () => {
  let interceptor: QueryTrackingInterceptor;
  let queryTracker: QueryTrackerService;

  const mockQueryTracker = {
    trackQuery: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueryTrackingInterceptor,
        {
          provide: QueryTrackerService,
          useValue: mockQueryTracker,
        },
      ],
    }).compile();

    interceptor = module.get<QueryTrackingInterceptor>(
      QueryTrackingInterceptor,
    );
    queryTracker = module.get<QueryTrackerService>(QueryTrackerService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  describe('intercept', () => {
    it('should track search queries', (done) => {
      const mockRequest = {
        path: '/search',
        query: {
          type: 'people',
          term: 'luke',
        },
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      const mockCallHandler: CallHandler = {
        handle: () => of({}),
      };

      interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
        expect(queryTracker.trackQuery).toHaveBeenCalledWith(
          '/search',
          'people',
          'luke',
          expect.any(Number),
        );
        done();
      });
    });

    it('should not track non-search requests', (done) => {
      const mockRequest = {
        path: '/movies/1',
        query: {},
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      const mockCallHandler: CallHandler = {
        handle: () => of({}),
      };

      interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
        expect(queryTracker.trackQuery).not.toHaveBeenCalled();
        done();
      });
    });

    it('should handle requests with missing query params', (done) => {
      const mockRequest = {
        path: '/search',
        query: {},
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      const mockCallHandler: CallHandler = {
        handle: () => of({}),
      };

      interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
        expect(queryTracker.trackQuery).toHaveBeenCalledWith(
          '/search',
          'unknown',
          '',
          expect.any(Number),
        );
        done();
      });
    });

    it('should measure request duration', (done) => {
      const mockRequest = {
        path: '/search',
        query: { type: 'people', term: 'luke' },
      };

      const mockContext = {
        switchToHttp: () => ({
          getRequest: () => mockRequest,
        }),
      } as ExecutionContext;

      const mockCallHandler: CallHandler = {
        handle: () => of({}),
      };

      interceptor.intercept(mockContext, mockCallHandler).subscribe(() => {
        const callArgs = (queryTracker.trackQuery as jest.Mock).mock.calls[0];
        const duration = callArgs[3];
        expect(duration).toBeGreaterThanOrEqual(0);
        done();
      });
    });
  });
});
