import { AppDispatch } from "@/service/redux/store";
import { setLoading, getPosts, getPost, addPost, updatePost } from "./postSlice";
import axios from "axios";
import { Post } from "@/types/post/post";


export const fetchPosts = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))

    try {
        const response = await axios.get('http://localhost:3000/posts')

        dispatch(getPosts(response.data))
    } catch (error) {
        console.error(error);

    } finally {
        dispatch(setLoading(false))
    }

}


export const createPost = (post: Post) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post('http://localhost:3000/post/create', post)
        dispatch(addPost(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setLoading(false))
    }
}

export const fetchPost = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    try {
        const response = await axios.get(`http://localhost:3000/post/${id}`);
        dispatch(getPost(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setLoading(false))
    }

}