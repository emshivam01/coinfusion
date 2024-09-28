import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cryptoReducer from "./slices/cryptoSlice"


// Set up the store
export const store = configureStore({
    reducer: {
        user: userReducer,
        crypto: cryptoReducer
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
