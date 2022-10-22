import React from 'react';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';

function App() {

  const [items, setItems] = React.useState([]);

  React.useEffect(() => {
    fetch('https://62d057061cc14f8c0888fda2.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => setItems(json));
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
            {items.map((obj, i) => (
              <PizzaBlock {...obj} key={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
