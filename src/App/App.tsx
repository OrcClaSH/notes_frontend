import { Route, Routes } from 'react-router-dom';

import MainPage from './pages/MainPage';
import MainLayout from '@/layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

import '@/assets/scss/App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
