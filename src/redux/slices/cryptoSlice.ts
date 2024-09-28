import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the state for each coin
interface Coin {
    id: string;
    symbol: string;
    name: string;
    image: string;
    currentPrice: number;
    market_Cap: number;
    market_Cap_Rank: number;
    fully_diluted_valuation: number;
    total_volume: number;
    high_24h: number;
    low_24h: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    market_cap_change_24h: number;
    market_cap_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    ath: number;
    ath_change_percentage: number;
    ath_date: string;
    atl: number;
    atl_change_percentage: number;
    atl_date: string;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    price_change_percentage_7d_in_currency: number;
}

// Initial state should be an array of coins
interface CoinState {
    coins: Coin[];
}

// Set the initial state to an empty array of coins
const initialState: CoinState = {
    coins: [],
};

// Create the slice
export const cryptoSlice = createSlice({
    name: "crypto",
    initialState,
    reducers: {
        // Reducer to set coins data into the state
        setCoins: (state, action: PayloadAction<Coin[]>) => {
            state.coins = action.payload; // Replace current state with new coin data
        },
    },
});

// Export the action creator
export const { setCoins } = cryptoSlice.actions;

// Export the reducer to be included in the store
export default cryptoSlice.reducer;
