# Guia teste prático RED|Ventures

Desenvolvi a API ramenGO utilizando as seguintes técnologias:
- NodeJS
- Fastify
- PrismaORM
- PostgresSQL

Todas as rotas na aplicação precisam de uma api-key que foi enviada no forms do desafio


## Como testar a aplicação

### Para os caldos(broths) pode utilizar o seguinte endpoint:

- Para listar todas os caldos
````curl 
curl -X GET 'url/broths'
````
<br>

- Para criar um novo caldo
````curl 
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{ "imageInactive": "imagerl", "imageActive": "imageurl", "name": "Salt", "description": "Simple like the seawater, nothing more", "price": 10 }' \
  'url/broths'

````

### Para as proteinas da mesma forma
````curl 
curl -X GET 'url/proteins'
````
<br>

- Para criar uma nova proteina
````curl 
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{ "imageInactive": "imagerl", "imageActive": "imageurl", "name": "Salt", "description": "Simple like the seawater, nothing more", "price": 10 }' \
  'url/proteins'

````

### E por fim as rotas das orders

- Listar todas as orders
````curl 
curl -X GET 'url/orders'
````
<br>

- Para criar uma nova proteina
````curl 
curl -X POST \
  -H 'Content-Type: application/json' \
  -d '{ "brothId": 1, "proteinsId": 1 }' \
  'url/orders'
````

### OBS: Lembrando que todas as rotas precisam conter a API-KEY no header