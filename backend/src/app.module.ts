import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';

import { PeopleController } from './people/people.controller';
import { PeopleService } from './people/people.service';

@Module({
  imports: [],
  controllers: [AppController, SearchController, PeopleController],
  providers: [AppService, SearchService, PeopleService],
})
export class AppModule {}
