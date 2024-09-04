import { PartialType } from "@nestjs/mapped-types";
import { CreateDataSourceDto } from "./create-data-source.dto";
import { IsNumber, IsPositive } from "class-validator";

export class UpdateDataSourceDto extends PartialType(CreateDataSourceDto) {
    //? Aquí se colocará el id solo para que funcione el TCP
    @IsNumber()
    @IsPositive()
    public id: number;
}