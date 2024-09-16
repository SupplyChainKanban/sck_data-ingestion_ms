import { RawDataStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";
import { rawStatusList } from "../enums/raw-data.enum";

export class ChangeRawDataStatusDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    public id: string;

    @IsEnum(rawStatusList, {
        message: `Possible status are ${rawStatusList}`
    })
    public status: RawDataStatus
} 