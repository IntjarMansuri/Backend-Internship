import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // Connect to MongoDB using the Mongoose connect method
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/task-1`
    );

    // Log successful connection details to console
    console.log(
      `MongoDB connected !! DB Host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    // Log error and exit process if connection fails
    console.log("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
