import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateAutorDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsDate()
  @IsNotEmpty()
  fecha_nacimiento: Date;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;
}
