import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Libro } from './libro.model';
import { Autor } from '../autor/autor.model';
import { Categoria } from '../categoria/categoria.model';
import { CreateLibroDto } from './dto/create-categoria.dto';
import { UpdateLibroDto } from './dto/update-categoria.dto';

@Injectable()
export class LibroService {
  constructor(
    @InjectModel(Libro)
    private readonly libroModel: typeof Libro,
  ) {}

  // Crear un nuevo libro
  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    // Desestructuramos los campos de CreateLibroDto
    const { titulo, fecha_publicacion, autorId, categorias } = createLibroDto;

    // Validar que el autor exista
    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      throw new NotFoundException('Autor no encontrado');
    }

    // Validar que las categorías existan
    const categoriasValidas = await Categoria.findAll({
      where: { id: categorias },
    });
    if (categoriasValidas.length !== categorias.length) {
      throw new BadRequestException('Una o más categorías no existen');
    }

    // Crear el libro excluyendo las categorías
    const libro = await this.libroModel.create({
      titulo,
      fecha_publicacion,
      autorId,
    });

    // Asociar las categorías al libro creado
    await libro.$set('categorias', categorias);

    return libro;
  }
  

  // Obtener todos los libros con paginación
  async findAll(page: number = 1, limit: number = 10): Promise<Libro[]> {
    const offset = (page - 1) * limit;
    return this.libroModel.findAll({
      include: [Autor, Categoria], // Incluir autor y categorías
      offset,
      limit,
    });
  }

  // Obtener un libro por ID
  async findOne(id: string): Promise<Libro> {
    const libro = await this.libroModel.findByPk(id, { include: [Autor, Categoria] });
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    return libro;
  }

  // Actualizar un libro
  async update(id: string, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    const { categorias } = updateLibroDto;

    // Validar que las categorías existan
    if (categorias) {
      const categoriasValidas = await Categoria.findAll({
        where: { id: categorias },
      });
      if (categoriasValidas.length !== categorias.length) {
        throw new BadRequestException('Una o más categorías no existen');
      }
      await libro.$set('categorias', categorias);
    }

    return libro.update(updateLibroDto);
  }

  // Eliminar un libro
  async delete(id: string): Promise<void> {
    const libro = await this.findOne(id);
    await libro.destroy();
  }
}
