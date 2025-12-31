import { Controller, Get, Param } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { MovieParamsDto } from './dto/movie-params.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get(':id')
  getMovieDetails(@Param() params: MovieParamsDto) {
    return this.moviesService.getMovieDetails(params.id);
  }
}
