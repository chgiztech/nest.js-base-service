## 📦 Prerequisites

- NodeJS version `>=20.0.0` — recommended to use [NVM](https://github.com/nvm-sh/nvm)
- Linux-based terminals are preferred: `bash`, `shell`, or `git bash`
- In **VSCode**, install the following extensions:
  - `ESLint`
  - `Prettier`
  - `Nx Console`

## 🚀 Getting Started

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

**Run migrations (if required)**

```bash
yarn nx run server:migration:run
```

**Create migration**

```bash
yarn nx run server:migration:create migrations/AddTables
```

**Rollback migration**

```bash
yarn nx run server:migration:rollback
```

## 🔐 Environment Variables

Specify your environment variables in the following file: [env](apps/server/.env)

## 📁 Project Structure Overview

```
apps/
  └── server/                 # Main NestJS application
      ├── src/
      │   ├── app/
      │   │   └── services/
      │   │       └── users/        # User service, controller, DTOs
      │   └── config/               # Configuration modules (PORT, JWT, etc.)
      └── main.ts                   # Application entry point

libs/
  ├── global/                # Global infrastructure modules (e.g., TypeORM)
  └── utils/                 # Shared utilities (e.g., interceptors, filters)
```

## Libraries

New libraries can be created using Nx Console

### ✅ Task 1: Basic API Development — CRUD for Users

- **Location**: [`users.controller.ts`](apps/server/src/app/services/users/users.controller.ts)
- **Features**:

- Create, Read, Update, Delete users
- Input validation with DTOs
- Error handling for invalid operations

### ✅ Task 2: Middleware implementation

- **Location**: [`logging.interceptor.ts`](libs/utils/src/lib/logging.interceptor.ts)
- Logs time taken, endpoint, and method used
- **Integrated in**: [`main.ts`](apps/server/src/main.ts)

### ✅ Task 3: Global Error Handling

- **Location**: [`global-exception.filter.ts`](libs/utils/src/lib/global-exception.filter.ts)
- Catches and formats exceptions globally (e.g., `NotFoundException`, `BadRequestException`)
- **Integrated in**: [`main.ts`](apps/server/src/main.ts)

### ✅ Task 4: PostgreSQL Database Integration

- **ORM**: TypeORM
- **Config**: [`libs/global/src/lib`](libs/global/src/lib)
- **Usage Example**: [`users.service.ts`](apps/server/src/app/services/users/users.service.ts)

### 🛂 Task 6 (Optional): JWT Authentication

- Token validation via guards
- **Controller**: [`users.controller.ts`](apps/server/src/app/services/users/users.controller.ts)

## 📃 API Documentation

- Swagger available at: [http://localhost:3000/api/docs](http://localhost:3000/api/docs)
