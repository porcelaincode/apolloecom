# Simple ECom Server

## Requirements

For development, you will only need Node.js and a node global package along with dependancies mentioned in `package.json`

    $ node --version
    v14.18.1

    $ npm --version
    8.1.3

## Install

    $ git clone https://github.com/localityin/apolloecom
    $ cd apolloecom
    $ npm install

## Configure server

Setup env variables after creating `.env` file in the root directory. Following env variables are necessary for fully functioning server. More to be added accordingly

```sh
MONGODB_URI=
SECRET_KEY=
REFRESH_KEY=
PORT=
NODE_ENV=
```

## Endpoints

Queries:

-   `getUser` [all]
-   `getOrders` [all]
-   `getCatalog` [sellers]
-   `getProducts` [buyers]

Mutations:

-   `login` [all]
-   `register` [all]
-   `updateAddress` [all]
-   `addProduct` [all]
-   `createCatalog` [seller]
-   `createOrder` [buyer]
