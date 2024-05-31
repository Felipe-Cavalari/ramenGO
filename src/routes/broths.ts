import { prisma } from "@/lib/prisma";
import { FastifyInstance } from "fastify";
import { z } from "zod";


// criando rotas para os caldos
export async function brothsRoutes(app: FastifyInstance){
    // rota para criar um caldo novo
    app.post('/', async (request, reply) => {
       const createBrothsSchema = z.object({
         name: z.string(),
         description: z.string(),
         price: z.number()
       })

       
       const {name, description, price} = createBrothsSchema.parse(request.body)

       try {
            const newBroths = await prisma.broth.create({
                data: {
                    name,
                    description,
                    price
                }
            })

            console.log('caldo criado com sucesso')
            console.log(newBroths)
            reply.status(201)
       } catch (error) {
            console.log(error)
            reply.status(500).send(error)
       }
    })



    //rota para listar todos os caldos
    app.get('/', async (request, reply) => {
        const allBroths = await prisma.broth.findMany()

        return reply.status(200).send(allBroths)
    })
} 