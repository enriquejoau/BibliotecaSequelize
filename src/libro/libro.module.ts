import { Module } from '@nestjs/common';
import { LibroService } from './libro.service';
import { LibroController } from './libro.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Libro } from './libro.model';
import { Autor } from 'src/autor/autor.model';
import { Categoria } from 'src/categoria/categoria.model';
import { LibroCategoria } from 'src/libro_categoria/libro_categoria.model';

@Module({
  imports: [SequelizeModule.forFeature([Libro, Autor, Categoria, LibroCategoria])], // Registramos los modelos relacionados
  controllers: [LibroController],
  providers: [LibroService],
})
export class LibroModule {}
