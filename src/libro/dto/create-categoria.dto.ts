import { IsString, IsDate, IsUUID, IsArray, IsNotEmpty } from 'class-validator';

export class CreateLibroDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsDate()
  @IsNotEmpty()
  fecha_publicacion: Date;

  @IsUUID()
  @IsNotEmpty()
  autorId: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  categorias: string[]; // IDs de las categorías
}
