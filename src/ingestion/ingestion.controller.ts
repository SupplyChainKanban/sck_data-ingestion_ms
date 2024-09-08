import { Controller, ParseIntPipe } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto, UpdateRawDataDto } from './dto';
import { PaginationDto } from 'src/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) { }

  @MessagePattern({ cmd: 'createDataSource' })
  createDataSource(@Payload() createDataSourceDto: CreateDataSourceDto) {
    return this.ingestionService.createDataSource(createDataSourceDto);
  }

  @MessagePattern({ cmd: 'createRawData' })
  createRawData(@Payload() createRawDataDto: CreateRawDataDto) {
    return this.ingestionService.createRawData(createRawDataDto);
  }

  @MessagePattern({ cmd: 'findAllDataSources' })
  findAllDataSources(@Payload() paginationDto: PaginationDto) {
    return this.ingestionService.findAllDataSources(paginationDto);
  }

  @MessagePattern({ cmd: 'findAllRawData' })
  findAllRawData(@Payload() paginationDto: PaginationDto) {
    return this.ingestionService.findAllRawData(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneDataSource' })
  findOneDataSource(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.findOneDataSource(id);
  }

  @MessagePattern({ cmd: 'findOneRawData' })
  findOneRawData(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.findOneRawData(id);
  }

  @MessagePattern({ cmd: 'updateDataSource' })
  updateDataSource(@Payload() updateDataSourceDto: UpdateDataSourceDto) {
    return this.ingestionService.updateDataSource(updateDataSourceDto.id, updateDataSourceDto);
  }

  @MessagePattern({ cmd: 'updateRawData' })
  updateRawData(@Payload() updateRawDataDto: UpdateRawDataDto) {
    return this.ingestionService.updateRawData(updateRawDataDto.id, updateRawDataDto);
  }

  @MessagePattern({ cmd: 'deleteDataSource' })
  removeDataSource(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.removeDataSource(id);
  }

  @MessagePattern({ cmd: 'deleteRawData' })
  removeRawData(@Payload('id', ParseIntPipe) id: number) {
    return this.ingestionService.removeRawData(id);
  }

}
