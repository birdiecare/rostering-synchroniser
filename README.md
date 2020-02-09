## Description

Module to synchronise your rotas with Birdie.

## Installation

```bash
$ npm install
```

## Setup

Copy the `.env.default` file to a `.env` file and fill in the credentials provided by us (`API_HOST`, `BIRDIE_CLIENT_ID` and `BIRDIE_CLIENT_SECRET`)


## Implement the rota fetching

You will need to implement thee methods of [this class](./src/integration.implementation.ts) in order to fetch the rota that will be synchronised with Birdie.

## Running the synchronisation

```bash
$ npm run synchronise
```

## Stay in touch

- Author - [Jérémy Gotteland](mailto:jeremy.gotteland@birdie.care)
- Website - [https://birdie.care](https://birdie.care)
