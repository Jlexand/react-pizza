import React, { useState } from 'react'

import Header from './Components/Header'
import Categories from './Components/Categories'
import Sort from './Components/Sort'
import PizzaSkeleton from './Components/PizzaBlock/Skeleton'
import PizzaBlock from './Components/PizzaBlock'

import './scss/app.scss'

function App() {

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true);

  React.useEffect(() => {
    fetch('https://62d057061cc14f8c0888fda2.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false)
      })
  }, [])

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading ?
                [...Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
                : items.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
