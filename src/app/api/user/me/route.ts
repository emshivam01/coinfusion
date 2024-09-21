import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from "@/models/userModel";

export const GET = async (request: NextRequest) => {
    try {
        const token = request.cookies.get("token")?.value || "";

        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        let decodedToken: JwtPayload | string;
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!);
        } catch (err) {
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }

        // Type assertion to ensure decodedToken is of type JwtPayload
        const userId = (decodedToken as JwtPayload).id;
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({
                message: "User not found",
                success: false
            });
        }

        return NextResponse.json({
            message: "User found",
            data: user
        });

    } catch (error) {
        console.error("Error getting user:", error);
        return NextResponse.json({ message: "Server error 101" }, { status: 500 });
    }
};
