import { HttpStatus, Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PrismaClient, RawDataPriority } from '@prisma/client';
import { delay, PaginationDto } from 'src/common';
import { handleExceptions } from 'src/common/helpers/exceptions';
import { SCK_NATS_SERVICE } from 'src/config';
import { ChangeRawDataStatusDto, CreateRawDataDto, UpdateRawDataDto } from './dto';
import { seedData } from 'src/common/data/seed';

@Injectable()
export class RawDataService extends PrismaClient implements OnModuleInit {

  private readonly logger = new Logger('RawDataService');

  constructor(
    @Inject(SCK_NATS_SERVICE) private readonly client: ClientProxy
  ) {
    super()
  }

  onModuleInit() {
    this.$connect();
    this.logger.log('RawData Database connected')
  }

  async create(createRawDataDto: CreateRawDataDto) {
    try {
      const rawData = await this.rawData.create({ data: createRawDataDto });

      const payload = {
        rawDataId: rawData.id,
        sourceId: rawData.dataSourceId,
        dataPayload: rawData.dataPayload,
        priority: rawData.priority,
      }
      this.client.emit('validate.rawData', payload)

      return rawData
    } catch (error) {
      handleExceptions(error, this.logger)
    }
  }

  async runSeed() {
    console.log("Entré el seed")
    const rawDataFromSeed = seedData.map((seed) => {
      const rawData: CreateRawDataDto = {
        dataSchemaVersion: seed.dataSchemaVersion,
        dataSourceId: seed.dataSourceId,
        ingestedBy: seed.ingestedBy,
        dataPayload: seed.dataPayload,
        priority: RawDataPriority[seed.priority]
      }
      return rawData;
    })
    for (const rawData of rawDataFromSeed) {

      await this.create(rawData);
      await delay(1000)
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

  async updateStatus(changeRawDataStatusDto: ChangeRawDataStatusDto) {
    const { id, status } = changeRawDataStatusDto

    try {
      const rawData = await this.findOne(id);
      if (rawData.status === status) return rawData;

      return this.rawData.update({
        where: { id },
        data: { status: status },
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
    } catch (error) {
      handleExceptions(error, this.logger);
    }
  }
}
