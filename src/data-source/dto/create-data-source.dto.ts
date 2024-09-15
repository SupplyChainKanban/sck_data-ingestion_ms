import { DataSourceFrequency, DataSourceStatus, DataSourceType } from '@prisma/client';
import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { sourceFrequencyList, sourceStatusList, sourceTypesList } from '../enums/data-source.enum';
import { RpcException } from '@nestjs/microservices';
import { HttpStatus } from '@nestjs/common';

export class CreateDataSourceDto {

    @IsNotEmpty()
    @IsString()
    public name: string; // Nombre de la fuente

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsEnum(sourceTypesList, {
        message: `Possible types are ${sourceTypesList}`
    })
    public sourceType: DataSourceType; //* Será un enum ('MES', 'MANUAL', 'PROYECTO')

    @IsObject()
    @Transform(({ value }) => {
        try {
            if (typeof value === 'object') {
                return value;
            }
            return JSON.parse(value);
        } catch (error) {
            console.log({ error })
            throw new RpcException({ status: HttpStatus.BAD_REQUEST, message: 'Invalid JSON format for connectionDetails' })
        }
    })
    @Type(() => Object)
    public connectionDetails: object;// Aquí se almacenará la configuración de la conexión en formato JSON (URL, credenciales)

    @IsEnum(sourceFrequencyList, {
        message: `Possible frequency are ${sourceFrequencyList}`
    })
    public frequency: DataSourceFrequency; // Será un Enum. Frecuencia de ingesta (Tiempo real, periódico, manual)

    @IsEnum(sourceStatusList, {
        message: `Possible status are ${sourceStatusList}`
    })
    @IsOptional()
    public status?: DataSourceStatus; // Será un enum. Estado de la fuente (Activo, Inactivo)


}
