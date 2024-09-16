import { Module } from '@nestjs/common';
import { RawDataService } from './raw-data.service';
import { RawDataController } from './raw-data.controller';
import { TransportsModule } from 'src/transports/transports.module';

@Module({
  controllers: [RawDataController],
  providers: [RawDataService],
  imports: [TransportsModule],
})
export class RawDataModule { }
