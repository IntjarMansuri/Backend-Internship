# User Authentication APIs

This project implements a set of RESTful APIs for user authentication using Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT).

## Features

1. **User Signup**
   - Endpoint: `POST /api/signup`
   - Allows users to register with a username, email, and password.
   - Validates input fields and hashes the password before securely storing user data in MongoDB.

2. **User Login**
   - Endpoint: `POST /api/login`
   - Allows registered users to log in with their email and password.
   - Validates user credentials, generates a JWT for authentication, and sends it back to the client.

3. **User Profile**
   - Endpoint: `GET /api/profile`
   - Retrieves and displays the user's profile information based on the provided JWT.
