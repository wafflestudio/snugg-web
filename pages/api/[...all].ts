// pages/api/[...all].ts
import { NextApiRequest, NextApiResponse } from "next";
import httpProxyMiddleware from "next-http-proxy-middleware";
import { API_ENDPOINT } from "../../store/api/base";

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
  },
};

const handleApi = (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: API_ENDPOINT,
    changeOrigin: true,
    pathRewrite: [
      {
        patternStr: "^/api/(.*)$",
        replaceStr: "/$1/",
      },
    ],
    onProxyInit: (server) => {
      server.on("proxyReq", (proxyReq) => {
        console.log(
          "proxyReq:",
          proxyReq.method,
          proxyReq.host,
          proxyReq.path,
        );
      });
      server.on("proxyRes", (proxyRes) => {
        console.log(
          "proxyRes:",
          proxyRes.statusCode,
          proxyRes.statusMessage,
        );
      });
    },
  });

export default handleApi;
