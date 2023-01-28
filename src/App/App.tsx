import { Route, Routes } from 'react-router-dom';

import '@/assets/scss/App.scss';
import MainPage from './pages/MainPage';
import MainLayout from '@/layouts/MainLayout';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path='*' element={<NotFoundPage />}/>
      </Route>
    </Routes>
    // <div className="App">
    //   <div className='wrapper'>
    //     <MainPage />
    //   </div>
    // </div>
  )
}

export default App
