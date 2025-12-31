import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { StatisticsService } from './statistics.service';
import { StatisticsResponseDto } from './dto/statistics-response.dto';

@ApiTags('statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  @ApiOperation({
    summary: 'Get search query statistics',
    description:
      'Returns pre-computed statistics about search queries. Statistics are recomputed every 5 minutes via a cron job.',
  })
  @ApiOkResponse({
    description: 'Statistics retrieved successfully',
    type: StatisticsResponseDto,
  })
  getStatistics(): StatisticsResponseDto {
    return this.statisticsService.getStatistics();
  }
}
