import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/sceleton';

const Home = () => {
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = sortType.sortProperty.replace('-', '');
    fetch(
      `https://62d057061cc14f8c0888fda2.mockapi.io/items?${sortBy}&sortBy=${category}&order=${order}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
        <Sort
          value={sortType}
          onClickSort={(i) => {
            setSortType(i);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Sceleton key={index} />)
          : items.map((obj, i) => <PizzaBlock {...obj} key={i} />)}
      </div>
    </>
  );
};

export default Home;
