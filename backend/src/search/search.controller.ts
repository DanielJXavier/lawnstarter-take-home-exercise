import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  getSearchResults(@Query('type') type: string, @Query('term') term: string) {
    return this.searchService.getSearchResults(type, term);
  }
}
