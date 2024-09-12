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
      username: 'postgres',
      password: '1234',
      database: 'biblioteca',
      autoLoadModels: true,
      synchronize: true,
    }),
    CategoriaModule,
    LibroModule,
    AutorModule,
  ],
})
export class AppModule {}

