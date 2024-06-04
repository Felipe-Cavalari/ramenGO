import { FastifyInstance } from "fastify";
import { randomBytes } from "crypto";
import path from "path";
import fs from 'fs'



export async function apiKeyRoute(app: FastifyInstance){
    // rota unica para criar o usuárioa
    app.post('/', async(request, reply) => {
        // função para gerar apiKey
        function generateApiKey(){
            return randomBytes(32).toString('hex')
        }

        // função de salvar a apiKey em um arquivo json
        function saveApiKey(apiKey: string){
            const apiKeys = {
                apiKeys: [{ key: apiKey }]
            }
            const filePath = path.resolve(__dirname, '../../api-keys.json');
            fs.writeFileSync(filePath, JSON.stringify(apiKeys, null, 2));
            console.log(`API key gerada e salva em ${filePath}`)
        }
    
        try {


            const apiKey = generateApiKey()
            saveApiKey(apiKey)

            reply.status(201).send({
                "message": "api-key gerada com sucesso",
                "key": apiKey
            })
            
        } catch (error) {
            console.log(error)
            reply.status(500).send('Erro interno na criação do usuário')
        }
    })
}