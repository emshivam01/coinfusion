import { connect } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
  try {
    const {
      email,
      password,
    }: { email: string; password: string } =
      await request.json();

    // Check if user already exists or not
    const existingUser = await User.findOne({
      email,
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User doesn't exist",
        },
        { status: 404 }
      );
    }

    // Hashing the password before comparing it to the existing one
    const hashedPass = existingUser.password;

    // Comparing the password to the new one
    const isValidPassword = await bcrypt.compare(password, hashedPass);


    // Early return if the password is incorrect

    if (!isValidPassword) {
      return NextResponse.json(
        {
          message: "Incorrect password",
        },
        { status: 404 }
      );
    }


    // Token generation

    const tokenPayload = {
      id: existingUser._id,
    }

    const token = jwt.sign(tokenPayload, process.env.TOKEN_SECRET!, { expiresIn: "1d" })

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    })
    response.cookies.set("token", token, {
      httpOnly: true,
    })

    return response
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ message: "Server error 101" }, { status: 500 });
  }
};
