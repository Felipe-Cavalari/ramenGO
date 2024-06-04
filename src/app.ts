import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { brothsRoutes } from './routes/broths'
import {proteinsRoutes} from './routes/proteins'
import {apiKeyRoute} from './routes/api-key'
import { checkApiKey } from './middlewares/check-api-key'



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
    prefix: 'users'
})

app.register(apiKeyRoute, {
    prefix: 'apiKey'
})

// app.addHook('preHandler', checkApiKey)
