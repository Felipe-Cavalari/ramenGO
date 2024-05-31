import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { brothsRoutes } from './routes/broths'


export const app = fastify()

app.register(cookie)
// global hook

app.register(brothsRoutes, {
    prefix: 'broths'
})
