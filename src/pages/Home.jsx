import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Qs from 'qs';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import axios from 'axios';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/sceleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = React.useContext(SearchContext);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);
    const sortBy = categoryId > 0 ? `&category=${categoryId}` : '';
    const order = sort.sortProperty.includes('-') ? '&order=asc' : '&order=desc';
    const category = sort.sortProperty.replace('-', '');
    const search = searchValue ? `&search=${searchValue}` : '';

    axios
      .get(
        `https://62d057061cc14f8c0888fda2.mockapi.io/items?page=${currentPage}&limit=4${sortBy}&sortBy=${category}${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      }, console.log('get'));
    console.log('function fetchPizzas');
  };

  // Проверка на первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = Qs.stringify({
        currentPage,
        sortProperty: sort.sortProperty,
        categoryId,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // Проверка url параметры при первом рендере и сохранение в редаксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = Qs.parse(window.location.search.substring(1));
      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
      console.log('Проверка url параметры при первом рендере и сохранение в редаксе', {
        ...params,
        sort,
      });
      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  // Рендер при пустом URL
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, index) => <Sceleton key={index} />);
  const pizzas = items.map((obj) => <PizzaBlock {...obj} key={obj.id} />);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
