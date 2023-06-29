import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';
export function Button(props) {
  const { onClick } = props;

  return (
    <button className={css.Button} type="button" onClick={onClick}>
      Load More
    </button>
  );
}
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
