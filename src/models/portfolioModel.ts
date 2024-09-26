import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Transaction Schema
const transactionSchema = new Schema({
    type: {
        type: String,
        enum: ['buy', 'sell'],
        required: true
    }, // Type of transaction: buy or sell
    quantity: {
        type: Number,
        required: true
    }, // Quantity of asset bought/sold
    price: {
        type: Number,
        required: true
    }, // Price per unit at the time of transaction
    date: {
        type: Date,
        default: Date.now
    } // Date of the transaction
});

// Asset Schema
const assetSchema = new Schema({
    assetName: {
        type: String,
        required: true
    }, // Name of the asset (e.g., Bitcoin)
    symbol: {
        type: String,
        required: true
    }, // Symbol of the asset (e.g., BTC)
    quantity: {
        type: Number,
        default: 0
    }, // Total quantity of the asset owned by this user
    averagePrice: {
        type: Number,
        default: 0
    }, // Average buying price of the asset for this user
    transactions: [transactionSchema] // Array of transactions for this asset, specific to this user
});

// Portfolio Schema (Specific to Each User)
const portfolioSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    }, // Reference to the user who owns the portfolio
    assets: [assetSchema], // Array of assets for this specific user
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Method to add a transaction to a specific asset in a specific user's portfolio
// portfolioSchema.methods.addTransaction = function (assetSymbol, transaction) {
//     const asset = this.assets.find(a => a.symbol === assetSymbol); // Find asset by symbol within this user's portfolio
//     if (!asset) {
//         throw new Error(`Asset ${assetSymbol} not found in the portfolio`);
//     }

//     // Push new transaction to this user's asset's transactions array
//     asset.transactions.push(transaction);

//     // Update asset's quantity and average price based on the transaction
//     if (transaction.type === 'buy') {
//         const newTotalQuantity = asset.quantity + transaction.quantity;
//         asset.averagePrice = ((asset.quantity * asset.averagePrice) + (transaction.quantity * transaction.price)) / newTotalQuantity;
//         asset.quantity = newTotalQuantity;
//     } else if (transaction.type === 'sell') {
//         if (transaction.quantity > asset.quantity) {
//             throw new Error('Cannot sell more than the quantity owned.');
//         }
//         asset.quantity -= transaction.quantity;
//     }

//     // Save updated portfolio
//     this.save();
// };

// module.exports = mongoose.model('Portfolio', portfolioSchema);

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", portfolioSchema);

export default Portfolio;