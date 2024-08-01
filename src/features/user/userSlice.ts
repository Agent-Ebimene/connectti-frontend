import { User } from "@/types/user/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    users: User[],
    loading: boolean,
    user: User | null
}
const initialState: UserState = {
    users: [],
    loading: false,
    user: null
}
const userSlice = createSlice({
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
            state.user = action.payload
        },
        updateUser(state, action: PayloadAction<User>) {
            const index = state.users.findIndex((user) => user.email === action.payload.email)
            if (index !== -1) {
                state.users[index] = action.payload
            }
        },
        deleteUser(state, action: PayloadAction<User>) {
            state.users.filter((user) => user.email !== action.payload.email)
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

    }



})
export const { addUser, getUser, getUsers, updateUser, deleteUser, setLoading } = userSlice.actions

export default userSlice.reducer