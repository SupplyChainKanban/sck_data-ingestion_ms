import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateRawDataDto, UpdateRawDataDto } from './dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class IngestionService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('IngestionService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected')
  }

  createRawData(createRawDataDto: CreateRawDataDto) {
    return this.rawData.create({
      data: createRawDataDto
    })
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

  async findOneRawData(id: number) {
    const rawData = await this.rawData.findFirst({
      where: { id: id, available: true }
    })
    if (!rawData) {
      throw new RpcException({
        message: `Raw Data with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }

    return rawData;
  }

  async updateRawData(id: number, updateRawDataDto: UpdateRawDataDto) {
    //? Aquí se colocará el id solo para que funcione el TCP
    const { id: __, ...data } = updateRawDataDto;

    await this.findOneRawData(id);

    return this.rawData.update({
      where: { id: id },
      //? data: updateRawDataDto,
      data: data,
    })
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






