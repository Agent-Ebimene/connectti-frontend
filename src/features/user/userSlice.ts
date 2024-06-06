import { User } from "@/types/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    users: User[],
    loading: boolean
}
const initialState: UserState = {
    users: [],
    loading: false
}
const counterSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action: PayloadAction<User>) {
            state.users.push(action.payload)
        },
        getUsers(state, action: PayloadAction<User[]>) {
            state.users = action.payload
        },
        getUser(state, action: PayloadAction<User>) {
            state.users.find((user) => user.id === action.payload.id)
        },
        updateUser(state, action: PayloadAction<User>) {
            const index = state.users.findIndex((user) => user.id === action.payload.id)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        deleteUser(state, action: PayloadAction<User>) {
            state.users.filter((user) => user.id !== action.payload.id)
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

    }



})
export const { addUser, getUser, getUsers, updateUser, deleteUser, setLoading } = counterSlice.actions

export default counterSlice.reducer