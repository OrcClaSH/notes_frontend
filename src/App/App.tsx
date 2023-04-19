import { Navigate, Route, Routes } from 'react-router-dom';

import ContentPage from './pages/ContentPage';
import MainLayout from '@/layouts/MainLayout';
import StartPage from './pages/StartPage/StartPage';
import { RequireAuth } from '@/hoc/RequireAuth';

import '@/assets/scss/App.scss';
import { useAuth } from '@/hooks/useAuth';

function App() {
  useAuth()

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
