import { AppDispatch } from '../../service/redux/store'
import axios from 'axios';
import { getUsers, setLoading, addUser } from './userSlice';
import { User } from '@/types/user/user';


export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(`http://localhost:3000/users`);
        dispatch(getUsers(response.data));
    } catch (error) {
        console.error(error);
    } finally {
        dispatch(setLoading(false));
    }
};

export const createUser = (user: User) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.post(`http://localhost:3000/auth/register`, user)
        dispatch(addUser(response.data))
    } catch (error) {
        console.error(error)
    } finally {
        dispatch(setLoading(false))
    }

}