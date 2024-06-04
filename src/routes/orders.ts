import { prisma } from "@/lib/prisma";
import { checkApiKey } from "@/middlewares/check-api-key";
import { FastifyInstance } from "fastify";
import { z } from "zod";


// criando rotas para os caldos
export async function ordersRoute(app: FastifyInstance){
    // rota para criar um caldo novo
    app.post('/generate-id', {preHandler: checkApiKey} ,async (request, reply) => {
       const createOrdersSchema = z.object({
         brothId: z.number(),
         proteinsId: z.number(),
         
       })
   
       const {brothId, proteinsId} = createOrdersSchema.parse(request.body)

       try {
            const createOrder = await prisma.orders.create({
                data: {
                    brothId,
                    proteinsId
                }
            })

            reply.status(201).send({
                "message": "Order placed successfully",
                "orderId": createOrder.id
                
            })
       } catch (error) {
            if(brothId == null || proteinsId == null){
                reply.status(400).send({
                    "error": "both brothId and proteinId are required"
                  })
            }
            console.log(error)
            reply.status(500).send({
                "error": "could not place order"
              })
       }
    })



    //rota para listar todos os caldos
    app.get('/', {preHandler: checkApiKey},async (request, reply) => {
        const allOrders = await prisma.orders.findMany()

        return reply.status(200).send(allOrders)
    })
} 