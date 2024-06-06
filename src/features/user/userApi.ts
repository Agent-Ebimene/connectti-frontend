import { AppDispatch } from '../../service/redux/store'
import axios from 'axios';
import { getUsers, setLoading } from './userSlice';


export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get('http://localhost:3000/users');
        dispatch(getUsers(response.data));
    } catch (error) {
        console.error(error);
    } finally {
        dispatch(setLoading(false));
    }
};