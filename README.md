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

### Development Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IntjarMansuri/Backend-Internship.git
   cd Task - 1
2. **Install dependencies:**
   ```bash
   npm install express mongoose bcrypt cookie-parser jsonwebtoken
3. **Set up environment variables:**
   - Create a .env file in the root directory.
   - Add the following environment variables:
     
   ```dotenv
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   ACCESS_TOKEN_SECRET=your_access_token_secret
   ACCESS_TOKEN_EXPIRY=1d
4. **Start the server:**
   ```bash
   npm run dev
5. The server should now be running on http://localhost:8000.
