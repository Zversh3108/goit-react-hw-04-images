import React, { useState } from 'react';
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';
export function Searchbar(props) {
  const [searchWord, setSearchWord] = useState('');

  const handleWordChange = evt => {
    setSearchWord(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    props.onSubmit(searchWord);
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css['SearchForm-button']}>
          <span className={css['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={css['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchWord}
          onChange={handleWordChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
