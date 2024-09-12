import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { LibroService } from './libro.service';
import { CreateLibroDto } from './dto/create-categoria.dto';
import { UpdateLibroDto } from './dto/update-categoria.dto';

@Controller('libros')
export class LibroController {
  constructor(private readonly libroService: LibroService) {}

  @Post()
  create(@Body() createLibroDto: CreateLibroDto) {
    return this.libroService.create(createLibroDto);
  }

  @Get()
  findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.libroService.findAll(Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.libroService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateLibroDto: UpdateLibroDto) {
    return this.libroService.update(id, updateLibroDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.libroService.delete(id);
  }
}
