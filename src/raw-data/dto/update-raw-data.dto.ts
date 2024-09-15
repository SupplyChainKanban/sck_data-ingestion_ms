import { PartialType } from "@nestjs/mapped-types";
import { CreateRawDataDto } from "./create-raw-data.dto";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateRawDataDto extends PartialType(CreateRawDataDto) {
  //? Aquí se colocará el id solo para que funcione el TCP
  @IsNumber()
  @IsPositive()
  public id: number;
}