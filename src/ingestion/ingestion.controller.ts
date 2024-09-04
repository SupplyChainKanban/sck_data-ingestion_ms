import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';
import { CreateRawDataDto } from './dto/create-raw-data.dto';
import { PaginationDto } from 'src/common';

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
  findAllDataSources(@Query() paginationDto: PaginationDto) {
    return this.ingestionService.findAllDataSources(paginationDto);
  }

  @Get('raw-data')
  findAllRawData(@Query() paginationDto: PaginationDto) {
    return this.ingestionService.findAllRawData(paginationDto);
  }

  @Get('data-source/:id')
  findOneDataSource(@Param('id') id: string) {
    return this.ingestionService.findOneDataSource(+id);
  }

  @Get('raw-data/:id')
  findOneRawData(@Param('id') id: string) {
    return this.ingestionService.findOneRawData(+id);
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
