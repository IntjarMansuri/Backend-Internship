// Importing necessary modules and models
import nodemailer from "nodemailer";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { generateConfirmationEmail } from "../utils/emailTemplate.js";

// Signup user controller
const signupUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  // Check if any field is empty
  if ([username, email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if password length is less than 5 characters
  if (password.length < 5) {
    throw new ApiError(400, "Password must be at least 5 characters long.");
  }

  // Check if user already exists with given email
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // Generate confirmation code and link
  const confirmationCode = Math.random().toString(36).substring(7);
  const confirmationLink = `http://localhost:8000/api/confirm?code=${confirmationCode}&email=${email}`;

  // Create a new user
  const user = await User.create({
    username,
    email,
    password,
    confirmationCode,
    confirmationLink,
  });

  // Generate HTML content for confirmation email
  const confirmationEmail = generateConfirmationEmail(
    username,
    confirmationCode,
    confirmationLink
  );

  // Create Nodemailer transporter for sending emails
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER_EMAIL,
      pass: process.env.USER_PASS,
    },
  });

  try {
    // Send confirmation email
    await transporter.sendMail({
      from: process.env.USER_EMAIL,
      to: email,
      subject: "Confirmation Email",
      html: confirmationEmail,
    });
  } catch (error) {
    console.log("Error sending email", error);
    throw new ApiError(500, "Error sending confirmation email");
  }

  // Retrieve the newly created user without the password field
  const createdUser = await User.findById(user._id).select(
    "-password -confirmationCode -confirmationLink"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while user signup");
  }

  // Send response with created user data
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        createdUser,
        "User signup successfully, Confirmation email sent."
      )
    );
});

export { signupUser };
