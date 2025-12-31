import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieParamsDto {
  @ApiProperty({
    description: 'Movie ID',
    example: '1',
  })
  @IsNotEmpty({ message: 'id cannot be empty' })
  @IsString({ message: 'id must be a string' })
  id: string;
}
