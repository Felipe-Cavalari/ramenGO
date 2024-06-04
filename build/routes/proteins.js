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

// src/routes/proteins.ts
var proteins_exports = {};
__export(proteins_exports, {
  proteinsRoutes: () => proteinsRoutes
});
module.exports = __toCommonJS(proteins_exports);

// src/env/index.ts
var import_config = require("dotenv/config");
var import_zod = require("zod");
var envSchema = import_zod.z.object({
  NODE_ENV: import_zod.z.enum(["dev", "test", "prod"]).default("dev"),
  PORT: import_zod.z.coerce.number()
});
var _env = envSchema.safeParse(process.env);
if (_env.success === false) {
  console.error("\u274C Variaveis de amviente invalidas!", _env.error.format());
  throw new Error("Vari\xE1veis de ambiente invalidas!");
}
var env = _env.data;

// src/lib/prisma.ts
var import_client = require("@prisma/client");
var prisma = new import_client.PrismaClient({
  log: env.NODE_ENV === "dev" ? ["query"] : []
});

// src/middlewares/check-api-key.ts
var import_config2 = require("dotenv/config");
async function checkApiKey(request, reply) {
  const knowKey = process.env.APIKEY;
  const apiKeyRequest = request.headers["x-api-key"];
  if (!apiKeyRequest || apiKeyRequest !== knowKey) {
    reply.status(403).send({ "error": "x-api-key header missing" });
  }
}

// src/routes/proteins.ts
var import_zod2 = require("zod");
async function proteinsRoutes(app) {
  app.post("/", { preHandler: checkApiKey }, async (request, reply) => {
    const createProteinSchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      description: import_zod2.z.string(),
      price: import_zod2.z.number()
    });
    const { name, description, price } = createProteinSchema.parse(request.body);
    try {
      const newBroths = await prisma.proteins.create({
        data: {
          name,
          description,
          price
        }
      });
      reply.status(201).send({ "message": "successfully created protein" });
    } catch (error) {
      console.log(error);
      reply.status(500).send(error);
    }
  });
  app.get("/", { preHandler: checkApiKey }, async (request, reply) => {
    const allBroths = await prisma.proteins.findMany();
    return reply.status(200).send(allBroths);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  proteinsRoutes
});
