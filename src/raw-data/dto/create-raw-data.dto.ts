import { HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { RawDataPriority } from "@prisma/client";
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";
import { rawPriorityList } from "../enums/raw-data.enum";

export class CreateRawDataDto {
    @IsNotEmpty()
    @IsString()
    public dataSchemaVersion: string; //* Versión del esquema del dato crudo para trazabilidad (v1.0.0)

    @IsObject()
    @Transform(({ value }) => {
        try {
            if (typeof value === 'object') {
                return value;
            }
            return JSON.parse(value);
        } catch (error) {
            console.log({ error })
            throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'Invalid JSON format for dataPayload' })
        }
    })
    @Type(() => Object)
    public dataPayload: object;

    @IsNotEmpty()
    @IsUUID()
    @IsString()
    public ingestedBy: string; //* Usuario o sistema que ingresó el dato

    @IsEnum(rawPriorityList, {
        message: `Possible priority are ${rawPriorityList}`
    })
    public priority: RawDataPriority; //* Serán un enum (Alta, Media, Baja). Prioridad de procesamiento de datos

    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public dataSourceId: string;

} 
