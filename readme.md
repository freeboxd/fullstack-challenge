
<p  align="center">

  

<img  src="./Grupo 116@2x.png"  width="300">

  

</p>

  

  

# fullstack-challenge - Guilherme Nunes

  

## Installation

  

1. clone e abra a pasta do projeto `git clone`  `cd fullstack-challenge`

2. instale as dependências `yarn install` ou `npm install`

3. pronto!

  

## Challenge

  

### Front-end

  

**Comandos:**

- Servidor de desenvolvimento: `yarn dev`

- Build para produção: `yarn build`

- Rodar testes automatizados: `yarn test`

  
  

**Tecnologias utilizadas:**

- VueJs

- NuxtJs

- Typescript

- Vuex

- Axios

- ElementUI

- Jest

  

### Back-end

  

**Setup:**

É preciso configurar o endereço do mongodb em `api/config/default.json` e `api/config/test.json`

  

**Comandos:**

- Servidor de desenvolvimento: `yarn dev` (localhost:3030)

- Rodar testes automatizados: `yarn test`

obs: não tive tempo para setar o ambiente de produção :(((

  

**Documentação:**
Você pode utilizar o [Workspace do Insomnia](api%20insomnia%20workspace.json) que preparei.
  

- `base_url/authentication`: autenticação (POST)
Body params:
```
strategy: string
(required) email: string
(required) password: string
```

Exemplo:
```
{
  "strategy": "local",
  "email": "test@test.com",
  "password": "teste"
}
```

- `base_url/users`
  - listagem (GET)
  - cadastro (POST)
Body params:
```
(required) email: string
(required) password: string
```
Exemplo:
```
{
  "email": "test@test.com",
  "password": "teste"
}
```

- `base_url/users/{id}`:
  - remoção (DELETE)
  - atualização (PUT)
Body params:
```
email: string
(required) password: string
```
Exemplo:
```
{
  "email": "test@test.com",
  "password": "teste"
}
```

- `base_url/participations`:
  - listagem (GET)
  - cadastro (POST)
Body params:
```
(required) firstName: string
(required) lastName: string
(required) participation: number
```
Exemplo:
```
{
  "firstName": "Guilherme",
  "lastName": "Test",
  "participation": 15
}
```

- `base_url/participations/{id}`
  - remoção (DELETE)
  - atualização (PUT)
Body params:
```
firstName: string
lastName: string
participation: number
```
Exemplo:
```
{
  "firstName": "Guilherme",
  "lastName": "Test",
  "participation": 15
}
```
  

**Tecnologias utilizadas:**

  

- NodeJs

- Feathersjs

- MongoDB
