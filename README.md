## Overview

This project is a RESTful API built with Nest.js that allows for user registration and purchase creation. It stores users in a PostgreSQL database and handles purchases associated with offers. Upon a purchase, the service sends events to an analytics service and schedules an astrological report to be sent to the user after 24 hours.

## Features

- **User Registration**: Create and store user information, including email and marketing data.
- **Purchase Creation**: Users can make purchases of offers, which are stored in the database.
- **Analytics Event**: Upon purchase, an event is sent to a (mock) analytics service.
- **Astrological Report**: Schedules a (mock) astrological report to be sent to the user after 24 hours.
- **Error Handling**: Global exception filters and custom HTTP exceptions for robust error management.
- **Validation**: Data validation using `class-validator` and `class-transformer`.
- **Configuration Management**: Uses `@nestjs/config` for environment variable management.
- **Logging**: Implements logging for important actions and errors.
- **Swagger Documentation**: API documentation available via Swagger UI.

## Project Structure
```lua
src/
├── app.module.ts
├── main.ts
├── common/
│   ├── exceptions/
│   │   ├── http-exception.filter.ts
│   │   └── custom-http.exception.ts
│   ├── interceptors/
│   │   └── timeout.interceptor.ts
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── user.entity.ts
│   └── dto/
│       └── create-user.dto.ts
├── offers/
│   ├── offers.module.ts
│   ├── offers.service.ts
│   ├── offer.entity.ts
├── purchases/
│   ├── purchases.module.ts
│   ├── purchases.service.ts
│   ├── purchases.controller.ts
│   ├── purchase.entity.ts
│   └── dto/
│       └── create-purchase.dto.ts
├── config/
│   └── typeorm-config.service.ts
```


## Getting Started

### Prerequisites

- **Node.js** (v14.x or later)
- **npm** (v6.x or later)
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/sh-0ut/ObrioTestTask
   cd ObrioTestTask
   ```
 2. **Install dependencies:**
    ```bash
    npm install
    ```
3. **Set up environment variables:**

- **Create a `.env` file in the root directory with the following content:**

    ```.env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=your_db_username
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    ```
    Replace your_db_username, your_db_password, and your_db_name with your actual PostgreSQL credentials.

4. **Set up the database:**

- **Ensure PostgreSQL is running.**
- **Create a database with the name specified in DB_NAME.**
5. **Populate the offers table:**

Since there's no endpoint to create offers, manually insert some offers:

```sql
INSERT INTO offers (name, price) VALUES ('Basic Offer', 9.99);
INSERT INTO offers (name, price) VALUES ('Premium Offer', 19.99);
```
#### Running the Application
```bash
npm run start
```
The application will start on `http://localhost:3000`.

#### API Documentation
Swagger UI is available for API documentation and testing:

- **URL**: `http://localhost:3000/api`
#### Usage
##### Endpoints
**1. User Registration**
- **Endpoint**: POST /users
- **Description**: Creates a new user.
- **Request Body**:

```json
{
  "email": "user@example.com",
  "marketingData": "Some marketing preferences"
}
```
- **Response**:
```json
{
  "id": 1,
  "email": "user@example.com",
  "marketingData": "Some marketing preferences"
}
```
**2. Purchase Creation**
- **Endpoint**: POST /purchases
- **Description**: Creates a new purchase for a user.
- **Request Body**:
```json
{
  "userId": 1,
  "offerId": 1
}
```
- **Response**:

```json
{
  "id": 1,
  "userId": 1,
  "offerId": 1
}
```
#### Post-Purchase Actions
- **Analytics Event**: Upon purchase creation, an event is sent to a mock analytics service.
- **Astrological Report**: An astrological report is scheduled to be sent to the user after 24 hours via a mock HTTP request.
#### Error Handling
- **Global Exception Filter**: Captures all exceptions and returns structured error responses.
- **Custom HTTP Exceptions**: Provides meaningful error messages and HTTP status codes.
- **Validation Errors**: Returns detailed information about validation failures in request bodies.
#### Configuration Management
- **Environment Variables**: Managed using @nestjs/config and stored in a .env file.
- **TypeORM Configuration**: Dynamic database configuration using TypeOrmConfigService.
#### Data Validation
- **DTOs**: Data Transfer Objects are used with validation decorators to ensure data integrity.
- **Validation Pipe**: Globally applied to automatically validate incoming requests.
#### Logging
- **Logger**: Nest.js Logger is used for logging important events and errors.
- **Error Logs**: Detailed error information is logged for debugging purposes.
## Additional Features
#### Swagger Integration
- **API Documentation**: Automatically generated documentation available via Swagger UI.
- **Annotations**: Controllers and DTOs are annotated with Swagger decorators for detailed docs.
#### Timeout Handling
- **Timeout Interceptor**: Sets a global timeout for all requests to prevent hanging requests.
#### Interceptors and Middleware
- **TimeoutInterceptor**: Applied globally to handle request timeouts.
- **Exception Filters**: Custom filters to handle and format exceptions.
## Best Practices Implemented
- **Layered Architecture**: Code is organized into controllers, services, entities, DTOs, and common utilities.
- **Separation of Concerns**: Each layer has a specific responsibility, improving maintainability.
- **Validation and Error Handling**: Robust mechanisms to ensure data integrity and provide meaningful error messages.
- **Configuration Management**: Centralized configuration with environment variables.
- **Documentation**: Comprehensive API documentation with Swagger.
- **Logging**: Effective logging strategies for monitoring and debugging.
## Testing
*Note*: Automated tests are not included as per the project requirements.

## Deployment
*No CI/CD configuration is provided as per the requirements.*

## Technologies Used
- **Nest.js**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeORM**: An ORM that can run in Node.js and is used with TypeScript and JavaScript (ES5, ES6, ES7, ES8).
- **PostgreSQL**: An advanced open-source relational database.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Class Validator & Class Transformer**: For data validation and transformation.
- **Swagger (OpenAPI)**: For API documentation.
- **Axios**: For making HTTP requests to external services.
- **Cron**: For scheduling tasks.


License
This project is licensed under the MIT License.