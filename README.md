<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>
<p align="center">
   Uma aplicação desenvolvida em <a href="https://github.com/Microsoft/TypeScript">Typescript</a> usando <a href="http://nestjs.com/">Nestjs Framework</a>
</p>

# Autenticação com JWT e Passport
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

Sistema base pré-ajustado para começar projetos incríveis com autenticação profissional. Basta clonar o repositório e começar novos projetos com o código base já pronto!

## Painel Administrativo
Um painel administrativo pré configurado e pronto para iniciar novos projetos, dando acesso à dados sensíveis do sistema apenas para administradores com permissões válidas para cada operação específica

## Permissões e grupos
Contas de administrador possuem uma role, que é formada por uma agregação de várias permissões, que definem quais recursos a conta poderá acessar dentro do sistema

## Configuração do ambiente
Crie um arquivo .env baseado no .env.example disponível na raíz do projeto.

Suba um banco de dados Postgre. Você pode usar o script do package.json pronto para a tarefa usando o Docker:
```
npm run postgre:test
```


## Iniciando a API em ambiente de desenvolvimento
```
npm start
```

## Debug
Após iniciar o Debug (F5), aguarde a mensagem "API pronta e ouvindo na porta 3000" no terminal do debugger antes de iniciar a sua depuração.