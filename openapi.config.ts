import { ConfigFile } from "@rtk-query/codegen-openapi";

const blackList = ["docRetrieve", "authRefreshCreate"];

const openapiConfig: ConfigFile = {
  schemaFile: "http://54.180.123.137/doc/?lang=ko",
  apiFile: "store/api/base.ts",
  apiImport: "baseApi",
  outputFile: "store/api/injected.ts",
  exportName: "injectedApi",
  filterEndpoints: (operationName) => {
    return !blackList.includes(operationName);
  },
};

export default openapiConfig;
