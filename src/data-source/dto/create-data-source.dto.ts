import { Transform, Type } from "class-transformer";
import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";

export class CreateDataSourceDto {

    @IsNotEmpty()
    @IsString()
    public name: string; // Nombre de la fuente

    @IsNotEmpty()
    @IsString()
    public description: string;

    @IsEnum(['MES', 'MANUAL', 'PROJECT'])
    public sourceType: string; //* Será un enum ('MES', 'MANUAL', 'PROYECTO')

    // TODO: Agregar connectionDetails
    // @IsObject()
    // @Transform(({ value }) => {
    //     try {
    //         return JSON.parse(value);
    //     } catch (error) {
    //         // TODO: Agregar un tipo de error de Nest
    //         throw new Error('Invalid JSON format for connectionDetails')
    //     }
    // })
    // @Type(() => Object)
    // public connectionDetails: object;// Aquí se almacenará la configuración de la conexión en formato JSON (URL, credenciales)

    @IsEnum(['daily', 'weekly', 'monthly'])
    public frequency: string; // Será un Enum. Frecuencia de ingesta (Tiempo real, periódico, manual)

    @IsEnum(['active', 'inactive'])
    // @IsOptional()
    // TODO: Hacer opcional nuevamente a status
    public status: string; // Será un enum. Estado de la fuente (Activo, Inactivo)


}
