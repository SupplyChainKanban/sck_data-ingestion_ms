import { Module } from '@nestjs/common';
import { DataSourceModule } from './data-source/data-source.module';
import { RawDataModule } from './raw-data/raw-data.module';

@Module({
  imports: [DataSourceModule, RawDataModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
