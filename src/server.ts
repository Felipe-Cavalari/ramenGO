import { app } from './app'
import "dotenv"

app
  .listen({
    host: '0.0.0.0',
    port: process.env.PORT,
  })
  .then(() => {
    console.log(`HTTP Server Running on port ${process.env.PORT}`)
  } )