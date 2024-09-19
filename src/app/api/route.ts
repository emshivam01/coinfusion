import { NextResponse } from "next/server";


export const GET = async () => {
    try {
        const response = await fetch(
            "https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest",
            {
                headers: {
                    "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_CMC_API as string,
                    Accept: "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const btc_dom = data?.data?.btc_dominance;
        const active_exchanges = data?.data?.active_exchanges;
        console.log(data);
        return NextResponse.json({ msg: "ok", btc_dom, active_exchanges })
    } catch (error) {
        console.error("Error fetching general data:", error);
    }
}