"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/routes/api-key.ts
var api_key_exports = {};
__export(api_key_exports, {
  apiKeyRoute: () => apiKeyRoute
});
module.exports = __toCommonJS(api_key_exports);
var import_crypto = require("crypto");
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
async function apiKeyRoute(app) {
  app.post("/", async (request, reply) => {
    function generateApiKey() {
      return (0, import_crypto.randomBytes)(32).toString("hex");
    }
    function saveApiKey(apiKey) {
      const apiKeys = {
        apiKeys: [{ key: apiKey }]
      };
      const filePath = import_path.default.resolve(__dirname, "../../api-keys.json");
      import_fs.default.writeFileSync(filePath, JSON.stringify(apiKeys, null, 2));
      console.log(`API key gerada e salva em ${filePath}`);
    }
    try {
      const apiKey = generateApiKey();
      saveApiKey(apiKey);
      reply.status(201).send({
        "message": "api-key gerada com sucesso",
        "key": apiKey
      });
    } catch (error) {
      console.log(error);
      reply.status(500).send("Erro interno na cria\xE7\xE3o do usu\xE1rio");
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  apiKeyRoute
});
