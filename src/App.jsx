import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RolePage from './pages/RolePage';
import SignUpPage from './pages/SignUpPage';

function App() {


  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RolePage />} />
          <Route path='/signup' element={<SignUpPage />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
