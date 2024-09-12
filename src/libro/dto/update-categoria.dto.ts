import { IsString, IsDate, IsUUID, IsArray, IsOptional } from 'class-validator';

export class UpdateLibroDto {
  @IsString()
  @IsOptional()
  titulo?: string;

  @IsDate()
  @IsOptional()
  fecha_publicacion?: Date;

  @IsUUID()
  @IsOptional()
  autorId?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  categorias?: string[];
}
