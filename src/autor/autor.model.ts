import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Libro } from 'src/libro/libro.model';

@Table({ tableName: 'Autores' })
export class Autor extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_nacimiento: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nacionalidad: string;

  @HasMany(() => Libro)
  libros: Libro[];
}