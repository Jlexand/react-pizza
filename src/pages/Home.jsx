import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useState } from 'react';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../Components/Categories';
import Sort from '../Components/Sort';
import PizzaSkeleton from '../Components/PizzaBlock/Skeleton';
import PizzaBlock from '../Components/PizzaBlock';
import { SearchContext } from '../App';

const Home = () => {

  const dispatch = useDispatch();

  const {categoryId, sort} = useSelector(state => state.filter);

  const {SearchValue} = React.useContext(SearchContext)

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  }

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = categoryId > 0 ? `category=${categoryId}` : '';
    const order = sort.sortProperty.replace('-', '');
    const category = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const search = SearchValue ? `&search=${SearchValue}` : '';
    fetch(
      `https://62d057061cc14f8c0888fda2.mockapi.io/items?${sortBy}&sortBy=${order}&order=${category}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, SearchValue]);
  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeCategoriesIndex={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort/>
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
