"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/middlewares/check-api-key.ts
var check_api_key_exports = {};
__export(check_api_key_exports, {
  checkApiKey: () => checkApiKey
});
module.exports = __toCommonJS(check_api_key_exports);
var import_config = require("dotenv/config");
async function checkApiKey(request, reply) {
  const knowKey = process.env.APIKEY;
  const apiKeyRequest = request.headers["x-api-key"];
  if (!apiKeyRequest || apiKeyRequest !== knowKey) {
    reply.status(403).send({ "error": "x-api-key header missing" });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkApiKey
});
