import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';
import { CreateRawDataDto } from './dto/create-raw-data.dto';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  @Post('data-source')
  createDataSource(@Body() createDataSourceDto: CreateDataSourceDto) {
    return this.ingestionService.createDataSource(createDataSourceDto);
  }

  @Post('raw-data')
  createRawData(@Body() createRawDataDto: CreateRawDataDto) {
    return this.ingestionService.createRawData(createRawDataDto);
  }

  @Get('data-source')
  findAllDataSources() {
    return this.ingestionService.findAllDataSources();
  }

  @Get('raw-data')
  findAllRawData() {
    return this.ingestionService.findAllRawData();
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
