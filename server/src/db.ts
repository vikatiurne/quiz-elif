import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("DB connect successfully!");
  } catch (error: any) {
    console.log(`DB connect error: ${error.message}`);
  }
};
