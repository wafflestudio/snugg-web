import { ConfigFile } from "@rtk-query/codegen-openapi";

const blackList = ["docRetrieve", "authRefreshCreate", "mediaPresignedCreate"];

const openapiConfig: ConfigFile = {
  schemaFile: "http://54.180.123.137/doc/?lang=ko",
  apiFile: "store/api/base.ts",
  apiImport: "baseApi",
  outputFile: "store/api/injected.ts",
  exportName: "injectedApi",
  filterEndpoints: (operationName, operationDefinition) => {
    // partial update (PATCH)의 open api spec이 update (PUT)과 동일함...
    return (
      !blackList.includes(operationName) && operationDefinition.verb !== "patch"
    );
  },
  hooks: true,
};

export default openapiConfig;
