import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SearchType } from '../../types';

export class SearchQueryDto {
  @ApiProperty({
    enum: SearchType,
    description: 'Type of search to perform',
    example: SearchType.PEOPLE,
  })
  @IsEnum(SearchType, {
    message: 'type must be either "people" or "movies"',
  })
  type: SearchType;

  @ApiProperty({
    description: 'Search term (name for people, title for movies)',
    example: 'luke',
    minLength: 1,
  })
  @IsNotEmpty({ message: 'term cannot be empty' })
  @IsString({ message: 'term must be a string' })
  term: string;
}
