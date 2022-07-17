import React from 'react';
import { useState } from 'react';

import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaSkeleton from '../Components/PizzaBlock/Skeleton';
import PizzaBlock from '../Components/PizzaBlock';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoriesIndex, setActiveCategoriesIndex] = React.useState(0);

  React.useEffect(() => {
    fetch('https://62d057061cc14f8c0888fda2.mockapi.io/items')
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoriesIndex={activeCategoriesIndex}
          setActiveCategoriesIndex={(i) => setActiveCategoriesIndex(i)}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(6)].map((_, index) => <PizzaSkeleton key={index} />)
          : items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)}
      </div>
    </div>
  );
};

export default Home;
