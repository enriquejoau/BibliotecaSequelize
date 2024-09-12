import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Autor } from "src/autor/autor.model";
import { Categoria } from "src/categoria/categoria.model";
import { LibroCategoria } from "src/libro_categoria/libro_categoria.model";


@Table
export class Libro extends Model {
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
  titulo: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_publicacion: Date;

  @ForeignKey(() => Autor)
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  autorId: string;

  @BelongsTo(() => Autor)
  autor: Autor;

  @BelongsToMany(() => Categoria, () => LibroCategoria)
  categorias: Categoria[];
}