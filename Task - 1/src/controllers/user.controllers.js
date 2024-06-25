// Importing necessary modules and models
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Function to generate access tokens
const generateAccessTokens = async (userId) => {
  try {
    // Find user by ID
    const user = await User.findById(userId);

    // Generate access token using user model's method
    const accessToken = user.generateAccessToken();

    // Save user without validating fields again
    await user.save({ validateBeforeSave: false });

    // Return the generated access token
    return accessToken;
  } catch (error) {
    // Throw custom API error if token generation fails
    throw new ApiError(
      500,
      "Something went wrong while generating access token"
    );
  }
};

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

  // Create a new user
  const user = await User.create({
    username,
    email,
    password,
  });

  // Retrieve the newly created user without the password field
  const createdUser = await User.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while user signup");
  }

  // Send response with created user data
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User signup successfully!"));
});

// Login user controller
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  // Check if password is correct
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  // Generate access token for the user
  const accessToken = await generateAccessTokens(user._id);

  // Retrieve the logged-in user without the password field
  const loggedInUser = await User.findById(user._id).select("-password");

  const options = {
    httpOnly: true, // Make the cookie accessible only by the web server
    secure: true, // Ensure the cookie is sent only over HTTPS
  };

  // Send response with user data and access token
  return res
    .status(200)
    .cookie("accessToken", accessToken, options) // Set the access token in a cookie
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
        },
        "User logged in successfully"
      )
    );
});

// Get user profile controller
const getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user; // User object is set by auth middleware

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Send response with user profile data
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User profile retrieved successfully"));
});

export { signupUser, loginUser, getUserProfile };
