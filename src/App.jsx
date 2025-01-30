import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RolePage from './pages/RolePage';
import SignUpPage from './pages/SignUpPage';
import { GoogleOAuthProvider } from '@react-oauth/google';
import LinkedInCallback from './components/auth/LinkedInCallback';

function App() {


  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RolePage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path="/linkedin/callback" element={<LinkedInCallback />} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>

  )
}

export default App
