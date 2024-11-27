import { connect } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true,
        });

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Secure cookie in production
            expires: new Date(0), // Expire immediately
            sameSite: "lax", // CSRF protection
        });

        return response;

    } catch (error) {
        console.error("Error logging out:", error);
        return NextResponse.json({ message: "Server error 101" }, { status: 500 });
    }
};
