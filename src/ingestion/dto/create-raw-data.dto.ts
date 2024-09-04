import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsString, IsUUID } from "class-validator";

export class CreateRawDataDto {

    // TODO: Crear una relación con el DataSource
    // public source: DataSource;

    @IsObject()
    @Transform(({ value }) => {
        try {
            return JSON.parse(value);
        } catch (error) {
            // TODO: Agregar un tipo de error de Nest
            throw new Error('Invalid JSON format for connectionDetails')
        }
    })
    @Type(() => Object)
    public dataPayload: object;

    @IsNotEmpty()
    @IsString()
    public dataSchemaVersion: string; //* Versión del esquema del dato crudo para trazabilidad (v1.0.0)

    // TODO: Crear una relación con un usuario
    @IsNotEmpty()
    @IsUUID()
    @IsString()
    public ingestedBy: string; //* Usuario o sistema que ingresó el dato

    @IsEnum(['alta', 'media', 'baja'])
    public priority: string; //* Serán un enum (Alta, Media, Baja). Prioridad de procesamiento de datos
}