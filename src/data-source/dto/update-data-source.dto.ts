import { PartialType } from "@nestjs/mapped-types";
import { CreateDataSourceDto } from "./create-data-source.dto";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateDataSourceDto extends PartialType(CreateDataSourceDto) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public id: string;
}