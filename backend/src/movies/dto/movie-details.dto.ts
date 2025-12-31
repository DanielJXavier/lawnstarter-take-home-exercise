import { ApiProperty } from '@nestjs/swagger';

class CharacterDto {
  @ApiProperty({
    example: '1',
    description: 'Character ID',
  })
  id: string;

  @ApiProperty({
    example: 'Luke Skywalker',
    description: 'Character name',
  })
  name: string;
}

export class MovieDetailsDto {
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

  @ApiProperty({
    example:
      'It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.',
    description: 'Movie opening crawl text',
  })
  opening_crawl: string;

  @ApiProperty({
    type: [CharacterDto],
    description: 'List of characters in the movie',
  })
  characters: CharacterDto[];
}
