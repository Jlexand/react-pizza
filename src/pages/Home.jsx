import React from "react";
import { useState } from "react";

import Categories from "../Components/Categories";
import Sort from "../Components/Sort";
import PizzaSkeleton from "../Components/PizzaBlock/Skeleton";
import PizzaBlock from "../Components/PizzaBlock";

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategoriesIndex, setActiveCategoriesIndex] = React.useState(0);
  const [SortlistState, setSortListState] = useState({
    name: 'популярности',
    sort: 'rating'
  });

  const Sortlist = [
    {
      name: "популярности (DESC)",
      sort: "raiting",
    },
    {
      name: "популярности (ASC)",
      sort: "-raiting",
    },
    {
      name: "цене (DESC)",
      sort: "price",
    },
    {
      name: "цене (ASC)",
      sort: "-price",
    },
    {
      name: "алфавиту (DESC)",
      sort: "title",
    },
    {
      name: "алфавиту (ASC)",
      sort: "-title",
    },
  ];
  React.useEffect(() => {
    setIsLoading(true);
    const category = activeCategoriesIndex > 0 ? `category=${activeCategoriesIndex}`: '';
    const sort = SortlistState.sort.replace('-', '');
    const order = SortlistState.sort.includes('-') ? 'asc' : 'desc';
    fetch(
      `https://62d057061cc14f8c0888fda2.mockapi.io/items?${category}&sortBy=${sort}&order=${order}`
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [activeCategoriesIndex, SortlistState]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoriesIndex={activeCategoriesIndex}
          setActiveCategoriesIndex={(i) => setActiveCategoriesIndex(i)}
        />
        <Sort
          setSortListState={setSortListState}
          SortlistState={SortlistState}
          Sortlist={Sortlist}
        />
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
