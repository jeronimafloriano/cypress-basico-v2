# Testes automatizados com Cypress 

Projeto simples de testes de uma página web com um formulário de envio de sugestões/reclamações/dúvidas, para praticar uma visão geral do funcionamento do cypress.


## O que foi praticado

- Como configurar um projeto Cypress do zero
- Como visitar páginas locais e remotas
- Como lidar com os elementos mais comuns encontrados em aplicações web
- Como testar _upload_ de arquivos
- Como realizar as mais diversas verificações de resultados esperados
- Como criar comandos customizados
- Como lidar com links que abrem em outra aba do navegador
- Como rodar testes simulando as dimensões de um dispositivo móvel
- Como resolver os mesmos problemas de diferentes formas, conhecendo a [API do Cypress](https://docs.cypress.io/api/table-of-contents)
- Como executar os testes em um _pipeline_ de integração contínua sempre que mudanças ocorrerem no código da aplicação (ou dos testes)
- Como criar uma documentação mínima para o projeto de testes automatizados

## Pré-requisitos

É necessário ter Node.js e npm instalados para executar este projeto.

> Usei as versões `v16.17.0` e `8.15.0` de Node.js e npm, respectivamente. Sugiro que você use as versões iguais ou posteriores.

## Installation

Execute `npm install` (ou `npm i` para a versão mais curta) para instalar as dependências.


## Tests

Você pode executar os testes simulando a versão web/desktop ou mobile da aplicação.

### Desktop

Execute `npm test` (ou `npm t`  para a versão mais curta) para executar o teste no modo headless.

Ou execute `npm run cy:open` para abrir o Cypress no modo interativo.

### Mobile

Execute `npm run cy:mobile:handless` para executar o teste no modo headless.

Ou execute `npm run cy:open:mobile` para abrir o Cypress no modo interativo.



