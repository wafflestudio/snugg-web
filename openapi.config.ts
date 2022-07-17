import { ConfigFile } from "@rtk-query/codegen-openapi";

const openapiConfig: ConfigFile = {
  schemaFile: "http://54.180.123.137/doc/?lang=ko",
  apiFile: "store/api/base.ts",
  apiImport: "baseApi",
  outputFile: "store/api/injected.ts",
  exportName: "injectedApi",
  filterEndpoints: (operationName) => {
    return operationName !== "docRetrieve";
  },
};

export default openapiConfig;
