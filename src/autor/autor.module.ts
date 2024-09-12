import { Module } from '@nestjs/common';
import { AutorService } from './autor.service';
import { AutorController } from './autor.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {Autor} from './autor.model';
import { Libro } from 'src/libro/libro.model';

@Module({
  imports: [SequelizeModule.forFeature([Autor, Libro])], // Registramos el modelo Autor y Libro en Sequelize
  controllers: [AutorController],
  providers: [AutorService],
})
export class AutorModule {}
