import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateDataSourceDto, UpdateDataSourceDto } from './dto';
import { PaginationDto } from 'src/common';

@Injectable()
export class DataSourceService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('DataSourceService');

  onModuleInit() {
    this.$connect();
    this.logger.log('DataSource Database connected')
  }

  create(createDataSourceDto: CreateDataSourceDto) {
    try {
      return this.dataSource.create({ data: createDataSourceDto });
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const totalRecords = await this.dataSource.count({ where: { available: true } });
      const lastPage = Math.ceil(totalRecords / limit)
      const data = await this.dataSource.findMany({
        skip: (page - 1) * limit, take: limit, where: { available: true }
      })

      return {
        data, meta: { page, totalRecords, lastPage }
      }
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findOne(id: number) {
    try {
      const dataSource = await this.dataSource.findFirst({
        where: { id: id, available: true }
      })
      if (!dataSource) {
        throw new RpcException({
          message: `Data Source with id ${id} not found`,
          status: HttpStatus.NOT_FOUND,
        })
      }

      return dataSource;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async update(id: number, updateDataSourceDto: UpdateDataSourceDto) {
    //TODO: Falta colocar el dto para que se actualize
    //? Aquí se colocará el id solo para que funcione el TCP
    const { id: __, ...data } = updateDataSourceDto;
    await this.findOne(id);

    try {
      return this.dataSource.update({
        where: { id: id },
        //? data: updateDataSourceDto,
        data: data,
      })
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: number) {
    await this.findOne(id);
    try {
      const dataSource = await this.dataSource.update({ where: { id }, data: { available: false } })

      return dataSource;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    switch (error.code) {
      case '123123123123':
        throw new RpcException({ status: HttpStatus.I_AM_A_TEAPOT, message: 'Error manejado' });
      default:
        this.logger.error(error);
        throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: error.message });
    }
  }
}
