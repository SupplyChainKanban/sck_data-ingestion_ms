import { PartialType } from "@nestjs/mapped-types";
import { CreateRawDataDto } from "./create-raw-data.dto";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateRawDataDto extends PartialType(CreateRawDataDto) {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  public id: string;
}