import { Module } from '@nestjs/common';
import { IngestionModule } from './ingestion/ingestion.module';
import { DataSourceModule } from './data-source/data-source.module';

@Module({
  imports: [IngestionModule, DataSourceModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
