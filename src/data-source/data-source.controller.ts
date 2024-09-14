import { Controller, ParseIntPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DataSourceService } from './data-source.service';
import { CreateDataSourceDto } from './dto/create-data-source.dto';
import { UpdateDataSourceDto } from './dto/update-data-source.dto';
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
  findOne(@Payload('id', ParseIntPipe) id: number) {
    return this.dataSourceService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateDataSource' })
  update(@Payload() updateDataSourceDto: UpdateDataSourceDto) {
    return this.dataSourceService.update(updateDataSourceDto.id, updateDataSourceDto);
  }

  @MessagePattern({ cmd: 'deleteDataSource' })
  remove(@Payload('id', ParseIntPipe) id: number) {
    return this.dataSourceService.remove(id);
  }
}
