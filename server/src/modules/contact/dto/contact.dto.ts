import { Transform } from 'class-transformer';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

const trimString = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class ContactDto {
  @Transform(trimString)
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @Transform(trimString)
  @IsEmail()
  email: string;

  @Transform(trimString)
  @IsString()
  @MinLength(10)
  @MaxLength(2000)
  message: string;
}
