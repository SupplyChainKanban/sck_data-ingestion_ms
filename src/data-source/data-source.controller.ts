import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataSourceService } from './data-source.service';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto/';
import { PaginationDto } from 'src/common';

@Controller()
export class DataSourceController {
  constructor(private readonly dataSourceService: DataSourceService) { }

  @MessagePattern({ cmd: 'createDataSource' })
  create(@Payload() createDataSourceDto: CreateDataSourceDto) {
    return this.dataSourceService.create(createDataSourceDto);
  }

  @MessagePattern({ cmd: 'findAllDataSources' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.dataSourceService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneDataSource' })
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.dataSourceService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateDataSource' })
  update(@Payload() updateDataSourceDto: UpdateDataSourceDto) {
    return this.dataSourceService.update(updateDataSourceDto.id, updateDataSourceDto);
  }

  @MessagePattern({ cmd: 'deleteDataSource' })
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.dataSourceService.remove(id);
  }
}
