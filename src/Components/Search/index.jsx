import React from 'react';
import { SearchContext } from '../../App';

function Search() {
  const {SearchValue, setSearchValue} = React.useContext(SearchContext)
  return (
    <div>
      <div>Иконка</div>
      <input
        value={SearchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
        placeholder="Поиск"
      />
      {SearchValue && <div onClick={() => setSearchValue('')}>svg</div>}
    </div>
  );
}

export default Search;
