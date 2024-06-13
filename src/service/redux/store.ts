import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../../features/user/userSlice'
import postReducer from '../../features/post/postSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        post: postReducer

    }
})


export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;