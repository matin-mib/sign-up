import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RolePage from './pages/RolePage';
import SignUpPage from './pages/SignUpPage';
import { GoogleOAuthProvider } from '@react-oauth/google';


function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RolePage />} />
          <Route path='/signup/freelance' element={<SignUpPage />} />
          <Route path='/signup/hiring' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
