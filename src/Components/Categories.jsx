import React from 'react';

function Categories({ activeCategoriesIndex, onChangeCategory }) {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((item, index) => (
          <li
            onClick={() => onChangeCategory(index)}
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
