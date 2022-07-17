import React from 'react';

function Categories({ activeCategoriesIndex, setActiveCategoriesIndex }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => setActiveCategoriesIndex(index)}
            className={activeCategoriesIndex === index ? 'active' : ''}
            key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Categories;
