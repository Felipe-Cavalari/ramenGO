import { FastifyReply, FastifyRequest } from 'fastify'
import 'dotenv/config'



// Definir a função de verificação da chave API
export async function checkApiKey(request: FastifyRequest, reply: FastifyReply) {
    const knowKey = process.env.APIKEY
    const apiKeyRequest = request.headers['x-api-key']

    if (!apiKeyRequest || apiKeyRequest !== knowKey) {
        reply.status(403).send({"error": "x-api-key header missing"});
    }

};