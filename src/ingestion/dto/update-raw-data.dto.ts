import { PartialType } from "@nestjs/mapped-types";
import { CreateRawDataDto } from "./create-raw-data.dto";

export class UpdateRawDataDto extends PartialType(CreateRawDataDto) {

}