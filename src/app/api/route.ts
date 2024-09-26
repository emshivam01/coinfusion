import { NextResponse } from "next/server";

export const GET = async () => {
    try {
        const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=1h,24h,7d';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'x_cg_demo_api_key': process.env.COINGECKO_API_KEY
            }
        };

        const response = await fetch(url, options); // Await fetch response
        const data = await response.json(); // Await json parsing
        console.log(data); // Log the data if needed

        return NextResponse.json({ data }); // Return the actual data
    } catch (error) {
        console.error("Error fetching general data:", error);
        return NextResponse.json({ msg: "Error", error: error.message }); // Return error message
    }
}








/////////////////////////////////////////////////////////////////////////////


// export const GET = async () => {
//     try {
//         const response = await fetch(
//             "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
//             {
//                 headers: {
//                     "X-CMC_PRO_API_KEY": process.env.NEXT_PUBLIC_CMC_API as string,
//                     Accept: "application/json",
//                 },
//             }
//         );

//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();

//         const btc_dom = data?.data?.btc_dominance;
//         const active_exchanges = data?.data?.active_exchanges;
//         console.log(data);
//         return NextResponse.json({ msg: "ok", btc_dom, active_exchanges, data: data.data })
//     } catch (error) {
//         console.error("Error fetching general data:", error);
//     }
// }