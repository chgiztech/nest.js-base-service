## Prerequisites

- NodeJS version `>=20.0.0` — recommended to use [NVM](https://github.com/nvm-sh/nvm)
- Linux-based terminals are preferred: `bash`, `shell`, or `git bash`
- In **VSCode**, install the following extensions:
  - `ESLint`
  - `Prettier`
  - `Nx Console`

## Commands

### Install/Add Dependencies

From the root directory:

```
yarn install
```

**Build the Application**

```
yarn nx run server:build
```

**Run in Development Mode**

```
yarn nx run server:dev
```

## SERVER Application Structure

Inside [global](libs/global/src) folder, there are global infrastructure modules
Such as TypeORM

Inside [config](apps/server/src/config) folder, there is config module
There are ENV variables for server configuration. Such as PORT, GLOBAL_PREFIX, JWT

Default application docs: [http:localhost:3000/api/docs](http:localhost:3000/api/docs)

## Libraries

New libraries can be created using Nx Console

## Task 1: Basic API development

Objective: Build a simple CRUD API for managing a list of users.
Inside [users](apps/server/src/app/services/users/users.controller.ts)

## Task 2: Middleware implementation

Objective: Implement a middleware to log the time taken for each API request.
Inside [utils](libs/utils/src/lib/logging.interceptor.ts)
Use inside [main.ts](apps/server/src/main.ts)

## Task 3: Error handling

Objective: Create a global error-handling mechanism.
Inside [utils](libs/utils/src/lib/global-exception.filter.ts)
Use inside [main.ts](apps/server/src/main.ts)

## Task 4: Database integration

Objective: Set up a PostgreSQL database connection and integrate it with the API.
Inside [global](libs/global/src/lib)
Use inside [users](apps/server/src/app/services/users/users.service.ts)

## Task 6 (optional): JWT authentication

Inside [auth](apps/server/src/app/services/users/users.controller.ts)

