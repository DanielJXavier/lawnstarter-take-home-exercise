import { ApiProperty } from '@nestjs/swagger';
import { SearchType } from '../../types';

export class PersonSearchResultDto {
  @ApiProperty({
    enum: SearchType,
    example: SearchType.PEOPLE,
    description: 'Type of result',
  })
  type: SearchType.PEOPLE;

  @ApiProperty({
    example: '1',
    description: 'Person ID',
  })
  id: string;

  @ApiProperty({
    example: 'Luke Skywalker',
    description: 'Person name',
  })
  name: string;
}

export class MovieSearchResultDto {
  @ApiProperty({
    enum: SearchType,
    example: SearchType.MOVIES,
    description: 'Type of result',
  })
  type: SearchType.MOVIES;

  @ApiProperty({
    example: '1',
    description: 'Movie ID',
  })
  id: string;

  @ApiProperty({
    example: 'A New Hope',
    description: 'Movie title',
  })
  title: string;
}
