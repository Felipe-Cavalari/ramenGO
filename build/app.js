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

// src/app.ts
var app_exports = {};
__export(app_exports, {
  app: () => app
});
module.exports = __toCommonJS(app_exports);
var import_fastify = __toESM(require("fastify"));
var import_cookie = __toESM(require("@fastify/cookie"));

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

// src/routes/broths.ts
var import_zod2 = require("zod");
async function brothsRoutes(app2) {
  app2.post("/", { preHandler: checkApiKey }, async (request, reply) => {
    const createBrothsSchema = import_zod2.z.object({
      name: import_zod2.z.string(),
      description: import_zod2.z.string(),
      price: import_zod2.z.number()
    });
    const { name, description, price } = createBrothsSchema.parse(request.body);
    try {
      const newBroths = await prisma.broth.create({
        data: {
          name,
          description,
          price
        }
      });
      reply.status(201).send({ "message": "successfully created broths" });
    } catch (error) {
      console.log(error);
      reply.status(500).send(error);
    }
  });
  app2.get("/", { preHandler: checkApiKey }, async (request, reply) => {
    const allBroths = await prisma.broth.findMany();
    return reply.status(200).send(allBroths);
  });
}

// src/routes/proteins.ts
var import_zod3 = require("zod");
async function proteinsRoutes(app2) {
  app2.post("/", { preHandler: checkApiKey }, async (request, reply) => {
    const createProteinSchema = import_zod3.z.object({
      name: import_zod3.z.string(),
      description: import_zod3.z.string(),
      price: import_zod3.z.number()
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
  app2.get("/", { preHandler: checkApiKey }, async (request, reply) => {
    const allBroths = await prisma.proteins.findMany();
    return reply.status(200).send(allBroths);
  });
}

// src/routes/orders.ts
var import_zod4 = require("zod");
async function ordersRoute(app2) {
  app2.post("/generate-id", { preHandler: checkApiKey }, async (request, reply) => {
    const createOrdersSchema = import_zod4.z.object({
      brothId: import_zod4.z.number(),
      proteinsId: import_zod4.z.number()
    });
    const { brothId, proteinsId } = createOrdersSchema.parse(request.body);
    try {
      const createOrder = await prisma.orders.create({
        data: {
          brothId,
          proteinsId
        }
      });
      reply.status(201).send({
        "message": "Order placed successfully",
        "orderId": createOrder.id
      });
    } catch (error) {
      if (brothId == null || proteinsId == null) {
        reply.status(400).send({
          "error": "both brothId and proteinId are required"
        });
      }
      console.log(error);
      reply.status(500).send({
        "error": "could not place order"
      });
    }
  });
  app2.get("/", { preHandler: checkApiKey }, async (request, reply) => {
    const allOrders = await prisma.orders.findMany();
    return reply.status(200).send(allOrders);
  });
}

// src/routes/api-key.ts
var import_crypto = require("crypto");
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
async function apiKeyRoute(app2) {
  app2.post("/", async (request, reply) => {
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

// src/app.ts
var app = (0, import_fastify.default)();
app.register(import_cookie.default);
app.addHook("preHandler", async (request) => {
  console.log(`[${request.method}] ${request.url}`);
});
app.register(brothsRoutes, {
  prefix: "broths"
});
app.register(proteinsRoutes, {
  prefix: "proteins"
});
app.register(ordersRoute, {
  prefix: "orders"
});
app.register(apiKeyRoute, {
  prefix: "apiKey"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  app
});
