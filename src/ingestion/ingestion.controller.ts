import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  @Post('data-source')
  createDataSource(@Body() createDataSourceDto: CreateDataSourceDto) {
    return this.ingestionService.createDataSource(createDataSourceDto);
  }




  

  @Get()
  findAll() {
    return this.ingestionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ingestionService.findOne(+id);
  }

  @Patch(':id')
  updateDataSource(@Param('id') id: string, @Body() updateDataSourceDto: UpdateDataSourceDto) {
    return this.ingestionService.updateDataSource(+id, updateDataSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingestionService.remove(+id);
  }
}
