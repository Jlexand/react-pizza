import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/sceleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const dispatch = useDispatch();
  const { categoryId, sort, currentCount } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    setIsLoading(true);
    const sortBy = categoryId > 0 ? `&category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? '&order=asc' : '&order=desc';
    const category = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62d057061cc14f8c0888fda2.mockapi.io/items?page=${currentCount}&limit=4${sortBy}&sortBy=${category}${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sort.sortProperty, searchValue, currentCount]);

  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
  const pizzas = items.map((obj, i) => <PizzaBlock {...obj} key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentCount={currentCount} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
