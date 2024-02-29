import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("Database connected");
  } catch (err) {
    console.log("Error connection to database ", err);
  }
};
