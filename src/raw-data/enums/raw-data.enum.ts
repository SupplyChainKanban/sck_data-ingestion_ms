import { RawDataPriority, RawDataStatus } from "@prisma/client";

export const rawPriorityList = [
    RawDataPriority.HIGH,
    RawDataPriority.LOW,
    RawDataPriority.MEDIUM,
]

export const rawStatusList = [
    RawDataStatus.PENDING,
    RawDataStatus.VALIDATED,
    RawDataStatus.ERROR,
]