import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/middlewares/check-api-key";
import { FastifyInstance } from "fastify";
import { z } from "zod";


// criando rotas para os caldos
export async function proteinsRoutes(app: FastifyInstance){
    // rota para criar um caldo novo
    app.post('/',  {preHandler: checkApiKey}, async (request, reply) => {
       const createProteinSchema = z.object({
         name: z.string(),
         description: z.string(),
         price: z.number(),
         imageActive: z.string(),
         imageInactive: z.string()
       })

       
       const {name, description, price, imageActive, imageInactive} = createProteinSchema.parse(request.body)

       try {
            await prisma.proteins.create({
                data: {
                    name,
                    description,
                    price,
                    imageActive,
                    imageInactive
                }
            })

           reply.status(201).send({'message':'successfully created protein'})
       } catch (error) {
            console.log(error)
            reply.status(500).send(error)
       }
    })



    //rota para listar todos os caldos
    app.get('/', {preHandler: checkApiKey}, async (request, reply) => {
        const allBroths = await prisma.proteins.findMany()

        return reply.status(200).send(allBroths)
    })
} 