## Sobre o projeto

Projeto criado para o desafio da SalaryFits.
Para mais informações sobre o desafio, acessar este [link](https://tasksanjoz.notion.site/tasksanjoz/Desafio-para-a-vaga-em-Node-js-SalaryFits-4a4bcc3a104c410e9560aebe070f06a3).
A API escolhida para este projeto foi a API da [OpenWeathers](https://openweathermap.org/) e as ferramentas e linguagem utilizadas foram:

- TypeScript
- Express
- Prisma (ORM)
- Jest (Framework de testes)
- MySQL (Banco de dados)

## Como rodar este projeto

### Utilizando docker

Para utilizar este projeto utilizando docker, é necessário criar dois arquivos .env (`dev.env` e `mysql.env`) dentro do diretório `env`.
O arquivo `dev.env` deve conter as seguintes variáveis de ambiente:

- WEB_PORT -> Indica a porta a ser utilizada pela aplicação web
- API_KEY -> Chave gerada pela open weathers
- DATABASE_URL -> String de conexão com o banco de dados, ex: `mysql://root:pass@mysql:3306/weather`

O arquivo `mysql.env` deve conter as seguintes variáveis de ambiente:

- MYSQL_ROOT_PASSWORD=pass -> senha a ser conectado com o banco
- MYSQL_DATABASE=weather -> nome do banco de dados que deve ser igual ao mencionado na string de conexão

Executar o comando `docker compose -f docker-compose-dev.yml --env-file env/dev.env up`
