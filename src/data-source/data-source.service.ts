import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class DataSourceService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('IngestionService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataSource Database connected')
  }

  create(createDataSourceDto: CreateDataSourceDto) {
    return this.dataSource.create({
      data: createDataSourceDto
    });
  }

  async findAll(paginationDto: PaginationDto) {
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

  async findOne(id: number) {
    const dataSource = await this.dataSource.findFirst({
      where: { id: id, available: true }
    })
    if (!dataSource) {
      throw new RpcException({
        message: `Data Source with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }
    return dataSource;
  }

  async update(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    //? Aquí se colocará el id solo para que funcione el TCP
    const { id: __, ...data } = updateDataSourceDto;

    await this.findOne(id);

    return this.dataSource.update({
      where: { id: id },
      //? data: updateDataSourceDto,
      data: data,
    })
  }

  async remove(id: number) {
    await this.findOne(id);

    const dataSource = await this.dataSource.update({
      where: { id },
      data: {
        available: false
      }
    })

    return dataSource;
  }
}
