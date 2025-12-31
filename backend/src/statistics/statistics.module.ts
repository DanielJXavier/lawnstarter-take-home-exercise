import { Module, Global } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { QueryTrackerService } from './query-tracker.service';
import { QueryTrackingInterceptor } from './query-tracking.interceptor';

@Global()
@Module({
  controllers: [StatisticsController],
  providers: [StatisticsService, QueryTrackerService, QueryTrackingInterceptor],
  exports: [QueryTrackerService, QueryTrackingInterceptor],
})
export class StatisticsModule {}
