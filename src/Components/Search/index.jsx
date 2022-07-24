import React from 'react';

function Search({ SearchValue, setSearchValue }) {
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
