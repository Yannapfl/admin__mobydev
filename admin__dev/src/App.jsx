import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
        <Route index element={<Dashboard />} />
        </Route>
      </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
