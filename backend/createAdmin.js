import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import Admin from "./models/admin.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existingAdmin = await Admin.findOne({
      email: "admin@brewHouse.com",
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    await Admin.create({
      name: "BrewHouse Admin",
      email: "admin@brewHouse.com",
      password: hashedPassword,
    });

    console.log("Admin created successfully");

    process.exit();
  } catch (error) {
    console.error("Create Admin Error:", error);
    process.exit(1);
  }
};

createAdmin();