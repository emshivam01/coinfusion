import { connect } from "@/db/dbConfig";
import Watchlist from "@/models/assetWatchlistModel";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"


connect()

export const POST = async (request: NextRequest) => {

    try {
        const token = request.cookies.get('token')?.value || "";

        const { name,
            symbol,
            current_price,
            price_change_percentage_1h_in_currency,
            price_change_percentage_24h_in_currency,
            price_change_percentage_7d_in_currency,
            market_cap,
            total_volume,
            circulating_supply,
            targetPrice,
            notes, } = await request.json()

        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        let decodedToken: JwtPayload | string;
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id

            const watchlist = new Watchlist({
                userId, name,
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
            })

            const response = await watchlist.save()

            return NextResponse.json({
                message: "Added to watchlist",
                response
            })


        } catch (err) {
            return NextResponse.json({ message: "Invalid token", success: false }, { status: 401 });
        }

        // return NextResponse.json({ symbol, name, targetPrice, notes })

    } catch (error) {
        console.error(error)
        return NextResponse.json({
            message: "Server Error",
        })
    }

}


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

            const watchlist = await Watchlist.find({ userId });
            // console.log(watchlist);

            return NextResponse.json({ message: "Got it", watchlist, success: true }, { status: 200 });

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
};
