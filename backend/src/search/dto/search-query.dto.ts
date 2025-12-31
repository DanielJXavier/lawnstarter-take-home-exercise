import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { SearchType } from '../../types';

export class SearchQueryDto {
  @IsEnum(SearchType, {
    message: 'type must be either "people" or "movies"',
  })
  type: SearchType;

  @IsNotEmpty({ message: 'term cannot be empty' })
  @IsString({ message: 'term must be a string' })
  term: string;
}
