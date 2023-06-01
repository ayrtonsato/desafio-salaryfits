## Sobre o projeto

O projeto foi criado para um desafio da SalaryFits cujo objetivo era criar uma API que realize chamadas e armazene as informações recebidas de uma outra API utilizando a linguagem e ferramentas estipuladas pela empresa.

Nesse projeto, a API escolhida para receber as chamadas foi a API da OpenWeathers e as ferramentas e linguagem utilizadas foram:

- TypeScript
- Express
- Prisma (ORM)
- Jest (Framework de testes)
- MySQL (Banco de dados)

## Como rodar este projeto

### Utilizando docker

Para rodar este projeto utilizando docker, é necessário criar dois arquivos .env (`dev.env` e `mysql.env`) dentro do diretório `env`.

O arquivo `dev.env` deve conter as seguintes variáveis de ambiente:

- `WEB_PORT` -> Indica a porta a ser utilizada pela aplicação web
- `API_KEY` -> Chave gerada pela open weathers
- `DATABASE_URL` -> String de conexão com o banco de dados, ex: `mysql://root:pass@mysql:3306/weather`

O arquivo `mysql.env` deve conter as seguintes variáveis de ambiente:

- `MYSQL_ROOT_PASSWORD` -> senha a ser conectado com o banco
- `MYSQL_DATABASE` -> nome do banco de dados que deve ser igual ao mencionado na string de conexão

Executar o comando `npm install`.

Executar o comando `docker compose -f docker-compose-dev.yml --env-file env/dev.env up`.

Caso dê algum erro no prisma, talvez seja necessário instalar um pacote com o comando `sudo apt install build-essential`.

### Sem Docker

Para rodar este projeto sem docker, é necessário criar o arquivo `.env` no diretório raiz deste projeto.

O arquivo `.env` deve conter as seguintes variáveis de ambiente:

- `WEB_PORT` -> Indica a porta a ser utilizada pela aplicação web
- `API_KEY` -> Chave gerada pela open weathers
- `DATABASE_URL` -> String de conexão com o banco de dados, ex: `mysql://root:pass@localhost:3306/weather`

Executar o comando `npm install`.

Executar o comando `npx prisma migrate deploy` ou `npm run deploy:db`.

Executar o comando `npx prisma db seed` ou `npm run deploy:seed`.

Executar o comando `npm run build && dist/server.js` para rodar a aplicação.

Você pode executar o comando `npm run dev` para rodar a aplicação também.

# Endpoints da API

## Weather Collection [/weather]

### Cria um novo clima [POST]

Faz uma chamada para a OpenWeathers para buscar a temperatura atual de uma região informada no corpo da requisição.

Esta informação é armazenada para futuras consultas.

### Example URI

`POST /weather`

- Request (application/json)

  - Body

          {
            "city": "São Paulo",
            "state": "SP",
            "country": "Brazil"
          }

- Response 201 (application/json)

  - Body

        {
            "temp": 20.62,
            "feelsLike": 21.11,
            "tempMin": 18.96,
            "tempMax": 22.17,
            "pressure": 1017,
            "humidity": 91,
            "description": "nublado",
            "id": "ae3950ba-3267-4437-95de-01de8b03db4a"
        }

### Busca um clima [GET]

Faz uma chamada a API para buscar uma temperatura pelo id.

### Example URI

`GET /weather/:uuid`

- Response 200 (application/json)

  - Body

        {
            "temp": 20.62,
            "feelsLike": 21.11,
            "tempMin": 18.96,
            "tempMax": 22.17,
            "pressure": 1017,
            "humidity": 91,
            "description": "nublado",
            "id": "ae3950ba-3267-4437-95de-01de8b03db4a"
        }

## Forecast Collection [/weather]

### Cria um novo forecast [POST]

Faz uma chamada para a OpenWeathers para buscar uma previsão de até 72 horas.

Esta informação é armazenada para futuras consultas.

### Example URI

`POST /forecast`

- Request (application/json)

  - Body

          {
            "city": "São Paulo",
            "state": "SP",
            "country": "Brazil"
          }

- Response 201 (application/json)

  - Body

        {
            "id": "d66f1b5d-3055-4c4a-ad73-3252e551a725",
            "coordinates": {
                "id": 1,
                "isoCodeCountry": {
                "code": 76,
                "country": "Brazil"
            },
            "lat": -22.9110137,
            "lon": -22.9110137,
            "state": "RJ",
            "city": "Rio de Janeiro",
            "country": "BR"
            },
            "weathersForecast": [
                {
                    "temp": 19.02,
                    "feelsLike": 19.38,
                    "tempMin": 19.02,
                    "tempMax": 19.02,
                    "pressure": 1019,
                    "humidity": 92,
                    "description": "chuva leve",
                    "id": "10aeabf6-90ce-4755-8afd-e20f11b013b7",
                    "datetime": "1970-01-20T12:14:45.600Z"
                },
                {
                    "temp": 18.97,
                    "feelsLike": 19.32,
                    "tempMin": 18.97,
                    "tempMax": 18.97,
                    "pressure": 1020,
                    "humidity": 92,
                    "description": "algumas nuvens",
                    "id": "12fb58ac-a1c8-49e5-b81b-cdc8ac7a7796",
                    "datetime": "1970-01-20T12:16:12.000Z"
                },
                ...
                {
                    "temp": 23.79,
                    "feelsLike": 24,
                    "tempMin": 23.79,
                    "tempMax": 23.79,
                    "pressure": 1019,
                    "humidity": 68,
                    "description": "céu limpo",
                    "id": "fba8ca67-a7d5-4074-ba80-306e40e14159",
                    "datetime": "1970-01-20T12:16:55.200Z"
                }
            ]
        }

### Busca um forecast [GET]

Faz uma chamada a API para buscar um forecast pelo id.

`GET /forecast/:uuid`

- Response 200 (application/json)

  - Body

        {
            "id": "d66f1b5d-3055-4c4a-ad73-3252e551a725",
            "coordinates": {
                "id": 1,
                "isoCodeCountry": {
                "code": 76,
                "country": "Brazil"
            },
            "lat": -22.9110137,
            "lon": -22.9110137,
            "state": "RJ",
            "city": "Rio de Janeiro",
            "country": "BR"
            },
            "weathersForecast": [
                {
                    "temp": 19.02,
                    "feelsLike": 19.38,
                    "tempMin": 19.02,
                    "tempMax": 19.02,
                    "pressure": 1019,
                    "humidity": 92,
                    "description": "chuva leve",
                    "id": "10aeabf6-90ce-4755-8afd-e20f11b013b7",
                    "datetime": "1970-01-20T12:14:45.600Z"
                },
                {
                    "temp": 18.97,
                    "feelsLike": 19.32,
                    "tempMin": 18.97,
                    "tempMax": 18.97,
                    "pressure": 1020,
                    "humidity": 92,
                    "description": "algumas nuvens",
                    "id": "12fb58ac-a1c8-49e5-b81b-cdc8ac7a7796",
                    "datetime": "1970-01-20T12:16:12.000Z"
                },
                ...
                {
                    "temp": 23.79,
                    "feelsLike": 24,
                    "tempMin": 23.79,
                    "tempMax": 23.79,
                    "pressure": 1019,
                    "humidity": 68,
                    "description": "céu limpo",
                    "id": "fba8ca67-a7d5-4074-ba80-306e40e14159",
                    "datetime": "1970-01-20T12:16:55.200Z"
                }
            ]
        }
