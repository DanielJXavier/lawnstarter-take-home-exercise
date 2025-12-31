import { Controller, Get, Param } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { MoviesService } from './movies.service';
import { MovieParamsDto } from './dto/movie-params.dto';
import { MovieDetailsDto } from './dto/movie-details.dto';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  @ApiOperation({
    summary: 'Get movie details by ID',
    description:
      'Retrieve detailed information about a Star Wars movie including its opening crawl and characters',
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Movie ID',
    example: '1',
  })
  @ApiOkResponse({
    description: 'Movie details retrieved successfully',
    type: MovieDetailsDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Movie not found',
  })
  @ApiResponse({
    status: 502,
    description: 'Bad gateway - SWAPI API is unavailable',
  })
  getMovieDetails(@Param() params: MovieParamsDto) {
    return this.moviesService.getMovieDetails(params.id);
  }
}
