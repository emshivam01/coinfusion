import { connect } from "@/db/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcrypt from "bcrypt";
import zod from "zod"

connect()

export const POST = async (request: NextRequest) => {
    try {
        // Parse the request body
        const { username, email, password }: { username: string; email: string; password: string } = await request.json();

        // Credentials Validations

        const userSchemaValidation = zod.object({
            username: zod.string(),
            email: zod.string().email(),
            password: zod.string().min(8)
        })

        const isValidUser = userSchemaValidation.safeParse({ username, email, password })


        if (!isValidUser.success) {
            return NextResponse.json({ message1: "Invalid Credentials" }, { status: 400 });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: "User already exists" }, { status: 400 });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            username,
            email,
            password: hashedPassword, // Store hashed password in the password field
        });

        // Save the user to the database
        const savedUser = await user.save();
        savedUser.password = undefined;

        return NextResponse.json({ message: "User created successfully!", savedUser }, { status: 201 });
    } catch (error) {

        if (error.code === 11000) {
            // Find the field that caused the error
            const duplicateField = Object.keys(error.keyValue)[0];

            if (duplicateField === 'username') {
                return NextResponse.json({ message: 'Username already exists!' }, { status: 404, });
            }
            // add more error messages for other unique fields if needed
        }


        // console.error("Error creating user:", error);
        // return NextResponse.json({ message: "Server error " }, { status: 500 });
    }
};
