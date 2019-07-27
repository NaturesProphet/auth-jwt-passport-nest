<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   Uma aplicação desenvolvida em <a href="https://github.com/Microsoft/TypeScript">Typescript</a> usando <a href="http://nestjs.com/">Nestjs Framework</a>
</p>

# Autenticação com JWT e Passport
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Sistema base pré-ajustado para começar projetos incríveis com autenticação profissional. Basta clonar o repositório e começar novos projetos com o código base já pronto!

## Configuração do ambiente

Antes de subir a API localmente em ambiente de desenvolvimento, é necessário:
    
    1: Subir o banco de testes Postgre
    2: Configurar as variáveis de ambiente através de um arquivo .env

1 - Para subir um banco pronto e volátil em Docker, basta executar o comando 
```
npm run postgre:test
```
Para subir esse mesmo banco, porém com persistência, digite:
```
npm run postgre:persistent
```

2 Para configurar as variáveis de ambiente, simplesmente copie o arquivo ".env.exemplo" que está na raiz deste projeto, com o nome ".env", e então, basta apontar os valores dentro deste arquivo.

## Testes automáticos
Este projeto é desenvolvido com os princípios do TDD. Para executar os testes, execute o comando 
```
npm run test
```

## Iniciando a API em ambiente de desenvolvimento
```
npm start
```

## Subindo a API para ambiente de produção
primeiramente, "Builde" os "executáveis" (javascript) da aplicação
```
npm run build
```
E então, execute o código "compilado"
```
npm run start:prod
```

## Debug
Certifique-se que o banco de dados esteja acessível para que a aplicação possa iniciar. Após iniciar o Debug (F5), aguarde a mensagem "API pronta e ouvindo na porta 3000" no terminal do debugger antes de iniciar a sua depuração.

## Novos usuários

O endpoint POST /usuario está liberado para criação de novos usuários com o perfil NOVO. Esses usuários não tem permissão inicial para acessar a API, então, após criar o primeiro usuário no seu banco de dados, vá na tabela 'usuario' e altere o valor do campo 'perfil', de 'Novo' para 'Administrador'. Utilize este usuário para fazer login e acessar o restante da API.

## Guards
Na pasta src/auth/guards estão definidos alguns guards para proteção dos endpoints. Estes guards estão sendo usados nos controllers em geral, basta verificar o código de alguma rota protegida para entender o funcionamento.