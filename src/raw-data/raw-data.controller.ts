import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RawDataService } from './raw-data.service';
import { PaginationDto } from 'src/common';
import { UpdateRawDataDto, CreateRawDataDto } from './dto';
import { ChangeRawDataStatusDto } from './dto/change-raw-data-status.dto';

@Controller()
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) { }

  @MessagePattern({ cmd: 'createRawData' })
  create(@Payload() createRawDataDto: CreateRawDataDto) {
    return this.rawDataService.create(createRawDataDto);
  }

  @MessagePattern({ cmd: 'findAllRawData' })
  findAll(@Payload() paginationDto: PaginationDto) {
    return this.rawDataService.findAll(paginationDto);
  }

  @MessagePattern({ cmd: 'findOneRawData' })
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.rawDataService.findOne(id);
  }

  @MessagePattern({ cmd: 'updateRawData' })
  update(@Payload() updateRawDataDto: UpdateRawDataDto) {
    return this.rawDataService.update(updateRawDataDto.id, updateRawDataDto);
  }

  @MessagePattern({ cmd: 'deleteRawData' })
  remove(@Payload('id', ParseUUIDPipe) id: string) {
    return this.rawDataService.remove(id);
  }

  @EventPattern('update.rawData.status')
  @MessagePattern('update.rawData.status')
  updateStatus(@Payload() changeRawDataStatusDto: ChangeRawDataStatusDto) {
    return this.rawDataService.updateStatus(changeRawDataStatusDto);
  }

  @EventPattern('rawData.seed')
  @MessagePattern('rawData.seed')
  runSeed(@Payload() payload: {}) {
    return this.rawDataService.runSeed();
  }

}
