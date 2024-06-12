import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import Dashboard from './pages/dashboard/Dashboard';


function App() {
  return (
    <>
      <BrowserRouter>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Routes>
            <Route path="/" element={<SignUp />}></Route>
            <Route path="/login" element={<SignIn />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
          </Routes>
        </LocalizationProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
