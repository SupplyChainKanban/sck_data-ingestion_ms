import { Injectable } from '@nestjs/common';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto } from './dto';

@Injectable()
export class IngestionService {
  createDataSource(createDataSourceDto: CreateDataSourceDto) {
    return createDataSourceDto;
  }

  createRawData(createRawDataDto: CreateRawDataDto) {
    return createRawDataDto;
  }

  findAllDataSources() {
    return `This action returns all data sources`;
  }

  findAllRawData() {
    return `This action returns all raw data`;
  }




  

  findOne(id: number) {
    return `This action returns a #${id} ingestion`;
  }

  updateDataSource(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    return `This action updates a #${id} ingestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingestion`;
  }
}
