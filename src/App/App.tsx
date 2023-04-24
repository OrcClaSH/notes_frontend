import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';
import MainLayout from '@/layouts/MainLayout';
import StartPage from './pages/StartPage/StartPage';
import { RequireAuth } from '@/hoc/RequireAuth';
import ContentPage from './pages/ContentPage/ContentPage';

import '@/assets/scss/App.scss';
import { useEffect } from 'react';

function App() {
  const navigate = useNavigate();
  const {isAuth} = useAuth();

  useEffect(() => {
    if (isAuth) navigate('/notes');
}, [isAuth]);

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<StartPage />} />
        <Route path='/notes' element={
          <RequireAuth>
            <ContentPage />
          </RequireAuth>
        } />
        <Route path='*' element={<Navigate to='/notes' replace />} />
      </Route>
    </Routes>
  )
}

export default App
