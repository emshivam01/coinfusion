import { connect } from "@/db/dbConfig";
import Portfolio from "@/models/portfolioModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import zod from "zod"


connect()

export const GET = async (request: NextRequest) => {

    try {

        const token = request.cookies.get('token')?.value || "";

        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        let decodedToken: JwtPayload;

        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id;

            if (!userId) {
                return NextResponse.json({ message: "Invalid token payload", success: false }, { status: 401 });
            }

            const portfolio = await Portfolio.find({ userId });
            console.log(portfolio);

            return NextResponse.json({ message: "Got it", portfolio, success: true }, { status: 200 });

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        }, { status: 500 });
    }

}


export const POST = async (request: NextRequest) => {

    try {

        const token = request.cookies.get('token')?.value || "";
        if (!token) {
            return NextResponse.json({ message: 'No token provided' }, { status: 400 });
        }
        let decodedToken: JwtPayload;
        try {
            // Verify the token and extract userId
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id; // Assuming the payload contains 'id' (userId)

            // Check if the user exists
            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({ message: 'Invalid token: User not found' }, { status: 401 });
            }

            // Extract data from the request body
            const { symbol, assetName, type, quantity, price } = await request.json();

            // if (!symbol || !type || !quantity || !price || !assetName) {
            //     return NextResponse.json({ message: 'Missing required fields' }, { status: 401 });
            // }

            // Zod validation 

            const SchemaValidation = zod.object({
                symbol: zod.string(),
                assetName: zod.string(),
                type: zod.enum(['buy', 'sell']),
                quantity: zod.number().positive(),
                price: zod.number().positive(),
            });


            const isValidDetails = SchemaValidation.safeParse({ symbol, assetName, type, quantity, price })


            if (!isValidDetails.success) {
                return NextResponse.json({ message: 'Invalid Details' }, { status: 400 });
            }

            // Find the user's portfolio
            let portfolio = await Portfolio.findOne({ userId });
            if (!portfolio) {
                // If the portfolio does not exist, create a new portfolio for the user
                portfolio = new Portfolio({ userId, assets: [] });
            }

            // Find the asset by symbol
            let asset = portfolio.assets.find(a => a.symbol === symbol);

            if (!asset) {
                // If asset not found, create a new one
                asset = {
                    assetName: assetName,
                    symbol: symbol,
                    quantity, // Start with 0 quantity, will update after adding transaction
                    averagePrice: price,
                    transactions: []
                };
                const transaction = { type, quantity, price };
                asset.transactions.push(transaction);
                portfolio.assets.push(asset); // Add the new asset to the portfolio
            }

            // Add the transaction
            const transaction = { type, quantity, price };
            asset.transactions.push(transaction);

            // Update asset quantity and average price (if it's a 'buy' transaction)
            if (type === 'buy') {
                const newTotalQuantity = asset.quantity + quantity;
                asset.averagePrice = ((asset.quantity * asset.averagePrice) + (quantity * price)) / newTotalQuantity;
                asset.quantity = newTotalQuantity;
            } else if (type === 'sell') {
                if (quantity > asset.quantity) {
                    return NextResponse.json({ message: 'Cannot sell more than the quantity owned' }, { status: 404 });
                }
                asset.quantity -= quantity;
            }

            // Save the updated portfolio
            await portfolio.save();

            // Return success message
            return NextResponse.json({ message: 'Transaction added successfully', portfolio });
        } catch (error) {
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }


    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Server Error",
            success: false,
        }, { status: 500 });
    }



}