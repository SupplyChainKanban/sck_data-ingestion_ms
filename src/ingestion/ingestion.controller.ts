import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto, UpdateRawDataDto } from './dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  // @Post('data-source')
  @MessagePattern({ cmd: 'createDataSource' })
  // createDataSource(@Body() createDataSourceDto: CreateDataSourceDto) {
  createDataSource(@Payload() createDataSourceDto: CreateDataSourceDto) {
    return this.ingestionService.createDataSource(createDataSourceDto);
  }

  // @Post('raw-data')
  @MessagePattern({ cmd: 'createRawData' })
  // createRawData(@Body() createRawDataDto: CreateRawDataDto) {
  createRawData(@Payload() createRawDataDto: CreateRawDataDto) {
    return this.ingestionService.createRawData(createRawDataDto);
  }

  // @Get('data-source')
  @MessagePattern({ cmd: 'findAllDataSources' })
  // findAllDataSources(@Query() paginationDto: PaginationDto) {
  findAllDataSources(@Payload() paginationDto: PaginationDto) {
    return this.ingestionService.findAllDataSources(paginationDto);
  }

  // @Get('raw-data')
  @MessagePattern({ cmd: 'findAllRawData' })
  // findAllRawData(@Query() paginationDto: PaginationDto) {
  findAllRawData(@Payload() paginationDto: PaginationDto) {
    return this.ingestionService.findAllRawData(paginationDto);
  }

  // @Get('data-source/:id')
  @MessagePattern({ cmd: 'findOneDataSource' })
  // findOneDataSource(@Param('id') id: string) {
  findOneDataSource(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.findOneDataSource(id);
  }

  // @Get('raw-data/:id')
  @MessagePattern({ cmd: 'findOneRawData' })
  // findOneRawData(@Param('id') id: string) {
  findOneRawData(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.findOneRawData(id);
  }

  // @Patch('data-source/:id')
  @MessagePattern({ cmd: 'updateDataSource' })
  // updateDataSource(@Param('id', ParseIntPipe) id: number, @Body() updateDataSourceDto: UpdateDataSourceDto) {
  updateDataSource(@Payload() updateDataSourceDto: UpdateDataSourceDto) {
    return this.ingestionService.updateDataSource(updateDataSourceDto.id, updateDataSourceDto);
  }

  // @Patch('raw-data/:id')
  @MessagePattern({ cmd: 'updateRawData' })
  // updateRawData(@Param('id', ParseIntPipe) id: number, @Body() updateRawDataDto: UpdateRawDataDto) {
  updateRawData(@Payload() updateRawDataDto: UpdateRawDataDto) {
    return this.ingestionService.updateRawData(updateRawDataDto.id, updateRawDataDto);
  }

  // @Delete('data-source/:id')
  @MessagePattern({ cmd: 'deleteDataSource' })
  // removeDataSource(@Param('id', ParseIntPipe) id: number) {
  removeDataSource(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.removeDataSource(id);
  }

  // @Delete('raw-data/:id')
  @MessagePattern({ cmd: 'deleteRawData' })
  // removeRawData(@Param('id', ParseIntPipe) id: number) {
  removeRawData(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.removeRawData(id);
  }




}
