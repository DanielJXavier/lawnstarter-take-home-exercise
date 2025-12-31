import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { PeopleService } from './people.service';
import { PersonParamsDto } from './dto/person-params.dto';
import { PersonDetailsDto } from './dto/person-details.dto';

@ApiTags('people')
@Controller('people')
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get person details by ID',
    description:
      'Retrieve detailed information about a Star Wars character including their physical characteristics and movies they appeared in',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Person ID',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Person details retrieved successfully',
    type: PersonDetailsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Person not found',
  })
  @ApiResponse({
    status: 502,
    description: 'Bad gateway - SWAPI API is unavailable',
  })
  getPersonDetails(@Param() params: PersonParamsDto) {
    return this.peopleService.getPersonDetails(params.id);
  }
}
