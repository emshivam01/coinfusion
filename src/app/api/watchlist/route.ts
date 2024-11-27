import { connect } from "@/db/dbConfig";
import Watchlist from "@/models/assetWatchlistModel";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"


connect()

export const POST = async (request: NextRequest) => {
    try {
        // Retrieve token from cookies
        const token = request.cookies.get('token')?.value || "";
        console.log("Token received:", token); // Log token for debugging

        // Parse request body for required fields
        const {
            name,
            symbol,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            market_cap,
            total_volume,
            circulating_supply,
            targetPrice,
            notes,
        } = await request.json();

        console.log("Request body:", {
            name,
            symbol,
            current_price,
            targetPrice,
            notes
        }); // Log request data for debugging

        // Check if token exists
        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        let decodedToken: JwtPayload;
        try {
            // Verify token and decode user ID
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id;
            console.log("Decoded userId:", userId); // Log userId for debugging

            // Create a new watchlist entry
            const watchlist = new Watchlist({
                userId,
                name,
                symbol,
                targetPrice,
                notes,
                current_price,
                price_change_percentage_1h_in_currency,
                price_change_percentage_24h_in_currency,
                price_change_percentage_7d_in_currency,
                market_cap,
                total_volume,
                circulating_supply,
            });

            // Save the new entry to the database
            const response = await watchlist.save();
            console.log("Watchlist item saved:", response); // Log save result for debugging

            // Return success response
            return NextResponse.json({
                message: "Added to watchlist",
                response,
                success: true
            });

        } catch (err) {
            console.error("Token verification failed:", err); // Log token verification error
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }

    } catch (error) {
        console.error("Server Error:", error); // Log server error for full trace
        return NextResponse.json({
            message: "Server Error",
            success: false,
        }, { status: 500 });
    }
};


export const GET = async (request: NextRequest) => {
    try {
        const token = request.cookies.get('token')?.value || "";

        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        console.log("Received Token:", token); // Log token for debugging

        let decodedToken: JwtPayload;

        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id;

            if (!userId) {
                console.error("Invalid token payload:", decodedToken); // Log token payload
                return NextResponse.json({ message: "Invalid token payload", success: false }, { status: 401 });
            }

            console.log("Decoded userId:", userId); // Log userId for debugging

            const watchlist = await Watchlist.find({ userId });

            if (!watchlist || watchlist.length === 0) {
                console.log("No watchlist found for userId:", userId); // Log if no watchlist found
            }

            return NextResponse.json({ message: "Got it", watchlist, success: true }, { status: 200 });

        } catch (error) {
            console.error("Token verification failed:", error); // Log error for debugging
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }

    } catch (error) {
        console.error("Server error:", error); // Log the full error for debugging
        return NextResponse.json({
            message: "Server Error",
            success: false,
        }, { status: 500 });
    }
};
