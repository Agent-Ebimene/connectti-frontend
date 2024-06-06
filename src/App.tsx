import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './service/redux/store';
import { useEffect } from 'react';
import { fetchUsers } from './features/user/userApi';

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector((state: RootState) => state.user.users);
  const loading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
          </Routes>
        </LocalizationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
