import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import { SearchQueryDto } from './dto/search-query.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  @ApiOperation({
    summary: 'Search for people or movies',
    description:
      'Search the Star Wars API for people by name or movies by title',
  })
  @ApiQuery({
    name: 'type',
    enum: ['people', 'movies'],
    description: 'Type of search (people or movies)',
    required: true,
  })
  @ApiQuery({
    name: 'term',
    type: String,
    description: 'Search term (name for people, title for movies)',
    required: true,
    example: 'luke',
  })
  @ApiOkResponse({
    description: 'Search results found successfully',
    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['people'], example: 'people' },
              id: { type: 'string', example: '1' },
              name: { type: 'string', example: 'Luke Skywalker' },
            },
            required: ['type', 'id', 'name'],
          },
          {
            type: 'object',
            properties: {
              type: { type: 'string', enum: ['movies'], example: 'movies' },
              id: { type: 'string', example: '1' },
              title: { type: 'string', example: 'A New Hope' },
            },
            required: ['type', 'id', 'title'],
          },
        ],
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - invalid search type or missing term',
  })
  @ApiResponse({
    status: 502,
    description: 'Bad gateway - SWAPI API is unavailable',
  })
  getSearchResults(@Query() query: SearchQueryDto) {
    return this.searchService.getSearchResults(query.type, query.term);
  }
}
