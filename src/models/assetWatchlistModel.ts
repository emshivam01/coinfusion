import mongoose from "mongoose";

const Schema = mongoose.Schema;

// Define the Watchlist Schema
const watchlistSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }, // Reference to the user
    symbol: {
        type: String,
        required: true
    }, // Cryptocurrency symbol (e.g., BTC, ETH)
    name: {
        type: String,
        required: true
    }, // Full name of the cryptocurrency
    targetPrice: {
        type: Number,
        default: null
    }, // Notify user if price hits this value
    notes: {
        type: String,
        default: ''
    }, // Optional field for personal notes
}, {
    timestamps: true
});

// const Watchlist = mongoose.model('Watchlist', watchlistSchema);
const Watchlist = mongoose.models.Watchlist || mongoose.model("Watchlist", watchlistSchema);

export default Watchlist;

