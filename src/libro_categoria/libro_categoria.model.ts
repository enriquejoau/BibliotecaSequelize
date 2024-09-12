import { Table, Column, Model, ForeignKey, DataType } from 'sequelize-typescript';
import { Libro } from '../libro/libro.model';
import { Categoria } from '../categoria/categoria.model';

@Table
export class LibroCategoria extends Model {
  @ForeignKey(() => Libro)
  @Column({
    type: DataType.UUID,
  })
  libroId: string;

  @ForeignKey(() => Categoria)
  @Column({
    type: DataType.UUID,
  })
  categoriaId: string;
}
