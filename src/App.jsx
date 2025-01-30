import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RolePage from './pages/RolePage';
import SignUpPage from './pages/SignUpPage';
// import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {


  return (
    // <GoogleOAuthProvider clientId='529772385530-qpj743m0u9e5k73d4kee7udlsqjn3h18.apps.googleusercontent.com'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RolePage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
    // </GoogleOAuthProvider>

  )
}

export default App
