# TODO App

## Introduction

Welcome to the TODO App documentation! This document provides an overview of the TODO app, including its architecture, components, and usage. The app allows users to manage and track their tasks.

## Project Overview

The TODO app is a web-based task management application built using Node.js, Express.js, and MongoDB. It provides the following key features:

- User registration and login.
- Task creation, update, and deletion.
- Task retrieval for authenticated users.
- Task status management (todo, in progress, done).
- Due date tracking for tasks.

## Installation

To run the TODO app locally, follow these installation steps:

### Prerequisites

- Node.js and npm installed.
- MongoDB installed and running.

### Installation Steps

1. Clone the project repository.
2. Install project dependencies.
3. Set up environment variables by creating a `.env` file.
4. Start the application.

## Configuration

The app uses environment variables for configuration. Make sure to set the necessary environment variables in the `.env` file for your specific environment.

## Usage

To use the TODO app, follow these steps:

1. Register a new user using the `/user/signup` endpoint.
2. Log in with your registered username and password using the `/user/login` endpoint.
3. Use the provided access token for authenticated requests to create, update, and manage tasks.
4. Access task-related endpoints under `/tasks` to manage your tasks.

## API Endpoints

### User Routes

- **POST /user/signup**: Register a new user with a unique username and hashed password.
- **POST /user/login**: Authenticate a user based on their username and password, providing an access token upon successful login.

### Task Routes

- **GET /tasks**: Retrieve all tasks associated with the authenticated user.
- **GET /tasks/:id**: Retrieve a specific task by its ID.
- **POST /tasks**: Create a new task associated with the authenticated user.
- **PUT /tasks/:id**: Update an existing task with the specified ID.
- **DELETE /tasks/:id**: Delete an existing task with the specified ID.

## Models

### User Model

- **username**: A unique string representing the user's username.
- **password**: A hashed string representing the user's password.
- **name**: A string representing the user's name.
- **TaskList**: An array of references to Task documents.

### Task Model

- **identity**: A reference to the User document, indicating the user to whom the task belongs.
- **title**: A string representing the title or name of the task.
- **description**: A string providing a description of the task.
- **status**: A string field with enumerated values (`todo`, `in progress`, `done`) representing the current status of the task.
- **dueDate**: A date field representing the due date or deadline for the task.

## Controllers

### User Controller

- `signup`: Register a new user.
- `login`: Authenticate a user and provide an access token.

### Task Controller

- `getAllPostsByUser`: Retrieve all tasks for the authenticated user.
- `getTaskbyId`: Retrieve a specific task by ID.
- `createTask`: Create a new task for the authenticated user.
- `updateTask`: Update an existing task.
- `deleteTask`: Delete an existing task.

## Routes

### UserRoute

- **POST /user/signup**: User registration route.
- **POST /user/login**: User login route.

### TaskRoute

- **GET /tasks**: Retrieve all tasks for the authenticated user.
- **GET /tasks/:id**: Retrieve a specific task by ID.
- **POST /tasks**: Create a new task for the authenticated user.
- **PUT /tasks/:id**: Update an existing task by ID.
- **DELETE /tasks/:id**: Delete an existing task by ID.

## Middleware

### Authentication Middleware

- **authenticateToken**: Verify JWT tokens in request headers to authenticate users for protected routes.

## Contributing

We welcome contributions to the TODO app! If you'd like to contribute, please follow our guidelines for submitting pull requests and reporting issues.

## License

The TODO app is open-source and available under the [MIT License](https://opensource.org/licenses/MIT).
