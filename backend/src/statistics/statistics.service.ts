import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { QueryTrackerService } from './query-tracker.service';
import { QueryRecord, QueryStatistics } from './types';

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  private cachedStats: QueryStatistics | null = null;

  constructor(
    private readonly queryTracker: QueryTrackerService,
    private readonly eventEmitter: EventEmitter2,
  ) {
    // Compute initial statistics on startup
    this.computeStatistics();
  }

  @Cron(CronExpression.EVERY_5_MINUTES)
  async computeStatistics(): Promise<void> {
    this.logger.log('Computing statistics...');

    const queries = this.queryTracker.getQueries();

    if (queries.length === 0) {
      this.cachedStats = this.getEmptyStats();
      this.logger.log('No queries to compute statistics from');
      return;
    }

    const now = new Date();
    this.cachedStats = {
      topQueries: this.getTopQueries(queries),
      averageResponseTime: this.getAverageResponseTime(queries),
      popularHours: this.getPopularHours(queries),
      searchTypeBreakdown: this.getSearchTypeBreakdown(queries),
      totalQueries: queries.length,
      lastUpdated: now,
      nextUpdate: new Date(now.getTime() + 5 * 60 * 1000),
    };

    this.logger.log(
      `Statistics computed: ${queries.length} queries, avg response time: ${this.cachedStats.averageResponseTime.toFixed(2)}ms`,
    );

    // Emit event for other services to listen
    this.eventEmitter.emit('statistics.computed', this.cachedStats);

    // Clean up old queries to prevent memory issues
    this.queryTracker.clearOldQueries(24);
  }

  getStatistics(): QueryStatistics {
    if (!this.cachedStats) {
      return this.getEmptyStats();
    }
    return this.cachedStats;
  }

  private getTopQueries(
    queries: QueryRecord[],
  ): Array<{ term: string; count: number; percentage: number }> {
    // Count occurrences of each search term
    const termCounts = new Map<string, number>();

    queries.forEach((query) => {
      const count = termCounts.get(query.searchTerm) || 0;
      termCounts.set(query.searchTerm, count + 1);
    });

    // Sort by count and get top 5
    const sorted = Array.from(termCounts.entries())
      .map(([term, count]) => ({
        term,
        count,
        percentage: (count / queries.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return sorted;
  }

  private getAverageResponseTime(queries: QueryRecord[]): number {
    const total = queries.reduce((sum, query) => sum + query.duration, 0);
    return queries.length > 0 ? total / queries.length : 0;
  }

  private getPopularHours(
    queries: QueryRecord[],
  ): Array<{ hour: number; count: number; percentage: number }> {
    // Count queries by hour of day
    const hourCounts = new Map<number, number>();

    queries.forEach((query) => {
      const hour = query.timestamp.getHours();
      const count = hourCounts.get(hour) || 0;
      hourCounts.set(hour, count + 1);
    });

    // Convert to array and sort by count
    const sorted = Array.from(hourCounts.entries())
      .map(([hour, count]) => ({
        hour,
        count,
        percentage: (count / queries.length) * 100,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return sorted;
  }

  private getSearchTypeBreakdown(queries: QueryRecord[]): {
    people: number;
    movies: number;
  } {
    const breakdown = {
      people: 0,
      movies: 0,
    };

    queries.forEach((query) => {
      if (query.searchType === 'people') {
        breakdown.people++;
      } else if (query.searchType === 'movies') {
        breakdown.movies++;
      }
    });

    return breakdown;
  }

  private getEmptyStats(): QueryStatistics {
    const now = new Date();
    return {
      topQueries: [],
      averageResponseTime: 0,
      popularHours: [],
      searchTypeBreakdown: { people: 0, movies: 0 },
      totalQueries: 0,
      lastUpdated: now,
      nextUpdate: new Date(now.getTime() + 5 * 60 * 1000),
    };
  }
}
