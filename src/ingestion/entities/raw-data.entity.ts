import { DataSource } from "./data-source.entity";

export class RawData {
    

    id: string;


    source: DataSource;


    sourceType: string; //* Sería un enum (MES, MANUAL, PROYECTO)


    dataSchemaVersion: string; //* Versión del esquema del dato crudo para trazabilidad


    dataPayload: object;


    ingestedBy: string; //* Usuario o sistema que ingresó el dato


    priority: string; //* Serán un enum (Alta, Media, Baja). Prioridad de procesamiento de datos


    timestamp: Date; //Fecha y hora de la entrada.


    status: string; //* Será un enum (pending, processed, error)


    errorMessage: string; //* Mensaje de error si existe
}