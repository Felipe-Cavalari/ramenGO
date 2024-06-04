// Carregar e válidar as variáveis de ambiente
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
  DATABASE_CLIENT: z.enum(['sqlite', 'postgresql']).default('postgresql'), 
  PORT: z.coerce.number().default(10000),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Variaveis de amviente invalidas!', _env.error.format())

  throw new Error('Variáveis de ambiente invalidas!')
}

export const env = _env.data