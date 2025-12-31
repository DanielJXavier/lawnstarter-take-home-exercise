import { IsNotEmpty, IsString } from 'class-validator';

export class PersonParamsDto {
  @IsNotEmpty({ message: 'id cannot be empty' })
  @IsString({ message: 'id must be a string' })
  id: string;
}
