import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categoria } from './categoria.model';
import { CreateCategoriaDto } from './dto/create-libro.dto';

@Injectable()
export class CategoriaService {
  constructor(@InjectModel(Categoria) private categoriaModel: typeof Categoria) {}

  // Crear una categoría
  async create(createCategoriaDto: CreateCategoriaDto): Promise<Categoria> {
    const categoria = await this.categoriaModel.create({
      nombre: createCategoriaDto.nombre,
    });
    return categoria;
  }

  // Obtener todas las categorías
  async findAll(): Promise<Categoria[]> {
    return this.categoriaModel.findAll();
  }

  // Eliminar una categoría solo si no tiene libros asociados
  async delete(id: string): Promise<void> {
    const categoria = await this.categoriaModel.findByPk(id);
    if (!categoria) {
      throw new BadRequestException('Categoría no encontrada');
    }

    const libros = await categoria.$get('libros');
    if (libros.length > 0) {
      throw new BadRequestException('No se puede eliminar la categoría porque tiene libros asociados');
    }

    await categoria.destroy();
  }
}
