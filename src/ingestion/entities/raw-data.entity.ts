import { DataSource } from "./data-source.entity";

export class RawData {
    

    public id: string;


    public source: DataSource;


    public dataPayload: object;
    
    
    public dataSchemaVersion: string; //* Versión del esquema del dato crudo para trazabilidad


    public ingestedBy: string; //* Usuario o sistema que ingresó el dato


    public priority: string; //* Serán un enum (Alta, Media, Baja). Prioridad de procesamiento de datos


    public timestamp: Date; //Fecha y hora de la entrada.


    public status: string; //* Será un enum (pending, processed, error)


    public errorMessage: string; //* Mensaje de error si existe
}