import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto, UpdateRawDataDto } from './dto';
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

  @Patch('/data-source/:id')
  updateDataSource(@Param('id', ParseIntPipe) id: number, @Body() updateDataSourceDto: UpdateDataSourceDto) {
    return this.ingestionService.updateDataSource(id, updateDataSourceDto);
  }

  @Patch('/raw-data/:id')
  updateRawData(@Param('id', ParseIntPipe) id: number, @Body() updateRawDataDto: UpdateRawDataDto) {
    return this.ingestionService.updateRawData(id, updateRawDataDto);
  }






  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ingestionService.remove(+id);
  }
}
