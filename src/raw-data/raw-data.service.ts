import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { CreateRawDataDto, UpdateRawDataDto } from './dto';
import { PaginationDto } from 'src/common';
import { handleExceptions } from 'src/common/helpers/exceptions';

@Injectable()
export class RawDataService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('RawDataService');

  onModuleInit() {
    this.$connect();
    this.logger.log('RawData Database connected')
  }

  async create(createRawDataDto: CreateRawDataDto) {
    try {
      const rawData = await this.rawData.create({ data: createRawDataDto });

      //TODO: Colocar el envío de la solicitud para validar la información

      //TODO: Colocar la actualización del estado del rawData creado

      return rawData
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const totalRecords = await this.rawData.count({ where: { available: true } });
      const lastPage = Math.ceil(totalRecords / limit)
      const data = await this.rawData.findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: { available: true },
        omit: {
          lastAccessed: true,
          createAt: true,
          updatedAt: true,
          dataSourceId: true,
          available: true,
        },
        include: {
          dataSource: {
            select: {
              name: true,
              description: true,
              sourceType: true,
            }
          }
        }
      })

      return { data, meta: { page, totalRecords, lastPage } };
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async findOne(id: string) {
    try {
      const rawData = await this.rawData.findFirst(
        {
          where: { id: id, available: true },
          omit: {
            lastAccessed: true,
            createAt: true,
            updatedAt: true,
            dataSourceId: true,
            available: true,
          },
          include: {
            dataSource: {
              select: {
                name: true,
                description: true,
                sourceType: true,
              }
            }
          }
        }
      )
      if (!rawData) {
        throw new RpcException({ message: `Raw Data with id ${id} not found`, status: HttpStatus.BAD_REQUEST })
      }

      return rawData;
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async update(id: string, updateRawDataDto: UpdateRawDataDto) {
    const { id: __, ...data } = updateRawDataDto;
    await this.findOne(id);

    try {
      return this.rawData.update({
        where: { id: id },
        data: data,
      })
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async remove(id: string) {
    await this.findOne(id);
    try {
      const rawData = await this.rawData.update({ where: { id }, data: { available: false } })

      return rawData
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }
}
