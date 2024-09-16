import { PartialType } from "@nestjs/mapped-types";
import { CreateRawDataDto } from "./create-raw-data.dto";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateRawDataDto extends PartialType(CreateRawDataDto) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  @IsOptional()
  public id?: string;
}