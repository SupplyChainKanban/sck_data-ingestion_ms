import { Injectable } from '@nestjs/common';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';

@Injectable()
export class IngestionService {
  createDataSource(createDataSourceDto: CreateDataSourceDto) {
    return createDataSourceDto;
  }

  findAll() {
    return `This action returns all ingestion`;
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
