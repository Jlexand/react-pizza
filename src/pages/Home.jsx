import React from 'react'

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Sceleton from '../components/PizzaBlock/sceleton';

const Home = () => {

    const [items, setItems] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
  
    React.useEffect(() => {
      fetch('https://62d057061cc14f8c0888fda2.mockapi.io/items')
        .then((res) => res.json())
        .then((json) => {
          setItems(json);
          setIsLoading(false);
        });
        window.scrollTo(0, 0);
    }, [])

  return (
    <>
        <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {
              isLoading
                ? [...new Array(6)].map((_, index)=> <Sceleton key={index}/>)
                : items.map((obj, i) => (<PizzaBlock {...obj} key={i} />))
            }
          </div>
    </>
  )
}

export default Home