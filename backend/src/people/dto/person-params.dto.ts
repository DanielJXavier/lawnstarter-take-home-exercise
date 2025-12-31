import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PersonParamsDto {
  @ApiProperty({
    description: 'Person ID',
    example: '1',
  })
  @IsNotEmpty({ message: 'id cannot be empty' })
  @IsString({ message: 'id must be a string' })
  id: string;
}
