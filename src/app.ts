import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { brothsRoutes } from './routes/broths'
import {proteinsRoutes} from './routes/proteins'
import {ordersRoute} from './routes/orders'
import {apiKeyRoute} from './routes/api-key'



export const app = fastify()


app.register(cookie)
// global hook

app.addHook('preHandler', async (request) => {
    console.log(`[${request.method}] ${request.url}`)
  })

app.register(brothsRoutes,{
    prefix: 'broths',
})

app.register(proteinsRoutes, {
    prefix: 'proteins'
})

app.register(ordersRoute, {
    prefix: 'orders'
})

app.register(apiKeyRoute, {
    prefix: 'apiKey'
})

// adicionar api-key para todas as rotas
// app.addHook('preHandler', checkApiKey)
