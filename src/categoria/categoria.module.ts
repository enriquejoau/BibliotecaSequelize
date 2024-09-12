import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { LibroCategoria } from 'src/libro_categoria/libro_categoria.model';
import { Libro } from 'src/libro/libro.model';
import { Categoria } from './categoria.model';

@Module({
  imports: [SequelizeModule.forFeature([Categoria, Libro, LibroCategoria])], // Registramos los modelos relacionados
  controllers: [CategoriaController],
  providers: [CategoriaService],
})
export class CategoriaModule {}
