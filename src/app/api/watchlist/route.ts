import { connect } from "@/db/dbConfig";
import Watchlist from "@/models/assetWatchlistModel";
import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"


connect()

export const POST = async (request: NextRequest) => {

    try {


        const token = request.cookies.get('token')?.value || "";

        const { name, symbol, targetPrice, notes } = await request.json()

        if (!token) {
            return NextResponse.json({ message: "Token not provided", success: false }, { status: 401 });
        }

        let decodedToken: JwtPayload | string;
        try {
            decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;
            const userId = decodedToken.id

            const watchlist = new Watchlist({
                userId, name, symbol, targetPrice, notes
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
