import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Connect to MongoDB database
connectDB();

// Start the Express server
app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is running at PORT ${process.env.PORT || 8000}`);
});
