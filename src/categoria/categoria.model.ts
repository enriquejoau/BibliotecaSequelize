import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import { Libro } from '../libro/libro.model';
import { LibroCategoria } from 'src/libro_categoria/libro_categoria.model';

@Table
export class Categoria extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nombre: string;

  @BelongsToMany(() => Libro, () => LibroCategoria)
  libros: Libro[];
}