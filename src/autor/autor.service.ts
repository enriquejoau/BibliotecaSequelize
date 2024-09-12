import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Autor } from './autor.model';
import { CreateAutorDto } from './dto/create-autor.dto';
import { UpdateAutorDto } from './dto/update-autor.dto';
import { Libro } from '../libro/libro.model';

@Injectable()
export class AutorService {
  constructor(@InjectModel(Autor) private autorModel: typeof Autor) {}

  // Crear un autor
  async create(createAutorDto: CreateAutorDto): Promise<Autor> {
    const autor = await this.autorModel.create({
      nombre: createAutorDto.nombre,
      fecha_nacimiento: createAutorDto.fecha_nacimiento,
      nacionalidad: createAutorDto.nacionalidad,
    });
    return autor;
  }

  // Obtener todos los autores con paginación
  async findAll(page: number = 1, limit: number = 10): Promise<Autor[]> {
    const offset = (page - 1) * limit;
    return this.autorModel.findAll({
      include: [Libro], // Incluir los libros asociados
      offset,
      limit,
    });
  }

  // Obtener un autor por ID
  async findOne(id: string): Promise<Autor> {
    const autor = await this.autorModel.findByPk(id, { include: [Libro] });
    if (!autor) {
      throw new NotFoundException('Autor no encontrado');
    }
    return autor;
  }

  // Actualizar un autor
  async update(id: string, updateAutorDto: UpdateAutorDto): Promise<Autor> {
    const autor = await this.findOne(id);
    return autor.update(updateAutorDto);
  }

  // Eliminar un autor solo si no tiene libros asociados
  async delete(id: string): Promise<void> {
    const autor = await this.findOne(id);
    const libros = await autor.$get('libros'); // Obtener libros asociados
    if (libros.length > 0) {
      throw new BadRequestException('No se puede eliminar el autor porque tiene libros asociados');
    }
    await autor.destroy();
  }
}
