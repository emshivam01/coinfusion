import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the initial state interface
interface UserState {
    id: string;
    username: string;
    email: string;
}

// Initial state
const initialState: UserState = {
    id: "",
    username: "",
    email: "",
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<{ _id: string; username: string; email: string }>) => {
            state.id = action.payload._id;
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        clearUser: (state) => {
            state.id = "";
            state.username = "";
            state.email = "";
        }
    }
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
