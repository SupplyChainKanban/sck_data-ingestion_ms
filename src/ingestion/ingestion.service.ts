import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class IngestionService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('IngestionService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected')
  }

  createDataSource(createDataSourceDto: CreateDataSourceDto) {
    return this.dataSource.create({
      data: createDataSourceDto
    });
  }

  createRawData(createRawDataDto: CreateRawDataDto) {
    return this.rawData.create({
      data: createRawDataDto
    })
  }

  async findAllDataSources(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRecords = await this.dataSource.count();
    const lastPage = Math.ceil(totalRecords / limit)
    const data = await this.dataSource.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data,
      meta: {
        page,
        totalRecords,
        lastPage,
      }
    }
  }

  async findAllRawData(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const totalRecords = await this.rawData.count();
    const lastPage = Math.ceil(totalRecords / limit)
    const data = await this.rawData.findMany({
      skip: (page - 1) * limit,
      take: limit,
    })

    return {
      data,
      meta: {
        page,
        totalRecords,
        lastPage
      }
    };
  }

  async findOneDataSource(id: number) {
    const dataSource = await this.dataSource.findFirst({
      where: { id: id }
    })
    if (!dataSource) {
      throw new NotFoundException(`Data Source with id #${id} not found`)
    }

    return dataSource;
  }

  async findOneRawData(id: number) {
    const rawData = await this.rawData.findFirst({
      where: { id: id }
    })
    if (!rawData) {
      throw new NotFoundException(`Raw Data with id #${id} not found`)
    }

    return rawData;
  }






  updateDataSource(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    return `This action updates a #${id} ingestion`;
  }

  remove(id: number) {
    return `This action removes a #${id} ingestion`;
  }
}
