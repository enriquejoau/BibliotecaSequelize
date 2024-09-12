import { IsString, IsDate, IsOptional } from 'class-validator';

export class UpdateAutorDto {
  @IsString()
  @IsOptional()
  nombre?: string;

  @IsDate()
  @IsOptional()
  fecha_nacimiento?: Date;

  @IsString()
  @IsOptional()
  nacionalidad?: string;
}
