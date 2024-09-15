/*
  Warnings:

  - A unique constraint covering the columns `[name,description,sourceType,frequency]` on the table `DataSource` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[dataSchemaVersion,dataPayload,ingestedBy,priority,dataSourceId]` on the table `RawData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "DataSource_name_description_sourceType_frequency_key" ON "DataSource"("name", "description", "sourceType", "frequency");

-- CreateIndex
CREATE UNIQUE INDEX "RawData_dataSchemaVersion_dataPayload_ingestedBy_priority_d_key" ON "RawData"("dataSchemaVersion", "dataPayload", "ingestedBy", "priority", "dataSourceId");
