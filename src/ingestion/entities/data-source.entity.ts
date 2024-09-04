export class DataSource {


    public id: string;


    public name: string; // Nombre de la fuente


    public description: string;


    public sourceType: string; //* Será un enum ('MES', 'MANUAL', 'PROYECTO')


    public connectionDetails: object;// Aquí se almacenará la configuración de la conexión en formato JSON (URL, credenciales)


    public frequency: string; // Será un Enum. Frecuencia de ingesta (Tiempo real, periódico, manual)


    public status: string; // Será un enum. Estado de la fuente (Activo, Inactivo)


    public lastAccessed: Date; // Última vez que se accedió a la fuente


    public createAt: Date;


    public updatedAt: Date;


}