import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Header from './Components/Header'

import './scss/app.scss'
import React from 'react'

function App() {
  const [SearchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <Header SearchValue={SearchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home SearchValue={SearchValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
