import { ApiProperty } from '@nestjs/swagger';

class MovieDto {
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

export class PersonDetailsDto {
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

  @ApiProperty({
    example: '19BBY',
    description: 'Birth year',
  })
  birth_year: string;

  @ApiProperty({
    example: 'male',
    description: 'Gender',
  })
  gender: string;

  @ApiProperty({
    example: 'blue',
    description: 'Eye color',
  })
  eye_color: string;

  @ApiProperty({
    example: 'blond',
    description: 'Hair color',
  })
  hair_color: string;

  @ApiProperty({
    example: '172',
    description: 'Height in centimeters',
  })
  height: string;

  @ApiProperty({
    example: '77',
    description: 'Mass in kilograms',
  })
  mass: string;

  @ApiProperty({
    type: [MovieDto],
    description: 'List of movies the person appeared in',
  })
  movies: MovieDto[];
}
