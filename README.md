<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<p align="center">A backend micro-service for serving games data using the NestJS framework.</p>

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Testing](#testing)
- [Docker Setup](#docker-setup)
- [Endpoints](#endpoints)
- [Support](#support)
- [Stay in Touch](#stay-in-touch)
- [License](#license)

## Description

This project implements a backend micro-service using the NestJS framework to serve games data. The application exposes a REST API with CRUD operations for games, along with additional features such as fetching publisher data, applying discounts, and more. The application is containerized using Docker for easy deployment.

## Installation

To install the project dependencies, run the following command:

```bash
$ yarn install
```

## Running the App

Choose the appropriate command based on your desired mode:

- **Development Mode:**

  ```bash
  $ yarn run start:dev
  ```

- **Production Mode:**
  ```bash
  $ yarn run start:prod
  ```

## Testing

Run tests to ensure the integrity of the codebase:

- **Unit Tests:**

  ```bash
  $ yarn run test
  ```

- **End-to-End (E2E) Tests:**

  ```bash
  $ yarn run test:e2e
  ```

- **Test Coverage:**
  ```bash
  $ yarn run test:cov
  ```

## Docker Setup

The application can also be run using Docker. Use the following commands to set up the development and testing databases, along with Redis:

- **Development Database and Redis:**

  ```bash
  $ yarn db:dev:up
  $ yarn redis:up
  ```

- **Testing Database and Redis:**
  ```bash
  $ yarn db:test:up
  $ yarn redis:up
  ```

  - **NestJs App + Database and Redis:**
  ```bash
  $ docker compose up
  ```


## Endpoints

- **POST /games:** Create a new game.
- **GET /games/all:** Get a list of all games.
- **GET /games/all/publisher/:id:** Get games by a specific publisher.
- **GET /games/:id:** Get a specific game by ID.
- **GET /games/:id/publisher:** Get publisher data for a specific game.
- **POST /games/start-promotion:** Apply a discount to games.
- **PATCH /games/:id:** Update a game's information.
- **DELETE /games/:id:** Delete a game.

## Stay in Touch

- Author: Paulo Bender
- Website: [https://www.linkedin.com/in/paulobender]

## License

This project is [MIT licensed](LICENSE).

## Project Evaluation

As a passionate Software Engineer with extensive experience in Node.js, I found this coding exercise to be an exciting opportunity to showcase my skills and learn something new. While I had worked extensively with Node.js using the Express, this project introduced me to NestJS, and I must say it was a delightful experience. It highlighted my ability to adapt, learn, and deliver in a new technology ecosystem.

In order to automate the removal of games with a release date older than 18 months and apply a 20% discount to games released between 12 and 18 months, I opted to leverage the BullModule from @nestjs/bull. This module enables seamless integration with Redis and facilitates the asynchronous execution of jobs without being dependent on immediate responses. Given that these processes could potentially involve substantial demands, this approach proves more suitable. The resulting implementation is straightforward, focusing on the core functionality and omitting advanced error-handling mechanisms. This choice reflects a decision to prioritize simplicity while showcasing the strategic reasoning behind it.

### Key Takeaways

1. **Adapting to NestJS:**
   Working with NestJS was an enriching experience. It allowed me to structure the application using a modular approach, adhere to SOLID principles, and implement a clean architecture. The framework's built-in features, such as decorators and dependency injection, helped me create a well-organized and maintainable codebase.

2. **Learning and Innovation:**
   This project showcased my willingness to explore new technologies. The process of learning and applying NestJS demonstrated my ability to quickly understand and adapt to new tools.

### Areas for Improvement

While I'm pleased with the outcome, there are several areas I would have liked to explore further or enhance if given more time:

1. **UUIDs for ID:** Consider using UUIDs instead of database IDs. UUIDs provide a more secure and globally unique identifier, enhancing data privacy and security.

2. **Pagination for All Games:** Implement pagination for fetching all games. This feature would improve the API's performance and user experience when dealing with a large number of game entries.

3. **Seeding Script:** Develop a seed script to populate the database with test data. This would simplify testing and facilitate quicker setup for development and testing environments.

4. **DTO Transformation Interceptor:** Introduce an interceptor to automatically transform return objects from models to DTOs. This enhancement would enable better control over the data exposed in responses and enhance data integrity.

5. **Security Considerations:** Explore and integrate security measures such as authentication, and authorization. This would ensure the application's resilience against potential vulnerabilities.

### Final Thoughts

I'm excited to discuss my approach, learnings, and future ideas for this project during our conversation. Thank you for considering my application, and I'm looking forward to the opportunity to contribute to your startup's exciting journey in game development.

Best Regards,
Paulo Bender
