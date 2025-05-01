import mongoose from "mongoose";

const connectDb = () => {
  try {
    mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected sucessfully");
  } catch (error) {
    console.log("Error connecting database", error);
    process.exit(1);
  }
};

export default connectDb;
