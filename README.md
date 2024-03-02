# Node.js Express.js MongoDB Server Task Application

## Description

This is a backend server application built with Node.js, Express.js, and MongoDB that provides APIs for managing tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks, including creating new tasks, retrieving tasks, updating task details, and deleting tasks.

## Features

- **Task Management:** Create, read, update, and delete tasks.
- **RESTful APIs:** Well-defined and structured RESTful APIs for interacting with tasks.
- **MongoDB Integration:** Integration with MongoDB database for storing and retrieving task data.
- **Authentication:** Secure user authentication with JSON Web Tokens (JWT).
- **Authorization:** Role-based access control to manage access to tasks.

## Technologies Used

- **Node.js:** JavaScript runtime environment for running server-side code.
- **Express.js:** Web application framework for Node.js for building APIs.
- **MongoDB:** NoSQL database for storing task data.
- **Mongoose:** MongoDB object modeling tool for Node.js for interacting with MongoDB.
- **JWT (JSON Web Tokens):** Used for secure user authentication.
- **Multer:** Middleware for handling multipart/form-data, commonly used for file uploads in Node.js/Express.js applications.
- **bcrypt:** Library for hashing passwords securely.
- **nodemailer:** Library for sending emails from Node.js applications.
- **nodemon:** Utility that automatically restarts the server when changes are detected in the file system.
- **cors:** Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express.js applications.
- **body-parser:** Middleware for parsing incoming request bodies in Express.js applications. -**morgon:** HTTP request logger middleware for node.js

## Setup Instructions

### Installation

Use the package manager [npm] to install all dependencies.

```bash
npm install
```

### To start the server, run the following command:

```bash
npm start
```

## API Routes

- **GET /api/todos/:id:**

  - Description: Get all todos for a specific user.
  - Authorization: Requires JWT token.

- **POST /api/todos:**

  - Description: Create a new todo.
  - Authorization: Requires JWT token.

- **DELETE /api/todos/:id:**

  - Description: Delete a todo by ID.
  - Authorization: Requires JWT token.

- **PATCH /api/todos/:id:**

  - Description: Update a todo by ID.
  - Authorization: Requires JWT token.

- **GET /api/users:**

  - Description: Get all users.
  - Authorization: Requires JWT token.

- **POST /api/users:**

  - Description: Create a new user.
  - Authorization: Requires JWT token and file upload.

- **DELETE /api/users/:id:**

  - Description: Delete a user account by ID.
  - Authorization: Requires JWT token.

- **PATCH /api/users/:id:**

  - Description: Update user profile by ID.
  - Authorization: Requires JWT token and file upload.

- **POST /api/login:**
  - Description: Login user and generate JWT token.
