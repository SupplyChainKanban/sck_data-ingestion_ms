export class DataSource {


    id: string;


    name: string; // Nombre de la fuente


    description: string;


    sourceType: string; //* Será un enum ('MES', 'MANUAL', 'PROYECTO')


    connectionDetails: object;// Aquí se almacenará la configuración de la conexión en formato JSON (URL, credenciales)


    frecuency: string; // Será un Enum. Frecuencia de ingesta (Tiempo real, periódico, manual)


    status: string; // Será un enum. Estado de la fuente (Activo, Inactivo)


    lastAccessed: Date; // Última vez que se accedió a la fuente


    createAt: Date;


    updatedAt: Date;


}