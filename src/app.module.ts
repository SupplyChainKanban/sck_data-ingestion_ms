import { Module } from '@nestjs/common';
import { DataIngestionModule } from './data-ingestion/data-ingestion.module';

@Module({
  imports: [DataIngestionModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
