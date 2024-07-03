import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Middleware to parse incoming JSON payloads (limiting to 16kb)
app.use(express.json({ limit: "16kb" }));

// Middleware to parse incoming URL-encoded payloads (extended for parsing nested objects, limiting to 16kb)
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Middleware to parse cookies from incoming requests
app.use(cookieParser());

// Route for a basic GET request to verify server status
app.get("/", (req, res) => {
  res.send("Working Fine!!");
});

// Importing user routes to handle user-related APIs
import userRoutes from "./routes/user.routes.js";

// Mounting user routes under the "/api" prefix
app.use("/api", userRoutes);

// Exporting the configured Express app
export { app };
