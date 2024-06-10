import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';


function App() {
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
