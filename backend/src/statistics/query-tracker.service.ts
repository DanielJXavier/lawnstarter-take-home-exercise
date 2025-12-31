import { Injectable, Logger } from '@nestjs/common';
import { QueryRecord } from './types';

@Injectable()
export class QueryTrackerService {
  private readonly logger = new Logger(QueryTrackerService.name);
  private queries: QueryRecord[] = [];

  trackQuery(
    endpoint: string,
    searchType: string,
    searchTerm: string,
    duration: number,
  ): void {
    const query: QueryRecord = {
      endpoint,
      searchType,
      searchTerm: searchTerm.toLowerCase().trim(),
      timestamp: new Date(),
      duration,
    };

    this.queries.push(query);
    this.logger.debug(
      `Tracked query: ${searchType} - "${searchTerm}" (${duration}ms)`,
    );
  }

  getQueries(): QueryRecord[] {
    return [...this.queries];
  }

  getQueriesCount(): number {
    return this.queries.length;
  }

  clearOldQueries(olderThanHours = 24): void {
    const cutoff = new Date(Date.now() - olderThanHours * 60 * 60 * 1000);
    const beforeCount = this.queries.length;
    this.queries = this.queries.filter((q) => q.timestamp > cutoff);
    const removedCount = beforeCount - this.queries.length;

    if (removedCount > 0) {
      this.logger.log(
        `Cleared ${removedCount} old queries (older than ${olderThanHours}h)`,
      );
    }
  }
}
