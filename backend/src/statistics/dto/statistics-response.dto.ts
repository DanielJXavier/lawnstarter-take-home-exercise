import { ApiProperty } from '@nestjs/swagger';

class TopQueryDto {
  @ApiProperty({ example: 'luke', description: 'Search term' })
  term: string;

  @ApiProperty({ example: 15, description: 'Number of times searched' })
  count: number;

  @ApiProperty({ example: 25.5, description: 'Percentage of total searches' })
  percentage: number;
}

class PopularHourDto {
  @ApiProperty({
    example: 14,
    description: 'Hour of day (0-23, 24-hour format)',
  })
  hour: number;

  @ApiProperty({ example: 42, description: 'Number of queries in this hour' })
  count: number;

  @ApiProperty({ example: 15.3, description: 'Percentage of total queries' })
  percentage: number;
}

class SearchTypeBreakdownDto {
  @ApiProperty({ example: 35, description: 'Number of people searches' })
  people: number;

  @ApiProperty({ example: 25, description: 'Number of movie searches' })
  movies: number;
}

export class StatisticsResponseDto {
  @ApiProperty({
    type: [TopQueryDto],
    description: 'Top 5 most frequent search queries',
  })
  topQueries: TopQueryDto[];

  @ApiProperty({
    example: 125.5,
    description: 'Average response time in milliseconds',
  })
  averageResponseTime: number;

  @ApiProperty({
    type: [PopularHourDto],
    description: 'Top 5 most popular hours of the day for searches',
  })
  popularHours: PopularHourDto[];

  @ApiProperty({
    type: SearchTypeBreakdownDto,
    description: 'Breakdown of searches by type (people vs movies)',
  })
  searchTypeBreakdown: SearchTypeBreakdownDto;

  @ApiProperty({ example: 150, description: 'Total number of queries tracked' })
  totalQueries: number;

  @ApiProperty({
    example: '2025-12-31T18:30:00.000Z',
    description: 'When statistics were last computed',
  })
  lastUpdated: Date;

  @ApiProperty({
    example: '2025-12-31T18:35:00.000Z',
    description: 'When statistics will be recomputed next',
  })
  nextUpdate: Date;
}
