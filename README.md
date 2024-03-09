# Node.js Express.js MongoDB Server Task Application

## Description

This is a backend server application built with Node.js, Express.js, and MongoDB that provides APIs for managing tasks. It allows users to perform CRUD (Create, Read, Update, Delete) operations on tasks, including creating new tasks, retrieving tasks, updating task details, and deleting tasks.

## Features

- **Task Management:** Create, read, update, and delete tasks.
- **RESTful APIs:** Well-defined and structured RESTful APIs for interacting with tasks.
- **MongoDB Integration:** Integration with MongoDB database for storing and retrieving task data.
- **Authentication:** Secure user authentication with JSON Web Tokens (JWT).
- **Authorization:** Role-based access control to manage access to tasks.
- **Google Authentication:** Allow users to sign in using their Google accounts.
- **Email Password with OTP Verification:** Implement email-based password reset functionality with one-time password (OTP) verification.

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
- **body-parser:** Middleware for parsing incoming request bodies in Express.js applications.
- **morgon:** HTTP request logger middleware for node.js
- **Cloudinary:**Cloud-based media management platform for uploading, storing, and managing files and media.

## Setup Instructions

1. Clone the repository:https://github.com/JSdev-rahul/taskHub-backend.git

### Installation

## Node Version

This project was developed using **Node.js version 18.7.0**.

Use the package manager [npm] to install all dependencies.

```bash
npm install
```

### To start the server, run the following command:

```bash
npm start
```

## API Routes

- **GET /api/v1/todos/:id:**

  - Description: Get all todos for a specific user.
  - Authorization: Requires JWT token.

- **POST /api/v1/todos:**

  - Description: Create a new todo.
  - Authorization: Requires JWT token.

- **DELETE /api/v1/todos/:id:**

  - Description: Delete a todo by ID.
  - Authorization: Requires JWT token.

- **PATCH /api/v1/todos/:id:**

  - Description: Update a todo by ID.
  - Authorization: Requires JWT token.

- **GET /api/v1/users:**

  - Description: Get all users.
  - Authorization: Requires JWT token.

- **POST /api/v1/users:**

  - Description: Create a new user.
  - Authorization: Requires JWT token and file upload.

- **DELETE /api/v1/users/:id:**

  - Description: Delete a user account by ID.
  - Authorization: Requires JWT token.

- **PATCH /api/v1/users/:id:**

  - Description: Update user profile by ID.
  - Authorization: Requires JWT token and file upload.

- **PATCH /api/v1/update-avatar**

  - Description: Update user avatar.
  - Authorization: Requires JWT token and file upload.

### Authentication

- **POST /api/v1/login:**

  - **Description:** Login user and generate JWT token.

- **POST /api/v1/login/google-auth:**

  - **Description:** Login with Google authentication.

- **PATCH /api/v1/password/update-password:**

  - **Description:** Change user password.

- **POST /api/v1/password/forgot-password:**

  - **Description:** Initiate forgot password flow.

- **POST /api/v1/otp/send-otp:**

  - **Description:** Send OTP for verification.

- **POST /api/v1/login/verify-otp:**

  - **Description:** Verify OTP during login.

- **POST /api/v1/login/regnrate-otp:**

  - **Description:** Regenerate OTP during login.

- **POST /api/v1/token/generate-access-token:**
  - **Description:** Generate new access token.
