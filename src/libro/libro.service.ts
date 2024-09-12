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


  async create(createLibroDto: CreateLibroDto): Promise<Libro> {
    const { titulo, fecha_publicacion, autorId, categorias } = createLibroDto;

    const autor = await Autor.findByPk(autorId);
    if (!autor) {
      throw new NotFoundException('Autor no encontrado');
    }

    const categoriasValidas = await Categoria.findAll({
      where: { id: categorias },
    });
    if (categoriasValidas.length !== categorias.length) {
      throw new BadRequestException('Una o más categorías no existen');
    }

    const libro = await this.libroModel.create({
      titulo,
      fecha_publicacion,
      autorId,
    });

    await libro.$set('categorias', categorias);

    return libro;
  }
  

  async findAll(page: number = 1, limit: number = 10): Promise<Libro[]> {
    const offset = (page - 1) * limit;
    return this.libroModel.findAll({
      include: [Autor, Categoria], 
      offset,
      limit,
    });
  }

  async findOne(id: string): Promise<Libro> {
    const libro = await this.libroModel.findByPk(id, { include: [Autor, Categoria] });
    if (!libro) {
      throw new NotFoundException('Libro no encontrado');
    }
    return libro;
  }

  async update(id: string, updateLibroDto: UpdateLibroDto): Promise<Libro> {
    const libro = await this.findOne(id);
    const { categorias } = updateLibroDto;

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

  async delete(id: string): Promise<void> {
    const libro = await this.findOne(id);
    await libro.destroy();
  }
}
