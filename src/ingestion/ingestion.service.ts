import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto } from './dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class IngestionService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('IngestionService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected')
  }

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
