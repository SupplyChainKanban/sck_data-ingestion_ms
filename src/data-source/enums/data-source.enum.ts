import { DataSourceFrequency, DataSourceStatus, DataSourceType } from "@prisma/client";

export const sourceTypesList = [
    DataSourceType.MES,
    DataSourceType.MANUAL,
    DataSourceType.PROJECT,
]

export const sourceFrequencyList = [
    DataSourceFrequency.MANUAL,
    DataSourceFrequency.REAL,
    DataSourceFrequency.PERIODIC,
]

export const sourceStatusList = [
    DataSourceStatus.ACTIVE,
    DataSourceStatus.INACTIVE,
]