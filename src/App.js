import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'
import Header from './Components/Header'

import './scss/app.scss'
import React from 'react'

export const SearchContext = React.createContext();

function App() {
  const [SearchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{SearchValue, setSearchValue}}>
      <Header />
      <div className="content">
        <Routes>
          <Route path='/' element={<Home SearchValue={SearchValue} />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
