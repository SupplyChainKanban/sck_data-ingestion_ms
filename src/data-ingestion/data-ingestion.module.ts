import { Module } from '@nestjs/common';
import { DataIngestionService } from './data-ingestion.service';
import { DataIngestionController } from './data-ingestion.controller';

@Module({
  controllers: [DataIngestionController],
  providers: [DataIngestionService],
})
export class DataIngestionModule {}
