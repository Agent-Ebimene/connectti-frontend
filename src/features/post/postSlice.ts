import { Post } from "@/types/post/post";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PostState {
    posts: Post[],
    loading: boolean
}
const initialState: PostState = {
    posts: [],
    loading: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        addPost(state, action: PayloadAction<Post>) {
            state.posts.push(action.payload)

        },
        getPosts(state, action: PayloadAction<Post[]>) {
            state.posts = action.payload
        },
        getPost(state, action: PayloadAction<Post>) {
            state.posts.find((post) => post.id === action.payload.id)
        },
        deletePost(state, action: PayloadAction<Post>) {
            state.posts.find((post) => post.id !== action.payload.id)

        },
        updatePost(state, action: PayloadAction<Post>) {
            const index = state.posts.findIndex((post) => post.id === action.payload.id)
            if (index !== -1) {
                state.posts[index] = action.payload
            }

        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload;
        },

    },
})

export const { addPost, getPost, getPosts, deletePost, updatePost, setLoading } = postSlice.actions
export default postSlice.reducer



