import { Controller, Get, Param } from '@nestjs/common';
import { PeopleService } from './people.service';
import { PersonParamsDto } from './dto/person-params.dto';

@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  getPersonDetails(@Param() params: PersonParamsDto) {
    return this.peopleService.getPersonDetails(params.id);
  }
}
