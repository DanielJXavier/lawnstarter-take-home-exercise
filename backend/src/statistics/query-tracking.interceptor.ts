import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { QueryTrackerService } from './query-tracker.service';

@Injectable()
export class QueryTrackingInterceptor implements NestInterceptor {
  constructor(private readonly queryTracker: QueryTrackerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;

        // Only track search endpoint requests
        if (request.path === '/search' && request.query) {
          const searchType = request.query.type || 'unknown';
          const searchTerm = request.query.term || '';

          this.queryTracker.trackQuery(
            request.path,
            searchType,
            searchTerm,
            duration,
          );
        }
      }),
    );
  }
}
