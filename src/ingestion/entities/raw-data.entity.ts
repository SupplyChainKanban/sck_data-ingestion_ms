import { DataSource } from "./data-source.entity";

export class RawData {


    public id: string;


    public source: DataSource;


    public dataPayload: object;


    public dataSchemaVersion: string; //* Versión del esquema del dato crudo para trazabilidad


    public ingestedBy: string; //* Usuario o sistema que ingresó el dato


    public priority: string; //* Serán un enum (Alta, Media, Baja). Prioridad de procesamiento de datos


    public status: string; //* Será un enum (pending, processed, error)


    public errorMessage: string; //* Mensaje de error si existe


    public available: boolean;


    public lastAccessed: Date; // Última vez que se accedió a la fuente


    public createAt: Date;


    public updatedAt: Date;
}