import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriaModule } from './categoria/categoria.module';
import { LibroModule } from './libro/libro.module';
import { AutorModule } from './autor/autor.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres', // Cambia esto según tu configuración
      password: '1234',     // Cambia esto según tu configuración
      database: 'biblioteca',
      autoLoadModels: true,
      synchronize: true,  // No usamos synchronize, usamos migraciones
    }),
    CategoriaModule,
    LibroModule,
    AutorModule,
  ],
})
export class AppModule {}

