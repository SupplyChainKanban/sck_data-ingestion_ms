import { Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateDataSourceDto, CreateRawDataDto, UpdateDataSourceDto, UpdateRawDataDto } from './dto';
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
    const totalRecords = await this.dataSource.count({ where: { available: true } });
    const lastPage = Math.ceil(totalRecords / limit)
    const data = await this.dataSource.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        available: true,
      }
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
    const totalRecords = await this.rawData.count({ where: { available: true } });
    const lastPage = Math.ceil(totalRecords / limit)
    const data = await this.rawData.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        available: true,
      }
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
      where: { id: id, available: true }
    })
    if (!dataSource) {
      throw new NotFoundException(`Data Source with id #${id} not found`)
    }

    return dataSource;
  }

  async findOneRawData(id: number) {
    const rawData = await this.rawData.findFirst({
      where: { id: id, available: true }
    })
    if (!rawData) {
      throw new NotFoundException(`Raw Data with id #${id} not found`)
    }

    return rawData;
  }

  async updateDataSource(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    await this.findOneDataSource(id);

    return this.dataSource.update({
      where: { id: id },
      data: updateDataSourceDto,
    })
  }

  async updateRawData(id: number, updateRawDataDto: UpdateRawDataDto) {
    await this.findOneRawData(id);

    return this.rawData.update({
      where: { id: id },
      data: updateRawDataDto,
    })
  }

  async removeDataSource(id: number) {
    await this.findOneDataSource(id);

    const dataSource = await this.dataSource.update({
      where: { id },
      data: {
        available: false
      }
    })

    return dataSource;
  }

  async removeRawData(id: number) {
    await this.findOneRawData(id);

    const rawData = await this.rawData.update({
      where: { id },
      data: {
        available: false
      }
    })

    return rawData
  }
}






