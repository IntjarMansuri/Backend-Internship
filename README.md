# Task-1: User Authentication APIs

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

## Development Environment Setup

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
   
## API Usage Guide
### User Signup
Registers a new user with a username, email, and password.

- Endpoint: POST /api/signup
   - Request Body:
     ```json
     {
       "username": "Arshan",
       "email": "arshan@gmail.com",
       "password": "12345"
     }
- Success Response:
  - Status: 201 Created
  - Response Body:
    ```json
    {
       "statusCode": 200,
       "data": {
           "_id": "667a850afbe63246d8aea6e1",
           "username": "Arshan",
           "email": "arshan@gmail.com",
           "__v": 0
       },
       "message": "User signup successfully!",
       "success": true
    }
  
- Error Response:
  - Status: 400 Bad Request
  - Response Body:
    ```json
    {
      "statusCode": 400,
      "message": "Password must be at least 5 characters long.",
      "success": false
    }
   
### User Login
Logs in a registered user with their email and password.

- Endpoint: POST /api/login
  - Request Body:
    ```json
    {
      "email": "arshan@gmail.com",
      "password": "12345"
    }
- Success Response:
  - Status: 200 OK
  - Response Body:
    ```json
    {
       "statusCode": 200,
       "data": {
           "user": {
               "_id": "667a850afbe63246d8aea6e1",
               "username": "Arshan",
               "email": "arshan@gmail.com",
               "__v": 0
           },
          "accessToken":       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdhODUwYWZiZTYzMjQ2ZDhhZWE2ZTEiLCJlbWFpbCI6ImFyc2hhbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFyc2hhbiIsImlhdCI6MTcxOTMwNTQ5MSwiZXhwIjoxNzE5MzkxODkxfQ.C2jvCB2QKkykNbS8Ruv7cvFgMzDwOPOIiCQM7DjrvDQ"
       },
       "message": "User logged in successfully",
       "success": true
    }
    
- Error Response:
  - Status: 401 Unauthorized
  - Response Body:
    ```json
      {
        "statusCode": 401,
        "message": "Invalid user credentials",
        "success": false
      }
### User Profile
Retrieves the profile information of the authenticated user.

- Endpoint: GET /api/profile
- Headers:
   ```makefile
   Authorization: Bearer < eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdhODUwYWZiZTYzMjQ2ZDhhZWE2ZTEiLCJlbWFpbCI6ImFyc2hhbkBnbWFpbC5jb20iLCJ1c2VybmFtZSI6IkFyc2hhbiIsImlhdCI6MTcxOTMwNTQ5MSwiZXhwIjoxNzE5MzkxODkxfQ.C2jvCB2QKkykNbS8Ruv7cvFgMzDwOPOIiCQM7DjrvDQ >

- Success Response:
  - Status: 200 OK
  - Response Body:
    ```json
    {
       "statusCode": 200,
       "data": {
           "_id": "667a850afbe63246d8aea6e1",
           "username": "Arshan",
           "email": "arshan@gmail.com",
           "__v": 0
       },
       "message": "User profile retrieved successfully",
       "success": true
    }
    
- Error Response:
  - Status: 401 Unauthorized
  - Response Body:
    ```json
    {
      "statusCode": 401,
      "message": "Invalid access token",
      "success": false
    }
# Task-2: Send Confirmation Email after Signup
Extend the signup functonality to send a confirmation email to the user after successfully registering. 

## Features
1. **Email Sending:**
    - Integrate an email sending service (e.g., Node mailer) to send confirmation emails.
    - Include a confirmation link or code in the email.
2. **Email Template:**
    - Design a simple and informative email template for the confirmation message.
3. **IntegraƟon:**
    - Extend the signup endpoint (/api/signup) to trigger the sending of a confirmation email upon successful user registration.
## Development Environment Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/IntjarMansuri/Backend-Internship.git
   cd Task - 2
2. **Install dependencies:**
   ```bash
   npm install express mongoose bcrypt cookie-parser nodemailer dotenv
3. **Set up environment variables:**
   - Create a .env file in the root directory.
   - Add the following environment variables:
     
   ```dotenv
   PORT=8000
   MONGODB_URI=mongodb://localhost:27017/mydatabase
   USER_EMAIL=your_@ethereal.email
   USER_PASS=your_ethereal_password
4. **Start the server:**
   ```bash
   npm run dev
5. The server should now be running on http://localhost:8000.

## API Usage Guide
### User Signup
Registers a new user with a username, email, and password.

- Endpoint: POST /api/signup
   - Request Body:
     ```json
     {
       "username": "Arshan",
       "email": "arshan@gmail.com",
       "password": "12345"
     }
- Success Response:
  - Status: 201 Created
  - Response Body:
    ```json
    {
       "statusCode": 200,
       "data": {
           "_id": "66853acb7bfd2af008870b83",
           "username": "Arshan",
           "email": "arshan@gmail.com",
           "__v": 0
       },
       "message": "User signup successfully, Confirmation email sent.",
       "success": true
    }
  
- Error Response:
  - Status: 400 Bad Request
  - Response Body:
    ```json
    {
      "statusCode": 400,
      "message": "Password must be at least 5 characters long.",
      "success": false
    }
**After successfully signup you will get a Email on your ethereal account**
![Screenshot 2024-07-03 174336](https://github.com/IntjarMansuri/Backend-Internship/assets/139264242/b36c49b3-eb6d-46f6-9fcd-e052cd7c3130)
