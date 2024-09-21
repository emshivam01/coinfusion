import { connect } from "@/db/dbConfig";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export const POST = async (request: NextRequest) => {

    try {

        const response = NextResponse.json(
            {
                message: "Logout successful",
                success: true,
            }
        )
        response.cookies.set("token", "",
            {
                httpOnly: true, expires: new Date(0)
            });
        return response;

    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json({ message: "Server error 101" }, { status: 500 });
    }

}