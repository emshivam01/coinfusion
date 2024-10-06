import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the Watchlist Schema
const watchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    targetPrice: {
        type: Number,
        default: null
    },
    notes: {
        type: String,
        default: ''
    },
    current_price: {
        type: Number,
        required: true
    },
    price_change_percentage_1h_in_currency: {
        type: Number,
        required: true
    },
    price_change_percentage_24h_in_currency: {
        type: Number,
        required: true
    },
    price_change_percentage_7d_in_currency: {
        type: Number,
        required: true
    },
    market_cap: {
        type: Number,
        required: true
    },
    total_volume: {
        type: Number,
        required: true
    },
    circulating_supply: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});


// const Watchlist = mongoose.model('Watchlist', watchlistSchema);
const Watchlist = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;

