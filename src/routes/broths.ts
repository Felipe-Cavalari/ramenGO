import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/middlewares/check-api-key";
import { FastifyInstance } from "fastify";
import { z } from "zod";


// criando rotas para os caldos
export async function brothsRoutes(app: FastifyInstance){
    // rota para criar um caldo novo
    app.post('/', {preHandler: checkApiKey} ,async (request, reply) => {
       const createBrothsSchema = z.object({
         name: z.string(),
         description: z.string(),
         price: z.number(),
         imageInactive: z.string(),
         imageActive: z.string()
       })

       
       const {name, description, price, imageActive, imageInactive} = createBrothsSchema.parse(request.body)

       try {
            const newBroths = await prisma.broth.create({
                data: {
                    name,
                    description,
                    price,
                    imageActive,
                    imageInactive
                }
            })

            
            reply.status(201).send({'message':'successfully created broths'})
       } catch (error) {
            console.log(error)
            reply.status(500).send(error)
       }
    })



    //rota para listar todos os caldos
    app.get('/', {preHandler: checkApiKey},async (request, reply) => {
        const allBroths = await prisma.broth.findMany()

        return reply.status(200).send(allBroths)
    })
} 